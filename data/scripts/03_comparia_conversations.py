"""Étape 3 : analyser les vraies conversations Compar:IA (parquet, environ 2,6 Go).

Source : data.gouv.fr, jeu « Compar:IA », ressource comparIA-conversations (Etalab 2.0).
Ce qu'on en tire :
  - la répartition réelle des usages par catégorie (18 catégories, attribuées par un LLM côté Compar:IA) ;
  - l'énergie réelle estimée par conversation (fourchette p10 / médiane / p90) par catégorie ;
  - des exemples de vraies premières questions (opening_msg) par catégorie, pour s'en inspirer.

Usage :
  python 03_comparia_conversations.py                 # lit le parquet à distance (HTTP), plus lent
  python 03_comparia_conversations.py chemin.parquet  # lit un fichier téléchargé (recommandé)

Sorties :
  data/out/comparia_usages_par_categorie.csv
  data/out/comparia_exemples_questions.csv
"""
import sys

import duckdb

from common import OUT

URL = "https://ministere-culture.s3.sbg.io.cloud.ovh.net/COMPARIA/conversations.parquet"
source = sys.argv[1] if len(sys.argv) > 1 else URL
EXEMPLES_PAR_CATEGORIE = 30

con = duckdb.connect()
if source.startswith("http"):
    con.execute("INSTALL httpfs; LOAD httpfs;")
con.execute(f"CREATE VIEW conv AS SELECT * FROM read_parquet('{source}')")

# Le schéma a évolué selon les versions publiées : on détecte les bons noms de colonnes.
cols = {r[0]: r[1] for r in con.execute("DESCRIBE conv").fetchall()}
print(f"{len(cols)} colonnes : {', '.join(cols)}\n")


def pick(*names):
    for n in names:
        if n in cols:
            return n
    return None


kwh_a = pick("total_conv_a_kwh", "total_conso_a")
kwh_b = pick("total_conv_b_kwh", "total_conso_b")
tok_a = pick("total_conv_a_output_tokens", "total_tokens_a")
tok_b = pick("total_conv_b_output_tokens", "total_tokens_b")
msg = pick("opening_msg", "first_message", "user_msg")
if not (kwh_a and kwh_b and msg and "categories" in cols):
    sys.exit("Colonnes attendues introuvables : regarde la liste ci-dessus et adapte pick().")

filters = []
if "languages" in cols:
    filters.append("list_contains(languages, 'fr')" if cols["languages"].endswith("[]")
                   else "languages ILIKE '%fr%'")
for flag in ("contains_pii", "contains_spam"):
    if flag in cols:
        filters.append(f"coalesce({flag}, false) = false")
where = " AND ".join(filters) or "true"
print(f"filtre : {where}")

con.execute(f"""
CREATE TEMP TABLE base AS
SELECT {msg} AS question, categories,
       {kwh_a} AS kwh_a, {kwh_b} AS kwh_b,
       {tok_a or 'NULL'} AS tokens_a, {tok_b or 'NULL'} AS tokens_b
FROM conv WHERE {where}
""")
total = con.execute("SELECT count(*) FROM base").fetchone()[0]
print(f"{total} conversations retenues\n")

OUT.mkdir(parents=True, exist_ok=True)

# 1. Répartition des usages + énergie par catégorie.
#    Une conversation peut avoir plusieurs catégories ; chaque conversation compare 2 modèles (a et b).
usages = OUT / "comparia_usages_par_categorie.csv"
con.execute(f"""
COPY (
  WITH c AS (SELECT unnest(categories) AS categorie, kwh_a, kwh_b, tokens_a, tokens_b FROM base),
       e AS (SELECT categorie, kwh_a AS kwh, tokens_a AS tokens FROM c
             UNION ALL SELECT categorie, kwh_b, tokens_b FROM c)
  SELECT categorie,
         count(*) // 2                                 AS nb_conversations,
         round(100.0 * (count(*) // 2) / {total}, 1)   AS part_pct,
         round(quantile_cont(kwh, 0.10) * 1000, 3)     AS wh_p10,
         round(median(kwh) * 1000, 3)                  AS wh_mediane,
         round(quantile_cont(kwh, 0.90) * 1000, 3)     AS wh_p90,
         round(median(tokens))                         AS tokens_mediane
  FROM e WHERE kwh IS NOT NULL
  GROUP BY categorie ORDER BY nb_conversations DESC
) TO '{usages}' (HEADER)
""")
res = con.execute(f"SELECT * FROM read_csv('{usages}')")
print(" | ".join(d[0] for d in res.description))
for row in res.fetchall():
    print(" | ".join(str(v) for v in row))

# 2. Exemples de vraies questions courtes par catégorie (à relire et réécrire en cartes).
exemples = OUT / "comparia_exemples_questions.csv"
con.execute(f"""
COPY (
  WITH c AS (SELECT unnest(categories) AS categorie, question, (kwh_a + kwh_b) / 2 * 1000 AS wh
             FROM base WHERE length(question) BETWEEN 25 AND 220)
  SELECT categorie, question, round(wh, 3) AS wh_moyen
  FROM c
  QUALIFY row_number() OVER (PARTITION BY categorie ORDER BY hash(question)) <= {EXEMPLES_PAR_CATEGORIE}
  ORDER BY categorie
) TO '{exemples}' (HEADER)
""")
print(f"\nécrit : {usages}\nécrit : {exemples}")

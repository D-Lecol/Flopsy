"""Étape 2 : énergie estimée de chaque modèle d'IA sur Compar:IA.

Source : dépôt GitHub betagouv/ComparIA, fichier data/legacy/generated-models.json (Apache 2.0).
Le champ `wh_per_million_token` est l'estimation EcoLogits utilisée par Compar:IA :
énergie (Wh) pour générer 1 million de tokens. C'est avec ce chiffre que Compar:IA calcule
les kWh de chaque conversation du jeu de données (kWh = Wh/Mtok / 1e6 × tokens / 1000).

Sorties :
  data/out/comparia_modeles_energie.csv   un modèle par ligne
  data/out/comparia_energie_par_taille.csv  médiane par taille (XS à XL) et par type (raisonnement ou non)
"""
import csv
import json
import statistics as st
from collections import defaultdict

from common import COMPARIA_RAW, OUT, RAW, download

TOKENS_REPONSE = 500  # longueur typique d'une réponse, pour un ordre de grandeur lisible

src = download(f"{COMPARIA_RAW}/data/legacy/generated-models.json", RAW / "comparia" / "generated-models.json")
models = [m for m in json.loads(src.read_text(encoding="utf-8"))["models"].values()
          if m.get("wh_per_million_token")]

OUT.mkdir(parents=True, exist_ok=True)
with open(OUT / "comparia_modeles_energie.csv", "w", newline="", encoding="utf-8") as f:
    w = csv.writer(f)
    w.writerow(["modele", "organisation", "taille", "params_milliards", "params_actifs_milliards",
                "raisonnement", "actif_sur_comparia", "wh_par_million_tokens", f"wh_pour_{TOKENS_REPONSE}_tokens"])
    for m in sorted(models, key=lambda m: m["wh_per_million_token"]):
        wh = m["wh_per_million_token"]
        w.writerow([m["id"], m.get("organisation"), m.get("friendly_size"), m.get("params"),
                    m.get("active_params"), m.get("reasoning"), m.get("status") == "enabled",
                    round(wh, 1), round(wh * TOKENS_REPONSE / 1e6, 4)])

groups = defaultdict(list)
for m in models:
    groups[("taille", m.get("friendly_size"))].append(m["wh_per_million_token"])
    groups[("raisonnement", "oui" if m.get("reasoning") else "non")].append(m["wh_per_million_token"])

order = [("taille", s) for s in ["XS", "S", "M", "L", "XL"]] + [("raisonnement", "non"), ("raisonnement", "oui")]
with open(OUT / "comparia_energie_par_taille.csv", "w", newline="", encoding="utf-8") as f:
    w = csv.writer(f)
    w.writerow(["groupe", "valeur", "nb_modeles", "min_wh_mtok", "mediane_wh_mtok", "max_wh_mtok",
                f"mediane_wh_pour_{TOKENS_REPONSE}_tokens"])
    for key in order:
        v = groups.get(key)
        if not v:
            continue
        med = st.median(v)
        w.writerow([*key, len(v), round(min(v)), round(med), round(max(v)), round(med * TOKENS_REPONSE / 1e6, 3)])
        print(f"{key[0]:<12} {key[1]:<4} n={len(v):>3}  médiane {med:>8.0f} Wh/Mtok"
              f"  -> {med * TOKENS_REPONSE / 1e6:.3f} Wh pour {TOKENS_REPONSE} tokens")

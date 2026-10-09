"""Étape 1 : récupérer les prompts suggérés par Compar:IA (base des cartes-requêtes).

Source : dépôt GitHub betagouv/ComparIA, fichier utils/suggestions/fr.json (licence Apache 2.0).
Ce sont les « suggestions de prompts » proposées aux visiteurs sur comparia.beta.gouv.fr,
rangées par catégorie. Aucune donnée personnelle, textes courts et propres.

Sortie : data/out/comparia_suggestions_fr.csv  (categorie, description, texte, a_completer)
"""
import csv
import json

from common import COMPARIA_RAW, OUT, RAW, download

src = download(f"{COMPARIA_RAW}/utils/suggestions/fr.json", RAW / "comparia" / "suggestions_fr.json")
categories = json.loads(src.read_text(encoding="utf-8"))

rows = []
for cat in categories:
    for s in cat.get("suggestions", []):
        text = s["text"] if isinstance(s, dict) else s
        rows.append({
            "categorie": cat["title"],
            "description": cat["description"],
            "texte": " ".join(text.split()),
            # Les crochets [ ] marquent un trou à remplir (ex. « [ingrédient] »)
            "a_completer": "oui" if "[" in text else "non",
        })

OUT.mkdir(parents=True, exist_ok=True)
dest = OUT / "comparia_suggestions_fr.csv"
with open(dest, "w", newline="", encoding="utf-8") as f:
    w = csv.DictWriter(f, fieldnames=list(rows[0]))
    w.writeheader()
    w.writerows(rows)

print(f"{len(rows)} prompts dans {len(categories)} catégories -> {dest}")
for cat in categories:
    print(f"  {cat['title']:<32} {len(cat.get('suggestions', [])):>4}")

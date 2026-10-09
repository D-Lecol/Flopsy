# data/ — pipeline de données de Flopsy

Tout ce qui transforme des données ouvertes en fichiers de jeu (`public/data/*.json`).
Le guide complet est dans [docs/03-donnees.md](../docs/03-donnees.md).

## Installation

```bash
cd data
python -m venv .venv && source .venv/bin/activate   # Windows : .venv\Scripts\activate
pip install -r requirements.txt
```

## Lancer les étapes

Toujours depuis `data/scripts/` :

| Étape | Commande | Durée | Ce que ça produit |
|---|---|---|---|
| 1 | `python 01_comparia_suggestions.py` | quelques secondes | `out/comparia_suggestions_fr.csv` : les 284 prompts suggérés par Compar:IA, base des cartes |
| 2 | `python 02_comparia_energie_modeles.py` | quelques secondes | `out/comparia_modeles_energie.csv`, `out/comparia_energie_par_taille.csv` |
| 3 | `python 03_comparia_conversations.py conversations.parquet` | quelques minutes | `out/comparia_usages_par_categorie.csv`, `out/comparia_exemples_questions.csv` |
| 4 | `python 04_osm_datacenters.py` | 1 à 2 min | `out/osm_datacenters.csv`, `out/osm_datacenters_par_region.csv` |
| 5 | `python 05_build_params.py` | instantané | `public/data/params.json`, `public/data/sources.json` |
| 6 | `python 06_cartes_brouillon.py` | instantané | `public/data/cards.json` (18 cartes de départ) |

**Étape 3** : télécharge d'abord le parquet des conversations (environ 2,6 Go) depuis
<https://ministere-culture.s3.sbg.io.cloud.ovh.net/COMPARIA/conversations.parquet>
(lien donné sur la page data.gouv.fr de Compar:IA), puis passe son chemin au script.
Sans argument, le script lit le fichier à distance : ça marche, mais c'est plus lent.

## Dossiers

```
data/
├── raw/        fichiers téléchargés tels quels (ne pas modifier à la main)
├── out/        tableaux intermédiaires produits par les scripts (CSV)
├── scripts/    les étapes 1 à 6 + common.py
└── README.md
```

Les étapes 1 et 2 lisent le dépôt Compar:IA à un commit figé (`COMPARIA_COMMIT` dans `common.py`) :
les résultats sont reproductibles même si le dépôt change.

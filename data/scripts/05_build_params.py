"""Étape 5 : assembler les chiffres réels en paramètres de jeu (params.json + sources.json).

Principe : on garde les PROPORTIONS du monde réel, seule l'échelle change.
  - Les chiffres « à la main » ci-dessous viennent de rapports (RTE, INSEE, SDES, ADEME, USGS, Baromètre).
    Chacun a sa source dans SOURCES : c'est le tableau de traçabilité.
  - Les chiffres calculés viennent des étapes 2 et 3 (data/out/*.csv) s'ils existent.

Sorties : public/data/params.json et public/data/sources.json
Les valeurs de gameplay (coûts, coefficients de confiance…) restent à régler en playtest (tâche T19).
"""
import csv
from datetime import date

from common import OUT, PUBLIC, write_json

# ---------------------------------------------------------------------------
# 1. Chiffres réels (France métropolitaine sauf mention contraire)
# ---------------------------------------------------------------------------
REEL = {
    "conso_elec_twh_2025": 451.0,          # RTE, Bilan électrique 2025 (corrigée des aléas)
    "prod_nucleaire_twh_2025": 373.0,      # RTE, Bilan électrique 2025
    "prod_totale_twh_2025": 547.5,         # RTE, Bilan électrique 2025
    "co2_g_kwh_2025": 19.6,                # RTE, Bilan électrique 2025 (production)
    "population_metropole_2026": 66.79e6,  # INSEE, population au 1er janvier 2026 (provisoire)
    "datacenters_twh_2023": 3.9,           # SDES, centres de données > 1 GWh/an
    "datacenters_twh_2035_tendanciel": 36.7,  # ADEME (janv. 2026), centres situés en France
    "terres_rares_reserves_t": 85e6,       # USGS MCS 2026 (« plus de 85 Mt »)
    "terres_rares_production_t_2025": 390e3,  # USGS MCS 2026 (estimation 2025)
    "terres_rares_chine_production_t_2025": 270e3,
    "terres_rares_chine_reserves_t": 44e6,
    "adoption_ia_terrain_2023": 0.20,      # Baromètre du numérique (édition 2024)
    "adoption_ia_terrain_2025": 0.48,      # Baromètre du numérique (édition 2026, terrain juin 2025)
    "mefiance_ia_2025": 0.52,              # Baromètre du numérique (édition 2026)
}

# ---------------------------------------------------------------------------
# 2. Proportions qui doivent rester vraies dans le jeu
# ---------------------------------------------------------------------------
HEURES_AN = 8760
kw_par_hab = REEL["conso_elec_twh_2025"] * 1e9 / REEL["population_metropole_2026"] / HEURES_AN
part_dc_aujourdhui = REEL["datacenters_twh_2023"] / REEL["conso_elec_twh_2025"]
part_dc_2035 = REEL["datacenters_twh_2035_tendanciel"] / REEL["conso_elec_twh_2025"]
annees_de_reserves = REEL["terres_rares_reserves_t"] / REEL["terres_rares_production_t_2025"]
part_chine_prod = REEL["terres_rares_chine_production_t_2025"] / REEL["terres_rares_production_t_2025"]

# ---------------------------------------------------------------------------
# 3. Échelle de la planète : seule la population change, les proportions restent
# ---------------------------------------------------------------------------
POPULATION_JEU = 10_000
ville_mw = POPULATION_JEU * kw_par_hab / 1000
dc_mw_depart = ville_mw * part_dc_aujourdhui


def usages_depuis_comparia():
    """Parts d'usage par catégorie (étape 3) si le fichier existe, sinon une liste vide."""
    f = OUT / "comparia_usages_par_categorie.csv"
    if not f.exists():
        print("(étape 3 non lancée : usage_categories laissé vide)")
        return []
    with open(f, encoding="utf-8") as fh:
        return [{"id": r["categorie"], "share": round(float(r["part_pct"]) / 100, 4),
                 "wh": {"p10": float(r["wh_p10"]), "median": float(r["wh_mediane"]), "p90": float(r["wh_p90"])},
                 "essential": None}  # à décider : True / False pour la phase 2
                for r in csv.DictReader(fh)]


def energie_par_taille():
    f = OUT / "comparia_energie_par_taille.csv"
    if not f.exists():
        print("(étape 2 non lancée : model_energy laissé vide)")
        return {}
    with open(f, encoding="utf-8") as fh:
        return {f"{r['groupe']}:{r['valeur']}": float(r["mediane_wh_mtok"]) for r in csv.DictReader(fh)}


params = {
    "version": date.today().isoformat(),
    "scale": {"population": POPULATION_JEU,
              "note": "planète miniature : population réduite, proportions réelles conservées (docs/03-donnees.md)"},
    "time": {"tick_months": 1, "tick_seconds": 1.5, "start_year": 2023},
    "real_ratios": {
        "kw_per_inhabitant": round(kw_par_hab, 3),
        "datacenter_share_today": round(part_dc_aujourdhui, 4),
        "datacenter_share_2035": round(part_dc_2035, 4),
        "metal_reserve_years": round(annees_de_reserves),
        "metal_china_production_share": round(part_chine_prod, 2),
        "nuclear_share": round(REEL["prod_nucleaire_twh_2025"] / REEL["prod_totale_twh_2025"], 2),
    },
    "city": {"population": POPULATION_JEU, "power_mw": round(ville_mw, 2), "metals_t_per_year": None},
    "datacenter": {"start_power_mw": round(dc_mw_depart, 3), "compute_pflops": None, "metals_t": None},
    "plant": {"power_mw": None, "metals_t": None},
    "grid": {"loss_pct": None, "upgrade_loss_pct": None},
    "metals": {"initial_stock_t": None},
    "adoption": {"curve": [[2023, REEL["adoption_ia_terrain_2023"]], [2025, REEL["adoption_ia_terrain_2025"]]]},
    "trust": {"initial": round(1 - REEL["mefiance_ia_2025"], 2), "a": None, "b": None, "c": None, "d": None},
    "usage_categories": usages_depuis_comparia(),
    "model_energy_wh_per_mtok": energie_par_taille(),
}

SOURCES = [
    {"param": "city.power_mw", "data": "Consommation d'électricité 2025 (451 TWh) ÷ population",
     "source": "RTE, Bilan électrique 2025 ; INSEE, population au 1er janvier 2026",
     "url": "https://assets.rte-france.com/prod/public/2026-02/Bilan-electrique-2025-principaux-resultats.pdf",
     "license": "Licence Ouverte 2.0", "year": 2025, "transform": "TWh ÷ habitants ÷ 8760 h × population du jeu"},
    {"param": "real_ratios.datacenter_share_today", "data": "Consommation des centres de données > 1 GWh (3,9 TWh)",
     "source": "SDES, La consommation d'électricité des centres de données entre 2018 et 2023",
     "url": "https://www.statistiques.developpement-durable.gouv.fr/la-consommation-delectricite-des-centres-de-donnees-entre-2018-et-2023",
     "license": "À vérifier (données publiques SDES)", "year": 2023, "transform": "3,9 TWh ÷ 451 TWh"},
    {"param": "real_ratios.datacenter_share_2035", "data": "Scénario tendanciel 2035 : 36,7 TWh en France",
     "source": "ADEME, prospective centres de données (janvier 2026)",
     "url": "https://www.connaissancedesenergies.org/data-centers-en-france-quelle-consommation-delectricite-venir",
     "license": "À vérifier", "year": 2026, "transform": "36,7 TWh ÷ 451 TWh (conso supposée stable)"},
    {"param": "real_ratios.metal_reserve_years", "data": "Réserves (> 85 Mt) et production 2025 (390 kt) de terres rares",
     "source": "USGS, Mineral Commodity Summaries 2026", "url": "https://pubs.usgs.gov/publication/mcs2026",
     "license": "Domaine public", "year": 2025, "transform": "réserves ÷ production annuelle"},
    {"param": "adoption.curve", "data": "Part des Français (12 ans et +) utilisant l'IA générative",
     "source": "Baromètre du numérique (CRÉDOC, Arcep, CGE, ANCT, Arcom)",
     "url": "https://www.data.gouv.fr/datasets/barometre-du-numerique",
     "license": "ODbL", "year": 2025, "transform": "aucune (interpolation entre les points)"},
    {"param": "trust.initial", "data": "52 % des Français n'ont pas confiance dans l'IA",
     "source": "Baromètre du numérique, édition 2026",
     "url": "https://www.arcep.fr/uploads/tx_gspublication/barometre-du-numerique-edition-2026_PRESENTATION.pdf",
     "license": "ODbL", "year": 2025, "transform": "1 − 0,52"},
    {"param": "usage_categories", "data": "Catégories et énergie des conversations",
     "source": "Compar:IA, jeu comparIA-conversations", "url": "https://www.data.gouv.fr/datasets/compar-ia",
     "license": "Licence Ouverte 2.0 (Etalab)", "year": 2026, "transform": "data/scripts/03_comparia_conversations.py"},
    {"param": "model_energy_wh_per_mtok", "data": "Énergie estimée par modèle (EcoLogits)",
     "source": "Compar:IA, dépôt GitHub (data/legacy/generated-models.json)",
     "url": "https://github.com/betagouv/ComparIA", "license": "Apache 2.0", "year": 2026,
     "transform": "data/scripts/02_comparia_energie_modeles.py (médiane par taille)"},
    {"param": "cards", "data": "Prompts suggérés aux visiteurs de Compar:IA",
     "source": "Compar:IA, dépôt GitHub (utils/suggestions/fr.json)",
     "url": "https://github.com/betagouv/ComparIA", "license": "Apache 2.0", "year": 2026,
     "transform": "data/scripts/01_comparia_suggestions.py puis réécriture en cartes"},
]

write_json(PUBLIC / "params.json", params)
write_json(PUBLIC / "sources.json", SOURCES)
print("\nProportions réelles conservées :")
for k, v in params["real_ratios"].items():
    print(f"  {k:<32} {v}")
print(f"\nVille de {POPULATION_JEU} habitants : {ville_mw:.2f} MW ; datacenters au départ : {dc_mw_depart:.3f} MW")

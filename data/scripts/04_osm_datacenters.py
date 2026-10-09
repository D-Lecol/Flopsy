"""Étape 4 : datacenters recensés dans OpenStreetMap, par région (fiche « Près de chez toi »).

Source : OpenStreetMap via l'API Overpass, objets taggés telecom=data_center (licence ODbL).
Mention obligatoire : « © les contributeurs d'OpenStreetMap ».
Le recensement est contributif donc incomplet : afficher « au moins N datacenters recensés ».

Sorties :
  data/out/osm_datacenters.csv              un datacenter par ligne (nom, opérateur, lat, lon)
  data/out/osm_datacenters_par_region.csv   nombre par région
"""
import csv
import json
import time
import urllib.parse
import urllib.request
from datetime import date

from common import OUT

OVERPASS = "https://overpass-api.de/api/interpreter"
REGIONS = [
    "Auvergne-Rhône-Alpes", "Bourgogne-Franche-Comté", "Bretagne", "Centre-Val de Loire", "Corse",
    "Grand Est", "Hauts-de-France", "Île-de-France", "Normandie", "Nouvelle-Aquitaine",
    "Occitanie", "Pays de la Loire", "Provence-Alpes-Côte d'Azur",
]


def overpass(query: str) -> dict:
    data = urllib.parse.urlencode({"data": query}).encode()
    req = urllib.request.Request(OVERPASS, data=data, headers={"User-Agent": "flopsy-data/1.0"})
    with urllib.request.urlopen(req, timeout=180) as r:
        return json.load(r)


OUT.mkdir(parents=True, exist_ok=True)
counts = []
points = []
for region in REGIONS:
    q = f"""[out:json][timeout:120];
area["boundary"="administrative"]["admin_level"="4"]["name"="{region}"]->.r;
nwr["telecom"="data_center"](area.r);
out center tags;"""
    elements = overpass(q)["elements"]
    counts.append((region, len(elements)))
    for e in elements:
        c = e.get("center", e)
        t = e.get("tags", {})
        points.append((region, t.get("name", ""), t.get("operator", ""), c.get("lat"), c.get("lon")))
    print(f"{region:<28} {len(elements):>4}")
    time.sleep(2)  # rester poli avec le serveur Overpass public

with open(OUT / "osm_datacenters.csv", "w", newline="", encoding="utf-8") as f:
    w = csv.writer(f)
    w.writerow(["region", "nom", "operateur", "lat", "lon"])
    w.writerows(points)
with open(OUT / "osm_datacenters_par_region.csv", "w", newline="", encoding="utf-8") as f:
    w = csv.writer(f)
    w.writerow(["region", "nb_datacenters_recenses", "date_extraction"])
    for region, n in sorted(counts, key=lambda x: -x[1]):
        w.writerow([region, n, date.today().isoformat()])
print(f"total : au moins {sum(n for _, n in counts)} datacenters recensés en France métropolitaine")

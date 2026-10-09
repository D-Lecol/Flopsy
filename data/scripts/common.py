"""Chemins et utilitaires partagés par les scripts data/ de Flopsy."""
from __future__ import annotations

import json
import urllib.request
from pathlib import Path

DATA = Path(__file__).resolve().parents[1]
RAW = DATA / "raw"
OUT = DATA / "out"
PUBLIC = DATA.parent / "public" / "data"

# Commit figé du dépôt Compar:IA : on lit toujours la même version des fichiers.
COMPARIA_COMMIT = "e56f9c528237642e81510541811976d9d8202f7f"  # 7 octobre 2026
COMPARIA_RAW = f"https://raw.githubusercontent.com/betagouv/ComparIA/{COMPARIA_COMMIT}"


def download(url: str, dest: Path) -> Path:
    """Télécharge `url` vers `dest`, sauf si le fichier existe déjà."""
    dest.parent.mkdir(parents=True, exist_ok=True)
    if dest.exists():
        print(f"déjà présent : {dest.relative_to(DATA)}")
        return dest
    print(f"téléchargement : {url}")
    req = urllib.request.Request(url, headers={"User-Agent": "flopsy-data/1.0"})
    with urllib.request.urlopen(req, timeout=120) as r, open(dest, "wb") as f:
        f.write(r.read())
    return dest


def write_json(path: Path, obj) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(obj, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"écrit : {path}")

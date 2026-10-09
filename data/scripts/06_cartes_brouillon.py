"""Étape 6 : premier jet de cartes-requêtes, réécrites à partir des prompts suggérés Compar:IA.

Chaque carte garde la trace du prompt d'origine (catégorie Compar:IA + texte), pour la traçabilité.
`categorie_energie` renvoie à l'une des 18 catégories des conversations Compar:IA : c'est elle qui
donne la fourchette de Wh de la carte une fois l'étape 3 lancée.
`usage` : « utile » ou « confort ». C'est un choix de game design (discutable, et c'est voulu :
c'est un sujet de débat en classe), pas une donnée.

Sortie : public/data/cards.json (brouillon à compléter jusqu'à ~50 cartes)
"""
import csv

from common import OUT, PUBLIC, write_json

# catégorie des prompts suggérés -> catégorie des conversations (pour l'énergie)
CORRESPONDANCE = {
    "Administratif": "Daily Life & Home & Lifestyle",
    "Conseils": "Health & Wellness & Medicine",
    "Explications": "Education",
    "Sommet pour l'action sur l'IA": "Politics & Government",
    "Idées": "Business & Economics & Finance",
    "Traduction": "Culture & Cultural geography",
    "Recettes": "Food & Drink & Cooking",
    "Recommandations": "Entertainment & Travel & Hobby",
    "Histoires": "Arts",
}

# (catégorie Compar:IA, début du prompt d'origine, texte de la carte, usage)
CARTES = [
    ("Administratif", "Rédige un courrier pour résilier le bail",
     "Un habitant demande à l'IA de rédiger la lettre de résiliation de son bail.", "utile"),
    ("Administratif", "Rédige une lettre formelle pour signaler une erreur sur une facture",
     "Une habitante veut une lettre pour contester une erreur sur sa facture.", "utile"),
    ("Conseils", "Je suis débutant en course à pied",
     "Un habitant demande un programme de course à pied pour les 30 prochains jours.", "utile"),
    ("Conseils", "Propose moi un plan de repas équilibré",
     "Une famille demande un plan de repas équilibrés pour toute la semaine.", "utile"),
    ("Explications", "Reformule le [concept d'empreinte écologique] pour des élèves de lycée",
     "Un élève demande à l'IA de lui expliquer l'empreinte écologique.", "utile"),
    ("Explications", "Décrivez le [concept de l'empreinte carbone]",
     "Une collégienne veut comprendre l'empreinte carbone avec des exemples du quotidien.", "utile"),
    ("Traduction", "Comment traduit-on l'expression 'faire d'une pierre deux coups'",
     "Un habitant veut traduire une expression française en occitan.", "utile"),
    ("Traduction", "Écris un dialogue en [langue] entre deux amis",
     "Une élève demande un dialogue en espagnol pour réviser son oral.", "utile"),
    ("Idées", "J'organise une chasse au trésor pour l'anniversaire de mon enfant",
     "Un parent demande des idées de chasse au trésor pour un anniversaire.", "confort"),
    ("Idées", "En tant que rédacteur publicitaire",
     "Une entreprise demande 5 noms pour son nouveau produit… puis 50 de plus.", "confort"),
    ("Recettes", "Peux-tu m’aider à faire un plat avec ce que j’ai dans mon frigo",
     "Un habitant demande une recette avec les restes de son frigo.", "utile"),
    ("Recettes", "Propose une recette gourmande de dessert vegan",
     "Une habitante demande une dixième idée de dessert, juste pour voir.", "confort"),
    ("Recommandations", "Peux-tu me proposer une playlist de musique pour me motiver",
     "Un habitant demande une playlist pour aller au sport.", "confort"),
    ("Recommandations", "Peux-tu me recommander un film qui mélange science-fiction et comédie",
     "Un groupe d'amis demande à l'IA quel film regarder ce soir.", "confort"),
    ("Histoires", "Écris une histoire en 100 mots, sans utiliser la lettre",
     "Un habitant demande une histoire sans la lettre « e », pour s'amuser.", "confort"),
    ("Histoires", "Imagine une histoire de 200 mots où un personnage doit faire face à un événement surnaturel",
     "Une habitante fait générer 20 histoires de fantômes d'affilée.", "confort"),
    ("Sommet pour l'action sur l'IA", "Pourquoi devrions-nous réguler l'usage de l'IA dans les écoles",
     "Le conseil municipal demande s'il faut encadrer l'IA à l'école.", "utile"),
    ("Sommet pour l'action sur l'IA", "Comment pouvons-nous garantir que les laboratoires d'IA soient transparents",
     "Une association demande comment rendre les entreprises d'IA plus transparentes.", "utile"),
]

with open(OUT / "comparia_suggestions_fr.csv", encoding="utf-8") as f:
    suggestions = list(csv.DictReader(f))

cards = []
for i, (cat, debut, texte, usage) in enumerate(CARTES, start=1):
    origine = next((s["texte"] for s in suggestions if s["categorie"] == cat and s["texte"].startswith(debut)), None)
    if origine is None:
        raise SystemExit(f"Prompt d'origine introuvable : {cat} / {debut!r}")
    cards.append({
        "id": f"card-{i:03d}",
        "text": texte,
        "usage": usage,
        "categorie_energie": CORRESPONDANCE[cat],
        "effects": {  # valeurs provisoires, à équilibrer en playtest
            "accept": {"demand": 0.2 if usage == "utile" else 0.4, "trust": 1},
            "refuse": {"demand": 0, "trust": -1.5 if usage == "utile" else -0.3},
        },
        "source": {"dataset": "Compar:IA - prompts suggérés (utils/suggestions/fr.json)",
                   "categorie": cat, "prompt_origine": origine},
    })

write_json(PUBLIC / "cards.json", cards)
print(f"{len(cards)} cartes ({sum(c['usage'] == 'utile' for c in cards)} utiles, "
      f"{sum(c['usage'] == 'confort' for c in cards)} confort)")

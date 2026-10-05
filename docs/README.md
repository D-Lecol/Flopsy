# Flopsy — Documentation du projet

> **Flopsy** est un jeu de gestion web. Le joueur fait grandir une ville sur une petite planète et doit répondre à une
> demande d'IA générative qui ne cesse de croître, sans épuiser l'énergie, les métaux critiques ni la confiance des
> habitants. Tout le jeu repose sur de vraies données ouvertes.

|                      |                                                   |
|----------------------|---------------------------------------------------|
| **Dépôt**            | <https://github.com/D-Lecol/Flopsy>               |
| **Version en ligne** | <https://flopsy.vercel.app/>                      |
| **Stack**            | React · rsbuild · Tailwind CSS · Vercel           |
| **Équipe**           | 1 développeur (tous les rôles)                    |
| **Période**          | 28 septembre → 27 novembre 2026 (44 jours ouvrés) |
| **Mise à jour**      | 5 octobre 2026                                    |

---

## Sommaire

| # | Chapitre                                  | Contenu                                                                           |
|---|-------------------------------------------|-----------------------------------------------------------------------------------|
| 1 | [Vision et pitch](01-vision.md)           | Pourquoi ce jeu, à qui il s'adresse, le message à faire passer                    |
| 2 | [Logique du jeu](02-logique-du-jeu.md)    | Monde, ressources, règles, les deux phases, fins de partie, diagrammes, décisions |
| 3 | [Données ouvertes](03-donnees.md)         | Analyse des open data, sources par paramètre, Compar:IA, traçabilité, fiches      |
| 4 | [Architecture technique](04-technique.md) | Stack, organisation du code, contrat de données JSON, déploiement                 |
| 5 | [Backlog](05-backlog.md)                  | 39 tâches, toutes à 2 jours maximum, avec dépendances et critères de fin          |
| 6 | [Roadmap](06-roadmap.md)                  | 5 sprints, 3 jalons, Gantt                                                        |
| 7 | [Budget](07-budget.md)                    | Coût du projet pour un dev solo en micro-entreprise                               |

---

## En une minute

- **Le jeu** : une partie dure 10 à 15 minutes. Dans la phase 1, toute la ville adopte l'IA. Dans la phase 2, chaque
  habitant en consomme de plus en plus, souvent pour rien. Construire plus ne suffit alors plus : il faut limiter les
  usages inutiles.
- **Trois façons de perdre** : la panne d'énergie, l'épuisement des métaux critiques, la perte de confiance. Chaque
  défaite affiche un écran « Et dans le monde réel ? » avec un chiffre sourcé.
- **Pas de vraie victoire** : quand la planète est stable et que tous les secrets sont trouvés, le jeu dit « Tu as
  compris les enjeux », puis la planète reste ouverte en mode libre.
- **Les données** : Compar:IA (usages et énergie par conversation), RTE éco2mix, SDES, ADEME, Baromètre du numérique,
  USGS, AI Energy Score.
- **Le planning** : alpha jouable le 30 octobre, bêta testée le 13 novembre, livraison le 27 novembre.
- **Le coût** : environ 19 800 € facturés pour environ 14 000 € nets (TJM de 450 €, micro-entreprise).
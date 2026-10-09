# 3. Données ouvertes — guide pratique

[← Logique du jeu](02-logique-du-jeu.md) · [Sommaire](README.md) · [Technique →](04-technique.md)

> Ce chapitre dit **concrètement** quoi télécharger, où, quelle colonne ou quel chiffre prendre, et où ça va dans le jeu. Les scripts qui font le travail sont dans [`data/`](../data/README.md).

## Sommaire du chapitre

1. [Vue d'ensemble : quoi pour quoi](#31-vue-densemble--quoi-pour-quoi)
2. [Compar:IA, en détail](#32-comparia-en-détail)
3. [Électricité : RTE et INSEE](#33-électricité--rte-et-insee)
4. [Datacenters : SDES, ADEME, OpenStreetMap](#34-datacenters--sdes-ademe-openstreetmap)
5. [Terres rares : USGS](#35-terres-rares--usgs)
6. [Adoption et confiance : Baromètre du numérique](#36-adoption-et-confiance--baromètre-du-numérique)
7. [Fiches bonus : AI Energy Score et FMTI](#37-fiches-bonus--ai-energy-score-et-fmti)
8. [Ce qu'on n'utilise pas](#38-ce-quon-nutilise-pas)
9. [Du chiffre réel au paramètre de jeu](#39-du-chiffre-réel-au-paramètre-de-jeu)
10. [Les scripts data/](#310-les-scripts-data)
11. [Traçabilité, licences, limites](#311-traçabilité-licences-limites)
12. [Références](#312-références)

---

## 3.1 Vue d'ensemble : quoi pour quoi

| Besoin du jeu                        | Source                                    | Ce qu'on prend exactement                              | Où ça va                                        |
|--------------------------------------|-------------------------------------------|--------------------------------------------------------|-------------------------------------------------|
| **Cartes-requêtes**                  | Compar:IA, **prompts suggérés** (GitHub)  | Les 284 prompts en français, rangés en 9 catégories    | `cards.json`                                    |
| **Répartition des usages** (phase 2) | Compar:IA, **conversations** (parquet)    | Colonne `categories` : part de chaque catégorie        | `params.json` → `usage_categories`              |
| **Énergie d'un usage**               | Compar:IA, **conversations** (parquet)    | Colonnes kWh par conversation, en fourchette p10 à p90 | Cartes, panneau Usages, fin « Surconsommation » |
| **Énergie selon le modèle**          | Compar:IA, **liste des modèles** (GitHub) | `wh_per_million_token` de 154 modèles                  | Fiche « Petit ou gros modèle ? »                |
| **Consommation de la ville**         | RTE, Bilan électrique 2025, et INSEE      | 451 TWh ÷ 66,79 M habitants                            | `city.power_mw`                                 |
| **Part des datacenters**             | SDES, et ADEME pour 2035                  | 3,9 TWh (2023) ; 36,7 TWh (2035, scénario tendanciel)  | Équilibrage, graphique du bilan, fin « Panne »  |
| **Centrale**                         | RTE, Bilan électrique 2025                | Nucléaire : 373 TWh sur 547,5 ; 19,6 gCO₂/kWh          | Encyclopédie, centrale                          |
| **Stock de terres rares**            | USGS, MCS 2026                            | Terres rares : réserves > 85 Mt, production 390 kt/an  | `metals.initial_stock_t`, fin « Métaux »        |
| **Courbe d'adoption**                | Baromètre du numérique                    | 20 % puis 48 % d'utilisateurs de l'IA générative       | `adoption.curve`                                |
| **Confiance de départ**              | Baromètre du numérique 2026               | 52 % se méfient de l'IA                                | `trust.initial`, fin « Confiance »              |
| **Fiches des secrets**               | OSM, AI Energy Score, FMTI, SDES, ADEME   | Un chiffre par fiche                                   | `fiches.json`                                   |

---

## 3.2 Compar:IA, en détail

Compar:IA fournit **trois choses différentes**, à trois endroits différents. C'est la source principale du jeu.

|                  | A. Prompts suggérés                                                   | B. Énergie par modèle                                   | C. Conversations                                                 |
|------------------|-----------------------------------------------------------------------|---------------------------------------------------------|------------------------------------------------------------------|
| **Ce que c'est** | Les idées de questions proposées aux visiteurs du site                | L'énergie estimée de chaque modèle d'IA                 | Toutes les vraies conversations du site                          |
| **Où**           | Dépôt GitHub `betagouv/ComparIA`, fichier `utils/suggestions/fr.json` | Même dépôt, fichier `data/legacy/generated-models.json` | data.gouv.fr, jeu « Compar:IA », fichier `conversations.parquet` |
| **Taille**       | 284 prompts                                                           | 154 modèles                                             | Environ 2,6 Go                                                   |
| **Licence**      | Apache 2.0                                                            | Apache 2.0                                              | Licence Ouverte 2.0 (Etalab)                                     |
| **Script**       | `01_comparia_suggestions.py`                                          | `02_comparia_energie_modeles.py`                        | `03_comparia_conversations.py`                                   |
| **Sert à**       | **Écrire les cartes-requêtes**                                        | Fiche « petit ou gros modèle »                          | Parts d'usage et kWh réels                                       |

### A. Les prompts suggérés : la source des cartes-requêtes

**Où les trouver sur le site** : sur [comparia.beta.gouv.fr](https://comparia.beta.gouv.fr/), avant de taper une question, le site propose des catégories d'idées (« Rédiger un document administratif », « Découvrir une nouvelle recette »…). Chaque catégorie contient des questions toutes prêtes. Ce sont ces questions qui sont stockées dans le fichier `utils/suggestions/fr.json` du dépôt GitHub.

**Pourquoi c'est la meilleure base pour les cartes** : les textes sont courts, propres, en français, sans donnée personnelle, et déjà rangés par catégorie. Pas besoin de fouiller 2,6 Go de conversations.

**Contenu** (vérifié sur le dépôt, commit du 7 octobre 2026) :

| Catégorie Compar:IA           | Description                                            | Prompts | Exemple réel                                                                                          |
|-------------------------------|--------------------------------------------------------|--------:|-------------------------------------------------------------------------------------------------------|
| Administratif                 | Rédiger un document administratif                      |      13 | « Rédige un courrier pour résilier le bail de mon appartement »                                       |
| Conseils                      | Conseils sur l'alimentation et le sport                |      18 | « Je suis débutant en course à pied. Peux-tu me proposer un programme pour les 30 prochains jours ? » |
| Explications                  | Expliquer simplement un concept                        |      30 | « Reformule le [concept d'empreinte écologique] pour des élèves de lycée »                            |
| Sommet pour l'action sur l'IA | Questions issues de la consultation citoyenne sur l'IA |     103 | « Pourquoi devrions-nous réguler l'usage de l'IA dans les écoles ? »                                  |
| Idées                         | Générer de nouvelles idées                             |       9 | « J'organise une chasse au trésor pour l'anniversaire de mon enfant… »                                |
| Traduction                    | S'exprimer dans une autre langue                       |      17 | « Comment traduit-on 'faire d'une pierre deux coups' en [occitan] ? »                                 |
| Recettes                      | Découvrir une recette                                  |      23 | « Peux-tu m'aider à faire un plat avec ce que j'ai dans mon frigo ? »                                 |
| Recommandations               | Films, livres, musique                                 |      30 | « Peux-tu me proposer une playlist de musique pour me motiver à aller au sport ? »                    |
| Histoires                     | Raconter une histoire                                  |      41 | « Écris une histoire en 100 mots, sans utiliser la lettre "e"… »                                      |
| **Total**                     |                                                        | **284** |                                                                                                       |

Les crochets `[ ]` marquent un trou à remplir (« [ingrédient] »). Le script les signale dans la colonne `a_completer`.

**De la suggestion à la carte** (exemple réel, tiré de `public/data/cards.json`) :

| Étape               | Contenu                                                                                                                             |
|---------------------|-------------------------------------------------------------------------------------------------------------------------------------|
| Prompt d'origine    | « Écris une histoire en 100 mots, sans utiliser la lettre "e", où un enfant découvre un objet mystérieux… » (catégorie *Histoires*) |
| Carte dans le jeu   | « Un habitant demande une histoire sans la lettre « e », pour s'amuser. »                                                           |
| Usage               | **confort** (choix de game design)                                                                                                  |
| Catégorie d'énergie | *Arts* : sa fourchette de Wh vient des conversations réelles (C)                                                                    |
| Accepter            | Demande +0,4, confiance +1                                                                                                          |
| Refuser             | Confiance −0,3                                                                                                                      |

**Le script `06_cartes_brouillon.py` contient déjà 18 cartes** (2 par catégorie : 11 « utiles », 7 « confort »). Chaque carte garde son prompt d'origine pour la traçabilité. Il reste à compléter jusqu'à environ 50 (tâche T17).

> **Utile ou confort ?** Ce classement n'est pas une donnée : c'est un choix de conception, et il est discutable. C'est voulu, car c'est un excellent sujet de débat en classe (« Demander une playlist à l'IA, c'est inutile ? »). Le dire dans l'Encyclopédie.

### B. L'énergie par modèle

Dans `generated-models.json`, chaque modèle a un champ `wh_per_million_token` : l'énergie estimée (méthode **EcoLogits**) pour générer un million de tokens. C'est avec ce chiffre que Compar:IA calcule les kWh de chaque conversation :

```
kWh d'une réponse = wh_per_million_token ÷ 1 000 000 × nombre de tokens ÷ 1 000
```

**Résultats du script 02** (154 modèles, fichier daté d'août 2026) :

| Taille du modèle      | Modèles | Médiane (Wh par million de tokens) | Pour une réponse de 500 tokens |
|-----------------------|--------:|-----------------------------------:|-------------------------------:|
| XS                    |      29 |                                 89 |                       0,045 Wh |
| S                     |      36 |                                115 |                       0,057 Wh |
| M                     |      10 |                                658 |                        0,33 Wh |
| L                     |      34 |                              1 524 |                        0,76 Wh |
| XL                    |      45 |                              3 979 |                        1,99 Wh |
| Sans raisonnement     |     102 |                                244 |                        0,12 Wh |
| **Avec raisonnement** |      52 |                          **2 506** |                    **1,25 Wh** |

**À retenir pour le jeu** : pour une même réponse, un très gros modèle consomme environ **45 fois plus** qu'un petit, et un modèle « qui réfléchit » environ **10 fois plus** (médianes). C'est une fiche toute trouvée, et un argument pour la phase 2 : choisir le bon outil fait partie de la sobriété.

### C. Les conversations (parquet)

**Où** : sur [data.gouv.fr/datasets/compar-ia](https://www.data.gouv.fr/datasets/compar-ia), ressource « comparIA-conversations ». Lien direct (environ 2,6 Go) :
`https://ministere-culture.s3.sbg.io.cloud.ovh.net/COMPARIA/conversations.parquet`.
Le même jeu existe sur Hugging Face (`ministere-culture/comparia-conversations`), mais il faut un compte et accepter des conditions.

**Comment l'ouvrir** : pas avec Excel. On utilise **DuckDB** (`pip install duckdb`), qui lit le fichier sans tout charger en mémoire. Le script 03 le fait pour toi.

**Les colonnes utiles** :

| Colonne                                | Contenu                                                    | Usage dans le jeu                           |
|----------------------------------------|------------------------------------------------------------|---------------------------------------------|
| `opening_msg`                          | Première question de l'utilisateur                         | Inspiration pour des cartes supplémentaires |
| `categories`                           | Liste de catégories (attribuées par un LLM côté Compar:IA) | **Répartition des usages** en phase 2       |
| `total_conv_a_kwh`, `total_conv_b_kwh` | Énergie estimée de chacun des 2 modèles comparés           | **Fourchette d'énergie** par catégorie      |
| `total_conv_a_output_tokens`, `…_b_…`  | Tokens générés                                             | Longueur typique des réponses               |
| `languages`                            | Langues détectées                                          | Garder `fr`                                 |
| `contains_pii`                         | Données personnelles détectées                             | Exclure                                     |
| `model_a_name`, `model_a_total_params` | Modèle et taille                                           | Optionnel                                   |

> Le schéma a changé entre les versions publiées. Dans le code récent de Compar:IA, les colonnes s'appellent `total_conso_a` et `total_tokens_a`. Le script 03 détecte automatiquement les deux variantes et affiche toutes les colonnes au lancement.

**Les 18 catégories** possibles dans `categories` (taxonomie « TXT360 » utilisée par Compar:IA) :

|                                        |                                               |                                                 |
|----------------------------------------|-----------------------------------------------|-------------------------------------------------|
| Arts                                   | Business & Economics & Finance                | Culture & Cultural geography                    |
| Daily Life & Home & Lifestyle          | Education                                     | Entertainment & Travel & Hobby                  |
| Environment                            | Food & Drink & Cooking                        | Health & Wellness & Medicine                    |
| Law & Justice                          | Natural Science & Formal Science & Technology | Personal Development & Human Resources & Career |
| Politics & Government                  | Religion & Spirituality                       | Shopping & Commodity                            |
| Society & Social Issues & Human Rights | Sports                                        | Other                                           |

**Ce que produit le script 03** :

- `comparia_usages_par_categorie.csv` : pour chaque catégorie, le nombre de conversations, la **part en %**, l'énergie **p10 / médiane / p90 en Wh** et la médiane de tokens. Une conversation peut avoir plusieurs catégories, donc les parts additionnées dépassent 100 % : il faut les normaliser dans le jeu.
- `comparia_exemples_questions.csv` : 30 vraies questions courtes par catégorie, pour s'inspirer.

Je n'ai pas pu lancer le script 03 sur le vrai fichier depuis mon environnement : l'accès réseau à data.gouv.fr y est bloqué. Je l'ai testé sur un faux fichier qui reprend les deux schémas. **Lance-le chez toi** : c'est lui qui donnera les vrais pourcentages et les vraies fourchettes de Wh.

---

## 3.3 Électricité : RTE et INSEE

Inutile de passer par l'API éco2mix : les chiffres annuels du **Bilan électrique 2025** de RTE suffisent.

| Chiffre (France métropolitaine)              | Valeur                                        | Source                     |
|----------------------------------------------|-----------------------------------------------|----------------------------|
| Consommation 2025 (corrigée des aléas)       | **451 TWh** (brute : 446,2 TWh)               | RTE, Bilan électrique 2025 |
| Production totale                            | 547,5 TWh                                     | RTE                        |
| Production nucléaire                         | 373 TWh, soit environ **68 %**                | RTE                        |
| Production décarbonée                        | 95,2 %                                        | RTE                        |
| Intensité carbone de la production           | **19,6 gCO₂eq/kWh**                           | RTE                        |
| Datacenters raccordés au réseau de transport | Près de 1 TWh en 2025 (0,8 en 2024)           | RTE                        |
| Population au 1er janvier 2026               | **66,79 millions** (France entière : 69,08 M) | INSEE (provisoire)         |

**Calcul utilisé** : 451 TWh ÷ 66,79 M habitants ÷ 8 760 h = **0,77 kW par habitant** en moyenne (tous usages : logements, industrie, services).

Pour aller plus loin (courbes heure par heure), éco2mix existe en open data sur data.gouv.fr et ODRÉ (Licence Ouverte). Ce n'est pas nécessaire pour le jeu.

---

## 3.4 Datacenters : SDES, ADEME, OpenStreetMap

**SDES** : [La consommation d'électricité des centres de données entre 2018 et 2023](https://www.statistiques.developpement-durable.gouv.fr/la-consommation-delectricite-des-centres-de-donnees-entre-2018-et-2023), publiée le 16 octobre 2025. Un fichier Excel est téléchargeable en bas de page (« Données des figures », environ 100 Ko).

| Chiffre                                                 | Valeur                                                                      |
|---------------------------------------------------------|-----------------------------------------------------------------------------|
| Consommation des 460 centres de plus de 1 GWh/an (2023) | **3,9 TWh**, soit environ 0,9 % de la consommation française                |
| Total estimé, petits centres compris                    | 4 à 6 TWh                                                                   |
| Croissance                                              | +21 % (la page est ambiguë sur la période : vérifier dans le fichier Excel) |
| Concentration                                           | 64 % en Île-de-France                                                       |

**ADEME** : prospective sur les centres de données (janvier 2026).

| Chiffre                                   | Valeur                                                                   |
|-------------------------------------------|--------------------------------------------------------------------------|
| Scénario tendanciel 2035, usages français | Environ **105 TWh**, dont **36,7 TWh** dans des centres situés en France |
| Écart entre scénarios (horizon 2060)      | De la division par 2 à la multiplication par 7                           |

→ 36,7 TWh rapportés à 451 TWh, c'est environ **8 %** de l'électricité française en 2035, contre environ 1 % aujourd'hui. C'est la courbe « monde réel » de l'écran de bilan.

**OpenStreetMap** (fiche « Près de chez toi ») : le script 04 interroge l'API Overpass, objets `telecom=data_center`, région par région. Il donne un nombre par région et une liste de points. Les données sont contributives, donc incomplètes : afficher « au moins N datacenters recensés ». La mention « © les contributeurs d'OpenStreetMap » est obligatoire (licence ODbL).

---

## 3.5 Terres rares : USGS

**Source** : [USGS, Mineral Commodity Summaries 2026](https://pubs.usgs.gov/publication/mcs2026), chapitre « Rare Earths » (domaine public, publié en février 2026).

| Chiffre (terres rares, en tonnes d'oxydes)    | Valeur                       |
|-----------------------------------------------|------------------------------|
| Production minière mondiale 2025 (estimation) | **390 000 t**                |
| dont Chine                                    | 270 000 t, soit **69 %**     |
| Réserves mondiales                            | **plus de 85 millions de t** |
| dont Chine                                    | 44 millions de t, soit 52 %  |

→ Réserves ÷ production ≈ **218 ans** au rythme actuel. La rareté vient donc moins des réserves que de la **concentration** de la production. C'est le message de la fin « Métaux épuisés » et de l'événement « Tension sur les métaux ».

Le même rapport a un chapitre par métal (gallium, germanium, cobalt, cuivre) pour les fiches « Les métaux des puces ».

---

## 3.6 Adoption et confiance : Baromètre du numérique

**Chiffres clés** : la présentation de l'édition 2026 (Arcep). Terrain CRÉDOC du 5 au 21 juin 2025, 4 145 personnes, représentatives des **12 ans et plus**.

| Chiffre                                                                                | Valeur                                        | Usage dans le jeu          |
|----------------------------------------------------------------------------------------|-----------------------------------------------|----------------------------|
| Utilisateurs de l'IA générative                                                        | **48 %** (contre 20 % deux éditions plus tôt) | Courbe d'adoption          |
| 18-24 ans utilisateurs                                                                 | 85 %                                          | Fiche                      |
| Usage au moins hebdomadaire (parmi les utilisateurs)                                   | 64 %                                          | Intensité d'usage          |
| Méfiance envers l'IA                                                                   | **52 %**                                      | Confiance de départ : 48 % |
| Pensent que l'IA générative a plus d'impact environnemental qu'une recherche classique | 46 %                                          | Fiche, débat               |

**Microdonnées** (optionnel, si tu veux recalculer par âge, par exemple les 12-17 ans) : sur [data.gouv.fr/datasets/barometre-du-numerique](https://www.data.gouv.fr/datasets/barometre-du-numerique), la « base 2025 » (CSV, 20,6 Mo) et son dictionnaire des questions (XLSX). Attention, la licence est **ODbL** et non Licence Ouverte.

---

## 3.7 Fiches bonus : AI Energy Score et FMTI

**AI Energy Score** : [leaderboard Hugging Face](https://huggingface.co/spaces/AIEnergyScore/Leaderboard). Les données sont dans le dossier `data/energy/` du Space : un CSV par tâche (`text_generation.csv`, `reasoning.csv`…), avec les colonnes `model`, `total_gpu_energy`, `energy_score`, `class` et `test date`. L'unité de `total_gpu_energy` est à vérifier dans la documentation. Pour la fiche, le plus simple est de citer la v2 (décembre 2025) : **un modèle avec raisonnement consomme en moyenne environ 30 fois plus**. C'est cohérent avec le rapport d'environ 10 trouvé dans les données Compar:IA (§ 3.2 B), avec une méthode différente : ce sont deux chiffres à montrer ensemble.

**FMTI (Stanford)** : la transparence moyenne des grands modèles passe de **58/100 (2024) à 40/100 (2025)**. Utiliser l'édition 2025 (décembre 2025), pas celle de mai 2024 citée dans le CSV. C'est la fiche « Boîtes noires », liée à la confiance.

---

## 3.8 Ce qu'on n'utilise pas

| Jeu de données                                                             | Pourquoi                                                                                                                                                                                                         |
|----------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Consommation d'électricité et de gaz par IRIS des sites industriels (ODRÉ) | Les datacenters n'y sont pas identifiés, seuls les sites raccordés au réseau de transport sont comptés, la maille IRIS n'a pas de sens sur une planète fictive, et la dernière mise à jour date de décembre 2024 |
| Compar:IA « votes » et « réactions »                                       | Utiles pour classer les modèles, pas pour le gameplay                                                                                                                                                            |
| API éco2mix temps réel                                                     | Les chiffres annuels de RTE suffisent                                                                                                                                                                            |
| AIE « Energy and AI »                                                      | Licence restrictive : on peut citer un chiffre, pas republier les données                                                                                                                                        |

---

## 3.9 Du chiffre réel au paramètre de jeu

**Règle** : on garde les **proportions** réelles, seule la population change. Exemple calculé par `05_build_params.py` pour une ville de 10 000 habitants :

| Proportion réelle                                | Valeur          | Dans le jeu (10 000 habitants)                                   |
|--------------------------------------------------|-----------------|------------------------------------------------------------------|
| Consommation par habitant                        | 0,77 kW         | Ville : **7,7 MW**                                               |
| Part des datacenters aujourd'hui                 | 0,86 %          | Datacenters au départ : **0,07 MW**                              |
| Part des datacenters en 2035 (ADEME, tendanciel) | 8,1 %           | Repère : à ce niveau, le joueur doit sentir la tension           |
| Années de réserves de terres rares               | ≈ 218 ans       | Stock initial = environ 218 × la consommation annuelle de départ |
| Part de la Chine dans la production              | 69 %            | Événement « Tension sur les métaux »                             |
| Part du nucléaire                                | 68 %            | Texte de l'Encyclopédie sur la centrale                          |
| Confiance de départ                              | 1 − 0,52 = 48 % | `trust.initial`                                                  |

Le jeu accélère volontairement : en 10 à 15 minutes, la demande d'IA dépasse largement la trajectoire de l'ADEME. L'écran de bilan montre l'écart : « Ta planète est allée plus loin que le scénario tendanciel ».

Les valeurs de gameplay (coût d'un datacenter, coefficients de confiance…) ne viennent pas des données. Elles se règlent en playtest (tâche T19).

---

## 3.10 Les scripts data/

| Script                           | Entrée                            | Sortie                                                                         | Testé ?                                              |
|----------------------------------|-----------------------------------|--------------------------------------------------------------------------------|------------------------------------------------------|
| `01_comparia_suggestions.py`     | GitHub Compar:IA                  | `out/comparia_suggestions_fr.csv` (284 lignes)                                 | ✅ lancé, résultat fourni                            |
| `02_comparia_energie_modeles.py` | GitHub Compar:IA                  | `out/comparia_modeles_energie.csv`, `out/comparia_energie_par_taille.csv`      | ✅ lancé, résultat fourni                            |
| `03_comparia_conversations.py`   | `conversations.parquet`           | `out/comparia_usages_par_categorie.csv`, `out/comparia_exemples_questions.csv` | ⚠️ testé sur un faux fichier : **à lancer chez toi** |
| `04_osm_datacenters.py`          | API Overpass                      | `out/osm_datacenters*.csv`                                                     | ⚠️ non lancé (réseau bloqué dans mon environnement)  |
| `05_build_params.py`             | Chiffres sourcés et `out/*.csv`   | `public/data/params.json`, `public/data/sources.json`                          | ✅                                                   |
| `06_cartes_brouillon.py`         | `out/comparia_suggestions_fr.csv` | `public/data/cards.json` (18 cartes)                                           | ✅                                                   |

Mode d'emploi : [`data/README.md`](../data/README.md).

---

## 3.11 Traçabilité, licences, limites

**Traçabilité** : `public/data/sources.json` contient une ligne par paramètre (donnée, source, lien, licence, année, transformation). L'Encyclopédie et les crédits du jeu sont générés à partir de ce fichier.

**Licences** :

| Licence                      | Obligation                                                    | Sources                                              |
|------------------------------|---------------------------------------------------------------|------------------------------------------------------|
| Licence Ouverte 2.0 (Etalab) | Citer la source et la date                                    | Compar:IA (conversations), RTE, INSEE                |
| Apache 2.0                   | Citer le projet et garder la mention de licence               | Compar:IA (prompts suggérés, liste des modèles)      |
| ODbL                         | Citer ; partage à l'identique si on republie une base dérivée | OpenStreetMap, Baromètre du numérique (microdonnées) |
| Domaine public               | Aucune (citer par honnêteté)                                  | USGS                                                 |
| À vérifier                   | Lire les conditions avant de republier                        | SDES (fichier Excel), ADEME, AI Energy Score         |

**Limites à écrire noir sur blanc** (Encyclopédie et README) :

- Planète miniature : population réduite, proportions réelles conservées.
- Une seule source d'énergie, la centrale fictive.
- « Terres rares » est une simplification : dans un datacenter, les terres rares au sens strict sont surtout dans les aimants (disques, ventilateurs), alors que les puces dépendent d'autres métaux critiques (gallium, germanium, cuivre…).
- Les kWh de Compar:IA sont des **estimations** (EcoLogits), à afficher toujours en fourchette. Éviter le chiffre « une requête IA = 10 recherches Google », ancien et discuté.
- Les années diffèrent selon les sources (2023 pour le SDES, 2025 pour RTE) : les afficher.
- Le classement « utile / confort » des usages est un choix de conception, pas une donnée.

---

## 3.12 Références

- Compar:IA : [data.gouv.fr](https://www.data.gouv.fr/datasets/compar-ia) · [dépôt GitHub](https://github.com/betagouv/ComparIA) · [Hugging Face](https://huggingface.co/datasets/ministere-culture/comparia-conversations) · [site](https://comparia.beta.gouv.fr/)
- [RTE, Bilan électrique 2025 : principaux résultats](https://assets.rte-france.com/prod/public/2026-02/Bilan-electrique-2025-principaux-resultats.pdf)
- [INSEE, population au 1er janvier](https://www.insee.fr/fr/statistiques/5225246)
- [SDES, consommation d'électricité des centres de données 2018-2023](https://www.statistiques.developpement-durable.gouv.fr/la-consommation-delectricite-des-centres-de-donnees-entre-2018-et-2023)
- [ADEME, scénarios data centers (synthèse)](https://www.connaissancedesenergies.org/data-centers-en-france-quelle-consommation-delectricite-venir)
- [USGS, Mineral Commodity Summaries 2026](https://pubs.usgs.gov/publication/mcs2026) · [chapitre Terres rares](https://pubs.usgs.gov/periodicals/mcs2026/mcs2026-rare-earths.pdf)
- [Baromètre du numérique, édition 2026 (présentation Arcep)](https://www.arcep.fr/uploads/tx_gspublication/barometre-du-numerique-edition-2026_PRESENTATION.pdf) · [microdonnées sur data.gouv.fr](https://www.data.gouv.fr/datasets/barometre-du-numerique) · [synthèse](https://www.blogdumoderateur.com/ia-generative-francais-utilisent-adoption-record/)
- [OpenStreetMap France (data.gouv.fr)](https://www.data.gouv.fr/datasets/donnees-openstreetmap-integrales-de-france-metropolitaine)
- [AI Energy Score v2](https://huggingface.co/blog/sasha/ai-energy-score-v2) · [données du leaderboard](https://huggingface.co/spaces/AIEnergyScore/Leaderboard/tree/main/data/energy)
- [The 2025 Foundation Model Transparency Index](https://arxiv.org/abs/2512.10169v1)
- [Consommation électricité et gaz par IRIS, sites industriels (ODRÉ)](https://www.data.gouv.fr/datasets/consommation-annuelle-definitive-delectricite-et-de-gaz-par-iris-des-sites-industriels-raccordes-aux-reseaux-de-transport)

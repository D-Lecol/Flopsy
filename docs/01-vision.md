# 1. Vision et pitch

[← Sommaire](README.md) · [Logique du jeu →](02-logique-du-jeu.md)

## 1.1 Pitch

Imaginez : vous gérez une ville sur une petite planète, et tous ses habitants veulent utiliser l'IA. Vous construisez des centres de calcul, encore et encore. Et un jour, vous comprenez que construire plus ne suffit plus.

Les élèves se servent déjà de l'IA tous les jours, mais ils ne voient pas ce qu'il y a derrière : de l'énergie, des métaux rares, des ressources qui ne sont pas infinies.

Flopsy est un jeu de gestion. La ville utilise de plus en plus l'IA : les habitants, les entreprises, les outils du quotidien. La mission du joueur est de répondre à cette demande qui ne s'arrête jamais de grimper. Pour cela, il construit des centres de calcul. Ils coûtent des métaux rares, et il faut les alimenter en énergie. Mais la ville aussi a besoin de cette énergie. Quand elle manque, le joueur doit choisir : **qui s'éteint en premier, la ville ou l'IA ?**

Le jeu se joue en deux temps. D'abord, toute la ville se met à utiliser l'IA, et le joueur pense avoir réussi. Mais chaque habitant en utilise ensuite de plus en plus, et souvent pour rien. Pour tenir, il faut apprendre à limiter ces usages inutiles.

Une règle : **on ne peut pas vraiment gagner**, parce que dans la réalité ces problèmes ne sont pas réglés. Quand la planète est stable et que tous les secrets sont trouvés, le jeu dit simplement : *tu as compris les enjeux*.

> **Comprendre l'IA en jouant, avec de vraies données.**

## 1.2 Public

| | |
|---|---|
| **Joueurs** | Élèves de 4e et de seconde, les niveaux concernés par la formation Pix à l'IA |
| **Utilisation** | En classe, sur ordinateur ou tablette. Une partie tient dans une séance (10 à 15 min), puis l'enseignant peut lancer un débat |
| **Compte** | Aucun : on ouvre la page et on joue |

## 1.3 Objectif pédagogique

Faire comprendre trois idées, dans cet ordre :

1. **L'IA a un coût physique** : de l'électricité et des métaux, pris sur les mêmes ressources que celles dont la ville a besoin.
2. **La demande ne s'arrête pas à l'adoption** : une fois que tout le monde utilise l'IA, c'est l'intensité d'usage qui explose.
3. **La sobriété est un levier** : réduire les usages inutiles est plus efficace que de construire sans fin.

## 1.4 Principes de conception

| Principe | Traduction dans le jeu |
|---|---|
| **Vraies proportions** | Les paramètres viennent de données réelles. On conserve les rapports entre les grandeurs (part des datacenters dans l'électricité, rythme de croissance, stock de métaux face aux besoins), seule l'échelle de la planète change |
| **Chaque chiffre est sourcé** | Infobulles « D'où vient ce chiffre ? », une Encyclopédie et des crédits des données |
| **La défaite enseigne** | Chaque fin de partie relie la situation à un fait réel, sous le titre « Et dans le monde réel ? » |
| **Curiosité récompensée** | Des secrets cachés sur la carte débloquent des fiches de données |
| **Court et lisible** | 10 à 15 minutes, des textes simples, 4 jauges |

## 1.5 Ce qui rend le projet solide

- **Un vrai moteur de simulation** : testé, déterministe, calibré sur des données.
- **Un usage réel de l'open data** : un pipeline reproductible, un tableau de traçabilité, et la republication du jeu de cartes et des paramètres sur data.gouv.fr. Le projet produit de l'open data en plus d'en réutiliser.
- **Une interface soignée** : une carte, des jauges, des écrans de fin et un bilan avec graphiques.

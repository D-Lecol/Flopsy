import Logo from '../../core/Logo.js';

export default function Credits() {
  return (
    <div className="flex flex-col w-full">
      <div className="w-full bg-surface-container-high px-gutter-desktop py-space-sm">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-space-sm font-label-sm text-label-sm text-on-surface-variant">
          <div className="flex items-center gap-space-md">
            <span className="flex items-center gap-1.5 font-semibold text-primary">
              <span className="w-2 h-2 rounded-full bg-primary inline-block"></span>
              FLOPSY-REF // PROTOCOLE DE RECHERCHE
            </span>
            <span className="text-outline-variant">|</span>
            <span>SECTION : ÉDUCATION &amp; LIMITES PHYSIQUES</span>
          </div>
          <div className="flex items-center gap-space-md">
            <span className="font-label-sm bg-surface px-space-xs py-0.5 rounded text-on-surface">
              CALIBRATION ÉCO-NUMÉRIQUE
            </span>
            <span className="hidden md:inline text-secondary font-medium">
              LICENCE OPEN DATA AGPL-3.0
            </span>
          </div>
        </div>
      </div>

      <section className="w-full px-gutter-desktop py-space-xl bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center">
            <div className="lg:col-span-8 flex flex-col gap-space-md">
              <div className="inline-flex items-center gap-space-xs px-space-sm py-1 bg-surface-container rounded w-fit">
                <span className="material-symbols-outlined text-primary text-[18px]">
                  biotech
                </span>
                <span className="font-label-sm text-label-sm font-semibold uppercase tracking-wider text-primary">
                  Modélisation Systémique &amp; Serious Game
                </span>
              </div>
              <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">
                Les limites physiques de <br className="hidden sm:inline" />
                <span className="text-primary underline decoration-primary/20 underline-offset-8">
                  l'intelligence artificielle
                </span>
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
                FLOPSY est un projet open-source né pour dissiper l'illusion
                d'une IA immatérielle. À travers un simulateur cartographique
                rigoureux, le joueur fait l'expérience directe des goulots
                d'étranglement : terres rares, mégawatts, surconsommation
                d'usages et choix de société.
              </p>
              <div className="flex flex-wrap items-center gap-space-md pt-space-xs">
                <a
                  className="px-space-lg py-2.5 bg-primary text-on-primary font-label-lg text-label-lg rounded uppercase tracking-wider font-semibold shadow-sm hover:bg-primary-container transition-colors flex items-center gap-space-xs"
                  href="#"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    play_circle
                  </span>
                  Lancer la Simulation
                </a>
                <a
                  className="px-space-lg py-2.5 bg-surface-container text-on-surface font-label-lg text-label-lg rounded uppercase tracking-wider font-medium hover:bg-surface-container-high transition-colors flex items-center gap-space-xs"
                  href="#sources"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    menu_book
                  </span>
                  Sources Documentaires
                </a>
              </div>
            </div>
            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <div className="bg-surface-container-low p-space-lg rounded-xl shadow-md flex flex-col items-center text-center w-full max-w-sm">
                <Logo />
                <div className="font-headline-sm text-headline-sm text-on-surface">
                  FLOPSY SIMULATION
                </div>
                <span className="font-label-sm text-label-sm text-primary uppercase font-bold mt-1">
                  GRID • COMPUTE • RESOURCES
                </span>
                <div className="w-full bg-surface-container mt-space-md p-space-sm rounded text-left flex flex-col gap-1 font-label-sm text-label-sm text-on-surface-variant">
                  <div className="flex justify-between">
                    <span>Régime de calcul :</span>
                    <span className="font-semibold text-on-surface">
                      PFLOP/s
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Vecteur énergétique :</span>
                    <span className="font-semibold text-on-surface">
                      MW continu
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Contrainte géologique :</span>
                    <span className="font-semibold text-on-surface">
                      Stock fini (t)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full px-gutter-desktop py-space-xl bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto flex flex-col gap-space-xl">
          <div className="flex flex-col gap-space-xs">
            <span className="font-label-sm text-label-sm text-primary uppercase font-semibold tracking-wider">
              01 // Cadre Pédagogique
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">
              Pourquoi FLOPSY ? Rendre palpable l'invisible
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl">
              Dans l'inconscient collectif, l'IA est un nuage abstrait. Dans les
              faits, chaque inférence et chaque entraînement repose sur des
              circuits de silicium gravés à l'échelle nanométrique, des
              transformateurs haute tension et des tonnes d'éléments chimiques
              non renouvelables.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">
            <div className="bg-surface-container p-space-lg rounded flex flex-col justify-between gap-space-md hover:bg-surface-container-high transition-colors">
              <div className="flex flex-col gap-space-xs">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm px-1.5 py-0.5 rounded bg-surface text-primary font-bold">
                    CALCUL
                  </span>
                  <span className="material-symbols-outlined text-primary text-[22px]">
                    memory
                  </span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mt-space-xs">
                  PFLOP/s
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  La puissance brute requise pour alimenter les inférences grand
                  public et les pipelines industriels. Lorsque la puissance
                  installée n'absorbe plus le pic, la disponibilité chute
                  immédiatement.
                </p>
              </div>
              <div className="bg-surface-container-low p-space-xs rounded font-label-sm text-label-sm text-on-surface-variant">
                <span className="text-on-surface font-semibold">
                  Formule clé :
                </span>{' '}
                Pop × Taux × Intensité
              </div>
            </div>

            <div className="bg-surface-container p-space-lg rounded flex flex-col justify-between gap-space-md hover:bg-surface-container-high transition-colors">
              <div className="flex flex-col gap-space-xs">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm px-1.5 py-0.5 rounded bg-surface text-secondary font-bold">
                    PUISSANCE
                  </span>
                  <span className="material-symbols-outlined text-secondary text-[22px]">
                    bolt
                  </span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mt-space-xs">
                  Mégawatts (MW)
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  L'énergie soutirée en flux continu par les baies de serveurs
                  et les systèmes de refroidissement. Sans production garantie
                  et sans réseau équilibré, la rupture de tension menace la
                  ville tout entière.
                </p>
              </div>
              <div className="bg-surface-container-low p-space-xs rounded font-label-sm text-label-sm text-on-surface-variant">
                <span className="text-on-surface font-semibold">
                  Arbitrage :
                </span>{' '}
                Ville vs Datacenters
              </div>
            </div>

            <div className="bg-surface-container p-space-lg rounded flex flex-col justify-between gap-space-md hover:bg-surface-container-high transition-colors">
              <div className="flex flex-col gap-space-xs">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm px-1.5 py-0.5 rounded bg-surface text-tertiary font-bold">
                    MATÉRIAUX
                  </span>
                  <span className="material-symbols-outlined text-tertiary text-[22px]">
                    diamond
                  </span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mt-space-xs">
                  Terres Rares (t)
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Le capital minier fini de la planète. Les puces accélératrices
                  mobilisent des métaux hautement critiques (dysprosium,
                  néodyme, gallium). Tout gisement épuisé scelle l'arrêt
                  définitif des extensions.
                </p>
              </div>
              <div className="bg-surface-container-low p-space-xs rounded font-label-sm text-label-sm text-on-surface-variant">
                <span className="text-on-surface font-semibold">
                  Dynamique :
                </span>{' '}
                Stock fini sans régénération
              </div>
            </div>

            <div className="bg-surface-container p-space-lg rounded flex flex-col justify-between gap-space-md hover:bg-surface-container-high transition-colors">
              <div className="flex flex-col gap-space-xs">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm px-1.5 py-0.5 rounded bg-surface text-primary-container text-on-primary font-bold">
                    SOCIÉTÉ
                  </span>
                  <span className="material-symbols-outlined text-primary-container text-[22px]">
                    diversity_3
                  </span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mt-space-xs">
                  Confiance (%)
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  La jauge d'acceptabilité démocratique. Délester la ville pour
                  alimenter des fermes d'inférence détruit le pacte social. Plus
                  la dépendance est forte, plus la chute de confiance est
                  brutale.
                </p>
              </div>
              <div className="bg-surface-container-low p-space-xs rounded font-label-sm text-label-sm text-on-surface-variant">
                <span className="text-on-surface font-semibold">Défaite :</span>{' '}
                Rupture d'adhésion citoyenne
              </div>
            </div>
          </div>

          <div className="bg-surface-container-low rounded-xl p-space-lg flex flex-col lg:flex-row items-stretch gap-space-lg">
            <div className="flex-1 flex flex-col justify-center gap-space-sm">
              <span className="font-label-sm text-label-sm text-secondary font-bold uppercase tracking-wider">
                La Révélation du Gameplay // Le piège de l'offre
              </span>
              <h3 className="font-headline-md text-headline-md text-on-surface">
                De l'équipement initial à la surconsommation structurelle
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                En Phase 1, le joueur pense triompher en atteignant 100 %
                d'adoption. Mais la Phase 2 déclenche le mécanisme réel d'effet
                rebond : l'intensité d'usage explose au-delà de 100 %. Les
                requêtes automatisées, la génération superflue et l'intégration
                passive créent un appel de puissance exponentiel que
                l'infrastructure physique ne peut plus suivre.
              </p>
              <div className="flex items-center gap-space-sm text-on-surface font-label-md text-label-md bg-surface p-space-sm rounded">
                <span className="material-symbols-outlined text-secondary text-[20px]">
                  lightbulb
                </span>
                <span>
                  La victoire ne consiste pas à construire plus, mais à arbitrer
                  les usages superflus.
                </span>
              </div>
            </div>
            <div className="flex-1 bg-surface-container rounded p-space-md flex flex-col justify-center gap-space-sm font-label-sm text-label-sm">
              <div className="text-on-surface-variant uppercase font-semibold">
                Diagramme des Flux &amp; Boucle de Rétroaction
              </div>
              <div className="space-y-2">
                <div className="bg-surface p-space-sm rounded flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                    Phase 1 : Équipement des Citoyens (0 → 100 %)
                  </span>
                  <span className="text-secondary font-bold">Linéaire</span>
                </div>
                <div className="bg-surface p-space-sm rounded flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></span>
                    Phase 2 : Hyper-Usage &amp; Automatisation (&gt; 100 %)
                  </span>
                  <span className="text-primary font-bold">Exponentiel</span>
                </div>
                <div className="bg-surface-container-high p-space-sm rounded flex items-center justify-between text-on-surface">
                  <span>Levier Unique de Résilience :</span>
                  <span className="px-2 py-0.5 rounded bg-primary-fixed text-on-primary-fixed font-bold">
                    SOBRIÉTÉ CHOISIE
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="w-full px-gutter-desktop py-space-xl bg-surface"
        id="sources"
      >
        <div className="max-w-7xl mx-auto flex flex-col gap-space-lg">
          <div className="flex flex-col gap-space-xs">
            <span className="font-label-sm text-label-sm text-secondary uppercase font-semibold tracking-wider">
              02 // Données Ouvertes
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">
              Sources Scientifiques &amp; Calibration du Modèle
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl">
              FLOPSY refuse les approximations simplistes. Les équations
              sous-jacentes à la planète fictive sont calibrées sur des jeux de
              données publics réels, transposés à l'échelle d'une cité-état
              expérimentale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
            <div className="bg-surface-container-low p-space-lg rounded flex flex-col justify-between gap-space-md shadow-sm">
              <div className="flex flex-col gap-space-xs">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm text-secondary font-bold bg-secondary-container/40 px-2 py-0.5 rounded">
                    RÉSEAU &amp; DÉLESTAGE
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    Open Data RTE
                  </span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mt-1">
                  RTE (éco2mix)
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Les dynamiques d'équilibre production-consommation, les
                  coefficients de pertes Joule sur les lignes haute tension et
                  les règles prioritaires d'îlotage en cas de déficit
                  énergétique sont issus des relevés éco2mix.
                </p>
              </div>
              <div className="bg-surface p-space-sm rounded font-label-sm text-label-sm flex items-center justify-between">
                <span className="text-on-surface-variant">
                  Paramètre de jeu calibré :
                </span>
                <span className="font-semibold text-on-surface">
                  Pertes réseau (%) &amp; Seuil de blackout (MW)
                </span>
              </div>
            </div>

            <div className="bg-surface-container-low p-space-lg rounded flex flex-col justify-between gap-space-md shadow-sm">
              <div className="flex flex-col gap-space-xs">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm text-primary font-bold bg-primary-fixed/50 px-2 py-0.5 rounded">
                    INTENSITÉ DE CALCUL
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    Compar:IA / ADEME
                  </span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mt-1">
                  Compar:IA &amp; ADEME
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Évaluation du coût en calcul (PFLOPs par token / requête
                  multimodal) et analyse du cycle de vie des équipements
                  informatiques. Ces mesures permettent de calibrer la demande
                  par habitant selon l'intensité d'usage.
                </p>
              </div>
              <div className="bg-surface p-space-sm rounded font-label-sm text-label-sm flex items-center justify-between">
                <span className="text-on-surface-variant">
                  Paramètre de jeu calibré :
                </span>
                <span className="font-semibold text-on-surface">
                  Calcul par utilisateur (PFLOP/s)
                </span>
              </div>
            </div>

            <div className="bg-surface-container-low p-space-lg rounded flex flex-col justify-between gap-space-md shadow-sm">
              <div className="flex flex-col gap-space-xs">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm text-tertiary font-bold bg-tertiary-fixed/40 px-2 py-0.5 rounded">
                    MATIÈRES PREMIÈRES
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    RMIS Raw Materials
                  </span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mt-1">
                  Commission Européenne (RMIS)
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  La liste des 34 matériaux critiques de l'UE et leurs taux de
                  circularité réels (très inférieurs à 1 % pour la plupart des
                  terres rares lourdes) justifient le choix d'un stock fini non
                  régénérable dans le simulateur.
                </p>
              </div>
              <div className="bg-surface p-space-sm rounded font-label-sm text-label-sm flex items-center justify-between">
                <span className="text-on-surface-variant">
                  Paramètre de jeu calibré :
                </span>
                <span className="font-semibold text-on-surface">
                  Coût unitaire datacenter (t)
                </span>
              </div>
            </div>

            <div className="bg-surface-container-low p-space-lg rounded flex flex-col justify-between gap-space-md shadow-sm">
              <div className="flex flex-col gap-space-xs">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm text-on-surface font-bold bg-surface-container-high px-2 py-0.5 rounded">
                    SOCIOLOGIE &amp; USAGES
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    Arcep / Arcom / ANCT
                  </span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mt-1">
                  Baromètre du Numérique
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Données empiriques sur la vitesse de pénétration des services
                  grand public en France et l'évolution de la dépendance
                  numérique quotidienne, servant de patron aux courbes
                  d'adoption en Phase 1.
                </p>
              </div>
              <div className="bg-surface p-space-sm rounded font-label-sm text-label-sm flex items-center justify-between">
                <span className="text-on-surface-variant">
                  Paramètre de jeu calibré :
                </span>
                <span className="font-semibold text-on-surface">
                  Courbe d'adoption (0-100 %)
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full px-gutter-desktop py-space-xl bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto flex flex-col gap-space-xl">
          <div className="flex flex-col gap-space-xs">
            <span className="font-label-sm text-label-sm text-primary uppercase font-semibold tracking-wider">
              03 // Collectif Pluridisciplinaire
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">
              L'Équipe &amp; La Démarche de Recherche
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl">
              FLOPSY est né de la convergence entre concepteurs de jeux,
              ingénieurs en calcul distribué et chercheurs spécialistes de
              l'empreinte environnementale du numérique.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
            <div className="bg-surface-container rounded p-space-md flex flex-col gap-space-sm">
              <div className="w-14 h-14 rounded bg-primary-container text-on-primary flex items-center justify-center font-headline-md font-bold">
                GD
              </div>
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">
                  Colin A.
                </h3>
                <span className="font-label-sm text-label-sm text-primary font-semibold">
                  Game Designer Systémique
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Spécialiste des serious games de transition écologique.
                Conception des arbres de décision et des boucles de rétroaction
                de FLOPSY.
              </p>
              <div className="mt-auto pt-space-xs font-label-sm text-label-sm text-on-surface-variant">
                Projets : Tycoon Climatique, CityFlow
              </div>
            </div>
          </div>

          <div className="bg-surface-container-low rounded-xl p-space-lg flex flex-col gap-space-md">
            <div className="flex items-center justify-between border-b border-surface-container pb-space-xs">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">
                Partenaires &amp; Écosystème de Recherche
              </span>
              <span className="font-label-sm text-label-sm text-secondary font-medium">
                RECHERCHE PUBLIQUE &amp; ASSOCIATIVE
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-space-md text-center">
              <div className="bg-surface p-space-md rounded flex flex-col items-center justify-center">
                <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  LAB-NUM
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  Numérique Responsable
                </span>
              </div>
              <div className="bg-surface p-space-md rounded flex flex-col items-center justify-center">
                <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  GRID-INSTITUTE
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  Recherche Électrique
                </span>
              </div>
              <div className="bg-surface p-space-md rounded flex flex-col items-center justify-center">
                <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  COMMONS-IA
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  Observatoire Ouvert
                </span>
              </div>
              <div className="bg-surface p-space-md rounded flex flex-col items-center justify-center">
                <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  ACADÉMIE SCI.
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  Pédagogie &amp; Climat
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full px-gutter-desktop py-space-xl bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="bg-surface-container rounded-xl p-space-lg md:p-space-xl flex flex-col lg:flex-row items-center justify-between gap-space-xl">
            <div className="flex-1 flex flex-col gap-space-sm">
              <div className="flex items-center gap-space-xs text-secondary font-label-sm text-label-sm font-bold uppercase">
                <span className="material-symbols-outlined text-[18px]">
                  verified
                </span>
                Bien Commun Numérique // Code &amp; Données Libres
              </div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface">
                Utilisez FLOPSY dans vos cours, ateliers et conférences
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">
                L'ensemble du code source, des modèles mathématiques et des
                fiches d'animation pédagogique est disponible sous licence
                AGPL-3.0 et CC-BY-SA 4.0. Le jeu peut être projeté ou joué
                individuellement sans installation logicielle.
              </p>
              <div className="flex flex-wrap items-center gap-space-md pt-space-xs">
                <a
                  className="px-space-md py-2 bg-surface text-on-surface font-label-md text-label-md rounded font-semibold hover:bg-surface-container-highest transition-colors flex items-center gap-1.5 shadow-sm"
                  href="https://github.com/D-Lecol/Flopsy"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    terminal
                  </span>
                  Dépôt GitHub (v0.8.4)
                </a>
                <button
                  className="px-space-md py-2 bg-secondary text-on-secondary font-label-md text-label-md rounded font-semibold hover:bg-secondary/90 transition-colors flex items-center gap-1.5 shadow-sm"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    download
                  </span>
                  Kit Pédagogique PDF
                </button>
              </div>
            </div>
            <div className="w-full lg:w-96 bg-surface-container-lowest p-space-lg rounded-lg shadow-sm flex flex-col gap-space-md">
              <div className="font-label-sm text-label-sm text-on-surface font-bold uppercase flex items-center justify-between">
                <span>Reproductibilité Éducative</span>
                <span className="text-primary">100 % LIBRE</span>
              </div>
              <div className="space-y-2 text-body-sm text-body-sm text-on-surface-variant">
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-secondary text-[16px] mt-0.5">
                    check_circle
                  </span>
                  <span>
                    Aucune collecte de données personnelles ni télémétrie
                    invasive.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-secondary text-[16px] mt-0.5">
                    check_circle
                  </span>
                  <span>
                    Calcul d'inférence 100 % exécuté côté navigateur
                    (client-only).
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-secondary text-[16px] mt-0.5">
                    check_circle
                  </span>
                  <span>
                    Fiches synthétiques "Et dans le monde réel ?" prêtes à
                    imprimer.
                  </span>
                </div>
              </div>
              <div className="pt-space-xs">
                <a
                  className="w-full py-2.5 bg-primary text-on-primary font-label-md text-label-md rounded uppercase tracking-wider font-semibold hover:bg-primary-container transition-colors flex items-center justify-center gap-2"
                  href="#"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    arrow_back
                  </span>
                  Revenir au Menu Principal
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

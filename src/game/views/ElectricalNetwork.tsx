export default function ElectricalNetwork() {
  return (
    <div className="flex flex-col w-full">
      <div className="px-gutter-desktop py-space-sm bg-surface-container-low shadow-sm flex flex-wrap items-center justify-between gap-space-md z-30">
        <div className="flex items-center gap-space-lg flex-wrap">
          <div className="flex items-center gap-space-sm px-space-md py-space-xs rounded bg-surface-container shadow-sm">
            <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></div>
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                Calcul IA Actif
              </span>
              <span className="font-metric-display text-metric-display text-on-surface">
                4 850{' '}
                <span className="font-label-md text-label-md text-on-surface-variant">
                  / 5 200 PFLOPS
                </span>
              </span>
            </div>
          </div>
          <div className="flex items-center gap-space-sm px-space-md py-space-xs rounded bg-error-container text-on-error-container shadow-sm">
            <span className="material-symbols-outlined text-[20px] text-error">
              bolt
            </span>
            <div className="flex flex-col">
              <div className="flex items-center gap-space-xs">
                <span className="font-label-sm text-label-sm uppercase tracking-wider font-bold">
                  Déficit Réseau
                </span>
                <span className="font-label-sm text-label-sm px-1.5 py-0.2 rounded bg-error text-on-error font-semibold">
                  -70 MW
                </span>
              </div>
              <span className="font-metric-display text-metric-display">
                1 850{' '}
                <span className="font-label-md text-label-md opacity-80">
                  prod
                </span>{' '}
                / 1 920{' '}
                <span className="font-label-md text-label-md opacity-80">
                  conso MW
                </span>
              </span>
            </div>
          </div>
          <div className="flex items-center gap-space-sm px-space-md py-space-xs rounded bg-surface-container shadow-sm">
            <span className="material-symbols-outlined text-[20px] text-tertiary">
              diamond
            </span>
            <div className="flex flex-col">
              <div className="flex items-center gap-space-xs">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                  Stock Terres Rares
                </span>
                <span className="font-label-sm text-label-sm text-error font-semibold">
                  -42 t/an
                </span>
              </div>
              <span className="font-metric-display text-metric-display text-on-surface">
                1 120{' '}
                <span className="font-label-md text-label-md text-on-surface-variant">
                  tonnes
                </span>
              </span>
            </div>
          </div>
          <div className="flex items-center gap-space-sm px-space-md py-space-xs rounded bg-secondary-container text-on-secondary-container shadow-sm">
            <span className="material-symbols-outlined text-[20px] text-secondary">
              groups
            </span>
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                Adhésion Publique
              </span>
              <span className="font-metric-display text-metric-display">
                72%{' '}
                <span className="font-label-md text-label-md opacity-80">
                  Consensus
                </span>
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-space-xs bg-surface-container-high p-1 rounded">
          <span className="font-label-sm text-label-sm px-space-sm py-space-xs rounded bg-surface text-on-surface font-semibold flex items-center gap-space-xs">
            <span className="w-2 h-2 rounded-full bg-secondary"></span> 50.02 Hz
          </span>
          <span className="font-label-sm text-label-sm px-space-sm py-space-xs rounded text-on-surface-variant">
            Pertes Joule : 11.2%
          </span>
        </div>
      </div>
      <div className="relative w-full h-[760px] overflow-hidden bg-surface-container-highest">
        <div className="absolute inset-0 z-0">
          <img
            alt="Isometric electrical grid substation tycoon simulation"
            className="w-full h-full object-cover object-center select-none"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_NqUaYq20r-gW132nA_eFqCoQhRWBH1E4Skxz8TDf5gMjHEtb0NnOPPrQGXfS6dL554g1IjovaO9XH8li5dAQE55676Gqz8cRvDIydRpAq8UyfDNboekamtS4fuNnQAa5FL2sHgM6pBXkSxwn8-EaiYte9bjhuPtXcuStJowvXmEx_UEN97Ch1gg8jJxV-yh0xoDPIsxgZDyMV3f8fsQ-Mt89OdktcXyv-KATwBQD1wdFIg_UiGde"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface/80 via-transparent to-surface/20 pointer-events-none"></div>
        </div>
        <div className="absolute top-4 left-4 z-20 w-80 flex flex-col gap-space-sm">
          <div className="p-space-md rounded bg-surface-container-lowest/95 backdrop-blur-md shadow-lg flex flex-col gap-space-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-[18px] text-primary">
                  electric_bolt
                </span>
                <span className="font-headline-sm text-headline-sm uppercase tracking-tight text-on-surface">
                  Flux de Puissance
                </span>
              </div>
              <span className="font-label-sm text-label-sm px-1.5 py-0.5 rounded bg-surface-container-high text-on-surface-variant">
                TEMPS RÉEL
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-body-sm font-body-sm">
                <span className="text-on-surface-variant flex items-center gap-1">
                  <span className="w-2 h-2 rounded-sm bg-primary"></span>{' '}
                  Production EPR Tranches 1&amp;2
                </span>
                <span className="font-label-sm text-label-sm font-bold text-on-surface">
                  1 850 MW
                </span>
              </div>
              <div className="flex justify-between items-center text-body-sm font-body-sm">
                <span className="text-on-surface-variant flex items-center gap-1">
                  <span className="w-2 h-2 rounded-sm bg-tertiary"></span>{' '}
                  Import Réseau Régional
                </span>
                <span className="font-label-sm text-label-sm font-bold text-tertiary">
                  +70 MW
                </span>
              </div>
              <div className="h-3 w-full bg-surface-container-high rounded flex overflow-hidden">
                <div
                  className="h-full bg-primary"
                  style={{ width: '64%' }}
                  title="Datacenter AI (64%)"
                ></div>
                <div
                  className="h-full bg-secondary"
                  style={{ width: '25%' }}
                  title="Zone Métropolitaine (25%)"
                ></div>
                <div
                  className="h-full bg-error"
                  style={{ width: '11%' }}
                  title="Pertes Joule en ligne (11.2%)"
                ></div>
              </div>
              <div className="grid grid-cols-3 gap-1 pt-1 text-center font-label-sm text-label-sm">
                <div className="p-1 rounded bg-surface-container">
                  <span className="block text-on-surface-variant">
                    IA CLUSTERS
                  </span>
                  <span className="font-semibold text-primary">1 240 MW</span>
                </div>
                <div className="p-1 rounded bg-surface-container">
                  <span className="block text-on-surface-variant">
                    CITÉ / HÔPITAUX
                  </span>
                  <span className="font-semibold text-secondary">680 MW</span>
                </div>
                <div className="p-1 rounded bg-surface-container">
                  <span className="block text-on-surface-variant">
                    DISSIPATION
                  </span>
                  <span className="font-semibold text-error">215 MW (11%)</span>
                </div>
              </div>
            </div>
            <div className="p-space-sm rounded bg-surface-container-low flex flex-col gap-space-xs">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm font-bold uppercase text-on-surface">
                  Arbitrage Délestage
                </span>
                <span className="font-label-sm text-label-sm text-primary font-semibold">
                  Mode Prioritaire
                </span>
              </div>
              <div className="grid grid-cols-2 gap-1 p-0.5 rounded bg-surface-container-high">
                <button
                  className="py-1 px-2 rounded font-label-sm text-label-sm font-bold text-center bg-primary text-on-primary shadow-sm transition-all"
                  type="button"
                >
                  Priorité Ville
                </button>
                <button
                  className="py-1 px-2 rounded font-label-sm text-label-sm text-center text-on-surface-variant hover:text-on-surface transition-all"
                  type="button"
                >
                  Priorité LLM
                </button>
              </div>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                En cas de pic, maintien garanti des services d'urgence et
                réseaux civiques.
              </span>
            </div>
          </div>
          <div className="p-space-sm rounded bg-surface-container-lowest/90 backdrop-blur-md shadow flex items-start gap-space-xs">
            <span className="material-symbols-outlined text-[16px] text-tertiary mt-0.5">
              menu_book
            </span>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              <span className="font-semibold text-on-surface">
                Note RTE / ADEME :
              </span>{' '}
              10 à 15% de l'électricité transportée peut être dissipée en
              chaleur sans optimisation supraconductrice ou cryogénie.
            </p>
          </div>
        </div>
        <div className="absolute top-8 right-6 z-20 w-80">
          <div className="p-space-sm rounded bg-error-container text-on-error-container shadow-xl flex items-start gap-space-sm">
            <span className="material-symbols-outlined text-[24px] text-error mt-0.5 animate-bounce">
              warning
            </span>
            <div className="flex flex-col gap-space-xs">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm font-bold uppercase tracking-wider text-error">
                  Alerte Réseau Critique
                </span>
                <span className="font-label-sm text-label-sm px-1.5 rounded bg-error text-on-error">
                  SECTEUR SUD
                </span>
              </div>
              <p className="font-body-sm text-body-sm">
                Échauffement critique sur la boucle Sud alimentant le{' '}
                <span className="font-bold">Cluster Datacenter Alpha</span> (T°
                pylône 84°C).
              </p>
              <div className="flex items-center gap-space-xs mt-1">
                <button
                  className="px-space-sm py-1 rounded bg-error text-on-error font-label-sm text-label-sm font-bold shadow-sm hover:opacity-95 transition-opacity"
                  type="button"
                >
                  Injecter Refroidissement N2
                </button>
                <button
                  className="px-space-sm py-1 rounded bg-surface-container text-on-surface font-label-sm text-label-sm hover:bg-surface-container-high transition-colors"
                  type="button"
                >
                  Ignorer
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-[44%] left-[48%] -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-auto group">
          <div className="relative flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-primary/20 animate-ping absolute"></div>
            <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-lg cursor-pointer">
              <span className="material-symbols-outlined text-[18px]">
                detector_battery
              </span>
            </div>
          </div>
          <div className="absolute left-1/2 bottom-full -translate-x-1/2 mb-2 w-64 p-space-sm rounded bg-surface-container-lowest/95 backdrop-blur-md shadow-xl text-left pointer-events-auto">
            <div className="flex items-center justify-between pb-1">
              <span className="font-headline-sm text-headline-sm text-on-surface">
                Centrale EPR Tranche 1&amp;2
              </span>
              <span className="font-label-sm text-label-sm px-1 rounded bg-secondary-container text-on-secondary-container font-semibold">
                STABLE
              </span>
            </div>
            <div className="space-y-1 font-body-sm text-body-sm">
              <div className="flex justify-between text-on-surface-variant">
                <span>Régime nominal</span>
                <span className="font-label-sm text-label-sm font-semibold text-on-surface">
                  1 850 MW base continue
                </span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span>Empreinte Carbone</span>
                <span className="font-label-sm text-label-sm font-semibold text-secondary">
                  4 g CO2/kWh
                </span>
              </div>
              <div className="flex justify-between text-on-surface-variant items-center">
                <span>Combustible</span>
                <span className="font-label-sm text-label-sm font-bold text-on-surface">
                  82%
                </span>
              </div>
              <div className="h-1.5 w-full bg-surface-container rounded overflow-hidden">
                <div
                  className="h-full bg-secondary"
                  style={{ width: '82%' }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-[34%] left-[28%] -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-auto">
          <div className="p-space-sm rounded bg-surface-container-lowest/95 backdrop-blur-md shadow-xl w-60">
            <div className="flex items-center justify-between pb-1">
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-tertiary">
                  power
                </span>
                <span className="font-headline-sm text-headline-sm text-on-surface">
                  Sous-Station HT #2
                </span>
              </div>
              <span className="font-label-sm text-label-sm text-error font-bold">
                94% CHG
              </span>
            </div>
            <div className="space-y-1 font-body-sm text-body-sm">
              <div className="flex justify-between text-on-surface-variant">
                <span>Transformation</span>
                <span className="font-label-sm text-label-sm text-on-surface">
                  400 kV → 20 kV
                </span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span>Température</span>
                <span className="font-label-sm text-label-sm text-primary font-bold">
                  68°C
                </span>
              </div>
              <div className="pt-1">
                <button
                  className="w-full py-1 rounded bg-primary-container text-on-primary-container font-label-sm text-label-sm font-bold hover:opacity-90 transition-opacity"
                  type="button"
                >
                  Délester Quartier Est
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-[32%] right-[22%] -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-auto">
          <div className="p-space-sm rounded bg-surface-container-lowest/90 backdrop-blur-md shadow-lg w-56 flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm font-bold text-secondary uppercase">
                Cryo-Ligne N/S
              </span>
              <span className="font-label-sm text-label-sm px-1 bg-secondary-container text-on-secondary-container rounded font-bold">
                -62% JOULE
              </span>
            </div>
            <div className="flex justify-between text-body-sm text-on-surface-variant">
              <span>Débit continu</span>
              <span className="font-label-sm text-label-sm font-semibold text-on-surface">
                820 MW
              </span>
            </div>
            <div className="flex justify-between text-body-sm text-on-surface-variant">
              <span>Taux de perte</span>
              <span className="font-label-sm text-label-sm font-semibold text-secondary">
                4.2%
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="p-gutter-desktop bg-surface-container flex flex-col gap-space-md z-30">
        <div className="flex items-center justify-between flex-wrap gap-space-sm">
          <div className="flex items-center gap-space-sm">
            <div className="p-space-xs rounded bg-surface-container-high flex gap-1">
              <button
                className="px-space-md py-space-xs rounded bg-primary text-on-primary font-label-sm text-label-sm font-bold transition-all shadow-sm"
                type="button"
              >
                Lignes &amp; Pylônes
              </button>
              <button
                className="px-space-md py-space-xs rounded text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm transition-all"
                type="button"
              >
                Postes &amp; Sous-stations
              </button>
              <button
                className="px-space-md py-space-xs rounded text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm transition-all"
                type="button"
              >
                Stockage &amp; Volants d'Inertie
              </button>
            </div>
          </div>
          <div className="flex items-center gap-space-sm">
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              Budget Infrastructures Disponible :
            </span>
            <span className="font-metric-display text-metric-display text-primary">
              $4 500 000
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">
          <div className="p-space-md rounded bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between gap-space-sm">
            <div className="flex flex-col gap-space-xs">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm text-primary font-bold">
                  TECH SUPRACONDUCTRICE
                </span>
                <span className="font-label-sm text-label-sm px-1.5 py-0.5 rounded bg-surface-container text-on-surface-variant">
                  NIV. 3
                </span>
              </div>
              <span className="font-headline-sm text-headline-sm text-on-surface">
                Câble Supraconducteur Azote Liquide
              </span>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Réduit les pertes Joule de 50% sur les tronçons longue distance
                vers les grappes de calcul.
              </p>
            </div>
            <div className="flex flex-col gap-space-xs pt-space-xs">
              <div className="flex justify-between font-label-sm text-label-sm text-on-surface-variant">
                <span>Coût / Terres Rares</span>
                <span className="font-bold text-on-surface">
                  $1 250 000 · 18 t
                </span>
              </div>
              <button
                className="w-full py-space-xs rounded bg-primary text-on-primary font-label-sm text-label-sm font-bold uppercase tracking-wider hover:opacity-90 transition-opacity"
                type="button"
              >
                Poser Tronçon
              </button>
            </div>
          </div>
          <div className="p-space-md rounded bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between gap-space-sm">
            <div className="flex flex-col gap-space-xs">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm text-secondary font-bold">
                  RÉGULATION DYNAMIQUE
                </span>
                <span className="font-label-sm text-label-sm px-1.5 py-0.5 rounded bg-surface-container text-on-surface-variant">
                  NIV. 2
                </span>
              </div>
              <span className="font-headline-sm text-headline-sm text-on-surface">
                Sous-Station Numérique Haute Fréquence
              </span>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Automatise l'aiguillage de puissance vers les data-halls avec un
                temps de réponse &lt; 2ms.
              </p>
            </div>
            <div className="flex flex-col gap-space-xs pt-space-xs">
              <div className="flex justify-between font-label-sm text-label-sm text-on-surface-variant">
                <span>Coût / Terres Rares</span>
                <span className="font-bold text-on-surface">
                  $820 000 · 8 t
                </span>
              </div>
              <button
                className="w-full py-space-xs rounded bg-surface-container-high text-on-surface font-label-sm text-label-sm font-bold uppercase tracking-wider hover:bg-primary hover:text-on-primary transition-colors"
                type="button"
              >
                Déployer Module
              </button>
            </div>
          </div>
          <div className="p-space-md rounded bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between gap-space-sm">
            <div className="flex flex-col gap-space-xs">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm text-tertiary font-bold">
                  STOCKAGE ÉNERGIE
                </span>
                <span className="font-label-sm text-label-sm px-1.5 py-0.5 rounded bg-surface-container text-on-surface-variant">
                  NIV. 1
                </span>
              </div>
              <span className="font-headline-sm text-headline-sm text-on-surface">
                Parc Batteries Stationnaires LFP
              </span>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Fournit un tampon massif de 150 MWh lors des charges
                d'entraînement de très grands modèles.
              </p>
            </div>
            <div className="flex flex-col gap-space-xs pt-space-xs">
              <div className="flex justify-between font-label-sm text-label-sm text-on-surface-variant">
                <span>Coût / Terres Rares</span>
                <span className="font-bold text-on-surface">
                  $2 100 000 · 24 t
                </span>
              </div>
              <button
                className="w-full py-space-xs rounded bg-surface-container-high text-on-surface font-label-sm text-label-sm font-bold uppercase tracking-wider hover:bg-primary hover:text-on-primary transition-colors"
                type="button"
              >
                Installer Baies
              </button>
            </div>
          </div>
          <div className="p-space-md rounded bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between gap-space-sm">
            <div className="flex flex-col gap-space-xs">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm text-secondary font-bold">
                  STABILITÉ ÉLECTRIQUE
                </span>
                <span className="font-label-sm text-label-sm px-1.5 py-0.5 rounded bg-surface-container text-on-surface-variant">
                  NIV. 4
                </span>
              </div>
              <span className="font-headline-sm text-headline-sm text-on-surface">
                Condensateur Synchrone Lourd
              </span>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Fournit une inertie mécanique rotative pour verrouiller la
                fréquence à exactement 50.0 Hz.
              </p>
            </div>
            <div className="flex flex-col gap-space-xs pt-space-xs">
              <div className="flex justify-between font-label-sm text-label-sm text-on-surface-variant">
                <span>Coût / Terres Rares</span>
                <span className="font-bold text-on-surface">
                  $1 650 000 · 14 t
                </span>
              </div>
              <button
                className="w-full py-space-xs rounded bg-surface-container-high text-on-surface font-label-sm text-label-sm font-bold uppercase tracking-wider hover:bg-primary hover:text-on-primary transition-colors"
                type="button"
              >
                Intégrer Réseau
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ClustersView() {
  return (
    <div className="flex flex-col w-full">
      <div className="p-gutter-desktop flex flex-col gap-space-md">
        <section className="grid grid-cols-2 md:grid-cols-4 gap-space-sm">
          <div className="p-space-sm bg-surface-container-lowest rounded-xl shadow-sm flex flex-col gap-space-xs">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block"></span>
                Calcul IA Déployé
              </span>
              <span className="font-label-sm text-label-sm text-primary font-semibold">
                93.2% CHARGE
              </span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="font-metric-display text-metric-display text-on-surface">
                4,850{' '}
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  / 5,200 PFLOP/s
                </span>
              </span>
              <span className="font-label-sm text-label-sm text-secondary bg-secondary-container/40 px-1.5 py-0.5 rounded">
                +180 PFLOP/s
              </span>
            </div>
            <div className="h-1.5 w-full bg-surface-container-high rounded overflow-hidden">
              <div className="h-full bg-primary rounded w-[93.2%] transition-all duration-500"></div>
            </div>
          </div>
          <div className="p-space-sm bg-surface-container-lowest rounded-xl shadow-sm flex flex-col gap-space-xs">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary inline-block"></span>
                Tirage Réseau Électrique
              </span>
              <span className="font-label-sm text-label-sm text-secondary font-semibold">
                STABLE
              </span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="font-metric-display text-metric-display text-on-surface">
                1,850{' '}
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  / 1,920 MW
                </span>
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container px-1.5 py-0.5 rounded">
                96.3% CAP
              </span>
            </div>
            <div className="h-1.5 w-full bg-surface-container-high rounded overflow-hidden">
              <div className="h-full bg-secondary rounded w-[96.3%] transition-all duration-500"></div>
            </div>
          </div>
          <div className="p-space-sm bg-surface-container-lowest rounded-xl shadow-sm flex flex-col gap-space-xs">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary inline-block"></span>
                Stock Terres Rares
              </span>
              <span className="font-label-sm text-label-sm text-tertiary font-semibold">
                TENSION HAUTE
              </span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="font-metric-display text-metric-display text-on-surface">
                1,120{' '}
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  tonnes
                </span>
              </span>
              <span className="font-label-sm text-label-sm text-error bg-error-container/50 px-1.5 py-0.5 rounded font-semibold">
                -45t requis
              </span>
            </div>
            <div className="h-1.5 w-full bg-surface-container-high rounded overflow-hidden">
              <div className="h-full bg-tertiary-fixed-dim rounded w-[58%]"></div>
            </div>
          </div>
          <div className="p-space-sm bg-surface-container-lowest rounded-xl shadow-sm flex flex-col gap-space-xs">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary inline-block"></span>
                Adhésion Publique Locale
              </span>
              <span className="font-label-sm text-label-sm text-secondary font-semibold">
                +4% CHAUFFAGE
              </span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="font-metric-display text-metric-display text-on-surface">
                72%{' '}
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  SOUTIEN
                </span>
              </span>
              <span className="font-label-sm text-label-sm text-secondary bg-secondary-container/40 px-1.5 py-0.5 rounded">
                Favorable
              </span>
            </div>
            <div className="h-1.5 w-full bg-surface-container-high rounded overflow-hidden">
              <div className="h-full bg-secondary rounded w-[72%]"></div>
            </div>
          </div>
        </section>
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-md">
          <section className="xl:col-span-8 flex flex-col gap-space-sm">
            <div className="relative bg-surface-container-low rounded-xl overflow-hidden shadow-md group">
              <div className="absolute top-0 inset-x-0 z-20 p-space-sm bg-surface-container-lowest/90 backdrop-blur-sm flex items-center justify-between">
                <div className="flex items-center gap-space-xs">
                  <span className="font-label-sm text-label-sm px-2 py-0.5 rounded bg-primary-container text-on-primary-container font-bold">
                    DC-SUPERCLUSTER 04
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    Vue écorchée axonométrique • Niveau -1 &amp; RDC
                  </span>
                </div>
                <div className="flex items-center gap-space-xs">
                  <span className="flex items-center gap-1 font-label-sm text-label-sm text-secondary px-2 py-0.5 rounded bg-surface-container">
                    <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>{' '}
                    Circuit Liquide Actif
                  </span>
                  <button
                    className="px-2 py-1 rounded bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm transition-colors"
                    type="button"
                  >
                    Zoom 100%
                  </button>
                </div>
              </div>
              <div className="relative w-full aspect-[16/9] min-h-[460px] overflow-hidden bg-surface-container-high">
                <img
                  alt="Vue axonométrique en coupe détaillée de l'intérieur d'un datacenter industriel avec baies de serveurs illuminées de turquoise et orange et réseaux de refroidissement par immersion"
                  className="w-full h-full object-cover object-center select-none"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7wDHSA8GoPsVOe84udDeNo5bxdxr6nL_64vGEwsFw7JcootJZDgg80iMPhmucg9B3oLkye8c6wje0Tt2fhKKpc9enWy-ivOM8IGLeTAAM-nN1jXWi_OB8MB8e8vk50RgVh13n-Cxzd9LkTngQ43HUxOHNzf54FsezLvK0SQ_V_vWjOhHhuhPCRTa409kjMkQQLwLo2ALtXmWvPBkp59aRiGqmFRh9z7s2lpV0WOpc0HVwXQW2HKn5"
                />
                <div className="absolute top-[28%] left-[24%] -translate-x-1/2 -translate-y-1/2 z-20 group/pin cursor-pointer">
                  <div className="relative flex items-center">
                    <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-on-primary shadow-lg animate-bounce">
                      <span className="material-symbols-outlined text-[14px]">
                        memory
                      </span>
                    </div>
                    <div className="ml-2 bg-surface-container-lowest/95 backdrop-blur-md px-2.5 py-1.5 rounded-lg shadow-md flex flex-col gap-0.5 pointer-events-auto hover:scale-105 transition-transform">
                      <div className="flex items-center gap-1.5">
                        <span className="font-label-sm text-label-sm font-bold text-on-surface">
                          Cluster A1 "Titan LLM"
                        </span>
                        <span className="font-label-sm text-[10px] text-primary px-1 bg-primary-fixed-dim/40 rounded">
                          CRITIQUE
                        </span>
                      </div>
                      <div className="flex items-center gap-2 font-label-sm text-label-sm text-on-surface-variant">
                        <span>24 Racks B200</span>
                        <span>•</span>
                        <span className="text-on-surface font-semibold">
                          1,600 PFLOP/s
                        </span>
                      </div>
                      <div className="flex items-center gap-2 font-label-sm text-[10px] text-secondary">
                        <span>420 MW</span>
                        <span>PUE 1.12</span>
                        <span className="text-primary">
                          Immersion diélectrique
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute top-[36%] right-[22%] -translate-x-1/2 -translate-y-1/2 z-20 group/pin cursor-pointer">
                  <div className="relative flex items-center flex-row-reverse">
                    <div className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center text-on-secondary shadow-lg">
                      <span className="material-symbols-outlined text-[14px]">
                        bolt
                      </span>
                    </div>
                    <div className="mr-2 bg-surface-container-lowest/95 backdrop-blur-md px-2.5 py-1.5 rounded-lg shadow-md flex flex-col gap-0.5 pointer-events-auto hover:scale-105 transition-transform text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <span className="font-label-sm text-[10px] text-secondary px-1 bg-secondary-fixed/50 rounded">
                          LATENCE MIN
                        </span>
                        <span className="font-label-sm text-label-sm font-bold text-on-surface">
                          Cluster B2 "Edge Inférence"
                        </span>
                      </div>
                      <div className="flex items-center justify-end gap-2 font-label-sm text-label-sm text-on-surface-variant">
                        <span className="text-on-surface font-semibold">
                          850 PFLOP/s
                        </span>
                        <span>•</span>
                        <span>16 Racks Inférence</span>
                      </div>
                      <div className="flex items-center justify-end gap-2 font-label-sm text-[10px] text-on-surface-variant">
                        <span className="text-secondary font-semibold">
                          180 MW
                        </span>
                        <span>PUE 1.22 (Air forcé)</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-[28%] left-[48%] -translate-x-1/2 -translate-y-1/2 z-20 group/pin cursor-pointer">
                  <div className="relative flex flex-col items-center">
                    <div className="bg-error text-on-error px-2.5 py-1 rounded-lg shadow-lg flex items-center gap-1.5 animate-pulse">
                      <span className="material-symbols-outlined text-[16px]">
                        warning
                      </span>
                      <span className="font-label-sm text-label-sm font-bold">
                        Chantier Bloqué : Pod C3
                      </span>
                    </div>
                    <div className="mt-1 bg-surface-container-lowest/95 px-2.5 py-1.5 rounded-lg shadow-md flex flex-col text-center">
                      <span className="font-label-sm text-label-sm text-on-surface font-medium">
                        Manque 45t de métaux critiques
                      </span>
                      <span className="font-label-sm text-[10px] text-error font-semibold">
                        Puces accélératrices non livrées
                      </span>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-3 left-3 z-20 flex items-center gap-1 bg-surface-container-lowest/90 backdrop-blur-sm p-1 rounded-lg shadow-sm">
                  <button
                    className="px-2 py-1 rounded bg-primary text-on-primary font-label-sm text-label-sm font-semibold flex items-center gap-1"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[14px]">
                      thermostat
                    </span>
                    Thermique &amp; Fluides
                  </button>
                  <button
                    className="px-2 py-1 rounded hover:bg-surface-container text-on-surface font-label-sm text-label-sm flex items-center gap-1 transition-colors"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[14px]">
                      lan
                    </span>
                    Charge Réseau
                  </button>
                  <button
                    className="px-2 py-1 rounded hover:bg-surface-container text-on-surface font-label-sm text-label-sm flex items-center gap-1 transition-colors"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[14px]">
                      tune
                    </span>
                    Racks Physiques
                  </button>
                </div>
              </div>
            </div>
            <div className="p-space-sm bg-surface-container-high rounded-xl flex items-start gap-space-sm">
              <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">
                info
              </span>
              <div className="flex flex-col gap-0.5">
                <span className="font-label-sm text-label-sm uppercase font-bold text-on-surface tracking-wider">
                  Impact Minier &amp; Puces IA
                </span>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Impact Terres Rares : la fabrication d'un cluster IA concentre
                  plus de 80% de son empreinte minérale totale avant même la
                  première seconde de calcul. L'expansion du cluster Pod C3
                  nécessitera des accords géostratégiques d'approvisionnement en
                  néodyme et dysprosium.
                </p>
              </div>
            </div>
          </section>
          <section className="xl:col-span-4 flex flex-col gap-space-sm">
            <div className="p-space-md bg-surface-container-lowest rounded-xl shadow-sm flex flex-col gap-space-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">
                    Télémétrie Thermique &amp; PUE
                  </h3>
                </div>
                <span className="font-label-sm text-label-sm font-bold text-secondary bg-secondary-container/40 px-2 py-0.5 rounded">
                  MOD-804
                </span>
              </div>
              <div className="grid grid-cols-2 gap-space-sm mt-1">
                <div className="p-space-sm bg-surface-container-low rounded-lg flex flex-col">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    PUE Moyen Site
                  </span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="font-metric-display text-metric-display text-on-surface">
                      1.18
                    </span>
                    <span className="font-label-sm text-[11px] text-secondary font-semibold">
                      -0.04 vs C-11
                    </span>
                  </div>
                  <span className="font-body-sm text-[11px] text-on-surface-variant mt-0.5">
                    Cible industrie : 1.15
                  </span>
                </div>
                <div className="p-space-sm bg-surface-container-low rounded-lg flex flex-col">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    Débit Liquide Refroid.
                  </span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="font-metric-display text-metric-display text-on-surface">
                      450
                    </span>
                    <span className="font-label-sm text-[11px] text-on-surface-variant">
                      m³/h
                    </span>
                  </div>
                  <span className="font-body-sm text-[11px] text-secondary font-semibold mt-0.5">
                    Boucle fermée à 99%
                  </span>
                </div>
              </div>
              <div className="p-space-sm bg-secondary-container/20 rounded-lg flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm font-semibold text-secondary flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px]">
                      downloading
                    </span>
                    Recyclage Chaleur Fatale
                  </span>
                  <span className="font-label-sm text-label-sm font-bold text-secondary">
                    +4% Adhésion
                  </span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="font-headline-sm text-headline-sm text-on-surface">
                    65 MW{' '}
                    <span className="font-body-sm text-body-sm text-on-surface-variant font-normal">
                      thermique réinjecté
                    </span>
                  </span>
                  <span className="font-label-sm text-label-sm text-on-secondary-container">
                    12 400 foyers chauffés
                  </span>
                </div>
                <div className="h-1.5 w-full bg-surface-container-high rounded overflow-hidden">
                  <div className="h-full bg-secondary rounded w-[81%]"></div>
                </div>
              </div>
              <div className="flex flex-col gap-1 pt-1">
                <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
                  <span>Fluctuation Température Coeurs GPU</span>
                  <span className="font-semibold text-on-surface">
                    61.4°C max
                  </span>
                </div>
                <div className="w-full h-10 bg-surface-container-low rounded p-1 flex items-end">
                  <svg
                    className="w-full h-full text-primary"
                    fill="none"
                    viewBox="0 0 200 40"
                  >
                    <path
                      d="M0,28 Q20,24 40,29 T80,18 T120,22 T160,12 T200,16"
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-width="2"
                    ></path>
                    <path
                      d="M0,28 Q20,24 40,29 T80,18 T120,22 T160,12 T200,16 L200,40 L0,40 Z"
                      fill="currentColor"
                      fill-opacity="0.1"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
            <div className="p-space-md bg-surface-container-lowest rounded-xl shadow-sm flex flex-col gap-space-sm">
              <div className="flex items-center justify-between">
                <h3 className="font-headline-sm text-headline-sm text-on-surface">
                  Décomposition Demande IA
                </h3>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  Cycle Actuel
                </span>
              </div>
              <div className="flex flex-col gap-space-xs">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between font-label-sm text-label-sm">
                    <span className="text-on-surface font-medium flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-primary inline-block"></span>
                      Entraînement Fondations
                    </span>
                    <span className="font-bold text-on-surface">
                      55%{' '}
                      <span className="text-on-surface-variant font-normal">
                        (2,668 PFLOPS)
                      </span>
                    </span>
                  </div>
                  <div className="h-2 w-full bg-surface-container-high rounded overflow-hidden">
                    <div className="h-full bg-primary rounded w-[55%]"></div>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between font-label-sm text-label-sm">
                    <span className="text-on-surface font-medium flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-secondary inline-block"></span>
                      Inférence Grand Public
                    </span>
                    <span className="font-bold text-on-surface">
                      30%{' '}
                      <span className="text-on-surface-variant font-normal">
                        (1,455 PFLOPS)
                      </span>
                    </span>
                  </div>
                  <div className="h-2 w-full bg-surface-container-high rounded overflow-hidden">
                    <div className="h-full bg-secondary rounded w-[30%]"></div>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between font-label-sm text-label-sm">
                    <span className="text-on-surface font-medium flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-tertiary-container inline-block"></span>
                      Usages Futiles / Récréatifs
                    </span>
                    <span className="font-bold text-tertiary">
                      15%{' '}
                      <span className="text-on-surface-variant font-normal">
                        (727 PFLOPS)
                      </span>
                    </span>
                  </div>
                  <div className="h-2 w-full bg-surface-container-high rounded overflow-hidden">
                    <div className="h-full bg-tertiary-container rounded w-[15%]"></div>
                  </div>
                </div>
              </div>
              <div className="mt-1 p-space-sm bg-surface-container-low rounded-lg flex flex-col gap-space-xs">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm font-semibold text-on-surface">
                    Action de Régulation
                  </span>
                  <span className="font-label-sm text-[10px] text-tertiary font-bold uppercase bg-tertiary-fixed/60 px-1.5 py-0.5 rounded">
                    Gain 110 MW
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Filtrez la génération d'images futiles et les agents non
                  prioritaires pour dégager de la marge énergétique.
                </p>
                <button
                  className="w-full mt-1 py-space-xs px-space-sm bg-primary text-on-primary hover:bg-primary-container rounded font-label-sm text-label-sm uppercase font-bold tracking-wider flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                  id="btn-bridage"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    filter_alt
                  </span>
                  Brider les prompts récréatifs (-15%)
                </button>
              </div>
            </div>
          </section>
        </div>
        <section className="p-space-md bg-surface-container-lowest rounded-xl shadow-sm flex flex-col gap-space-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs">
            <div className="flex items-center gap-space-sm">
              <span className="font-label-sm text-label-sm uppercase font-bold tracking-wider text-on-surface-variant">
                Chantier Matériel &amp; Infrastructure
              </span>
              <div className="flex items-center p-0.5 bg-surface-container rounded-lg">
                <button
                  className="px-space-sm py-1 bg-surface-container-lowest text-on-surface rounded font-label-sm text-label-sm font-bold shadow-xs"
                  type="button"
                >
                  Racks de Calcul
                </button>
                <button
                  className="px-space-sm py-1 hover:text-on-surface text-on-surface-variant rounded font-label-sm text-label-sm transition-colors"
                  type="button"
                >
                  Systèmes Refroidissement
                </button>
                <button
                  className="px-space-sm py-1 hover:text-on-surface text-on-surface-variant rounded font-label-sm text-label-sm transition-colors"
                  type="button"
                >
                  Évacuation Chaleur Fatale
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                Emplacements libres :{' '}
                <strong className="text-on-surface">3 pods</strong>
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-space-sm">
            <div className="p-space-sm bg-surface-container-low rounded-lg flex flex-col justify-between gap-space-sm hover:bg-surface-container transition-all">
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-[10px] text-primary font-bold bg-primary-fixed-dim/40 px-1.5 py-0.5 rounded">
                    RACK-GPU-H100
                  </span>
                  <span className="font-label-sm text-label-sm text-secondary font-semibold">
                    +450 PFLOP/s
                  </span>
                </div>
                <h4 className="font-headline-sm text-headline-sm text-on-surface leading-tight">
                  Rack GPU Haute Densité Liquide
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Refroidissement direct sur puce avec cold plates cuivre de
                  pointe.
                </p>
              </div>
              <div className="flex flex-col gap-space-xs pt-2">
                <div className="flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant">
                  <span>
                    Coût :{' '}
                    <strong className="text-on-surface">
                      65t Terres Rares
                    </strong>
                  </span>
                  <span>
                    Conso :{' '}
                    <strong className="text-primary font-bold">140 MW</strong>
                  </span>
                </div>
                <button
                  className="w-full py-1.5 px-space-sm bg-primary text-on-primary hover:bg-primary-container rounded font-label-sm text-label-sm uppercase font-bold tracking-wider flex items-center justify-center gap-1 transition-colors"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[15px]">
                    add_circle
                  </span>
                  Déployer Rack
                </button>
              </div>
            </div>
            <div className="p-space-sm bg-surface-container-low rounded-lg flex flex-col justify-between gap-space-sm hover:bg-surface-container transition-all">
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-[10px] text-secondary font-bold bg-secondary-fixed/60 px-1.5 py-0.5 rounded">
                    COOLING-PHASE-2
                  </span>
                  <span className="font-label-sm text-label-sm text-secondary font-semibold">
                    PUE 1.05
                  </span>
                </div>
                <h4 className="font-headline-sm text-headline-sm text-on-surface leading-tight">
                  Bac d'Immersion Deux Phases
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Fluide diélectrique synthétique à changement d'état. Zéro
                  ventilateur.
                </p>
              </div>
              <div className="flex flex-col gap-space-xs pt-2">
                <div className="flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant">
                  <span>
                    Coût :{' '}
                    <strong className="text-on-surface">
                      30t Terres Rares
                    </strong>
                  </span>
                  <span>
                    Efficience :{' '}
                    <strong className="text-secondary font-bold">+18%</strong>
                  </span>
                </div>
                <button
                  className="w-full py-1.5 px-space-sm bg-secondary text-on-secondary hover:bg-secondary/90 rounded font-label-sm text-label-sm uppercase font-bold tracking-wider flex items-center justify-center gap-1 transition-colors"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[15px]">
                    install_desktop
                  </span>
                  Installer Bac
                </button>
              </div>
            </div>
            <div className="p-space-sm bg-surface-container-low rounded-lg flex flex-col justify-between gap-space-sm hover:bg-surface-container transition-all">
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-[10px] text-tertiary font-bold bg-tertiary-fixed/60 px-1.5 py-0.5 rounded">
                    ECO-DISTRICT
                  </span>
                  <span className="font-label-sm text-label-sm text-secondary font-semibold">
                    +8% Adhésion
                  </span>
                </div>
                <h4 className="font-headline-sm text-headline-sm text-on-surface leading-tight">
                  Unité Récup. Chaleur Urbaine
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Échangeurs thermodynamiques raccordant l'eau chaude aux
                  réseaux de la métropole.
                </p>
              </div>
              <div className="flex flex-col gap-space-xs pt-2">
                <div className="flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant">
                  <span>
                    Chauffe :{' '}
                    <strong className="text-on-surface">12 000 foyers</strong>
                  </span>
                  <span>
                    Subvention :{' '}
                    <strong className="text-secondary font-bold">
                      +1.2M €/an
                    </strong>
                  </span>
                </div>
                <button
                  className="w-full py-1.5 px-space-sm bg-surface-container-highest text-on-surface hover:bg-surface-container-high rounded font-label-sm text-label-sm uppercase font-bold tracking-wider flex items-center justify-center gap-1 transition-colors"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[15px]">
                    hub
                  </span>
                  Raccorder Réseau
                </button>
              </div>
            </div>
            <div className="p-space-sm bg-surface-container-low rounded-lg flex flex-col justify-between gap-space-sm hover:bg-surface-container transition-all">
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-[10px] text-primary font-bold bg-primary-fixed-dim/40 px-1.5 py-0.5 rounded">
                    R&amp;D ADV-Q3
                  </span>
                  <span className="font-label-sm text-label-sm text-primary font-semibold">
                    -70% Énergie
                  </span>
                </div>
                <h4 className="font-headline-sm text-headline-sm text-on-surface leading-tight">
                  Processeur Photonique
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Calcul neuromorphique guidé par lasers silicium. Rupture
                  technologique majeure.
                </p>
              </div>
              <div className="flex flex-col gap-space-xs pt-2">
                <div className="flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant">
                  <span>
                    Recherche :{' '}
                    <strong className="text-on-surface">Niveau 4 Requis</strong>
                  </span>
                  <span>
                    TR Nécessaires :{' '}
                    <strong className="text-error font-bold">180t</strong>
                  </span>
                </div>
                <button
                  className="w-full py-1.5 px-space-sm bg-surface-container-high text-on-surface-variant rounded font-label-sm text-label-sm uppercase font-bold tracking-wider flex items-center justify-center gap-1 cursor-not-allowed opacity-80"
                  disabled
                  type="button"
                >
                  <span className="material-symbols-outlined text-[15px]">
                    lock
                  </span>
                  Verrouillé (R&amp;D)
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

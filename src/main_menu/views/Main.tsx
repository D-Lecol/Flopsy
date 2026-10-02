import { Link } from 'react-router';

export default function Main() {
  return (
    <div className="flex flex-col w-full">
      <div className="w-full bg-surface-container-high px-gutter-desktop py-1 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-space-sm min-w-0">
          <span className="inline-flex items-center gap-1.5 px-space-xs py-0.5 rounded bg-secondary/15 text-secondary font-label-sm text-label-sm uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
            Télémétrie Planétaire Active
          </span>
          <p className="font-label-sm text-label-sm text-on-surface-variant truncate">
            Simulation biophysique calibrée : Modèles RTE · ADEME · Données RMIS
            2024
          </p>
        </div>
        <div className="hidden md:flex items-center gap-space-md font-label-sm text-label-sm text-on-surface-variant">
          <span>
            LATENCY:{' '}
            <strong className="text-on-surface font-semibold">12ms</strong>
          </span>
          <span className="text-outline-variant">/</span>
          <span>
            CYCLE DE SIMULATION:{' '}
            <strong className="text-primary font-semibold">STABLE</strong>
          </span>
        </div>
      </div>
      <div className="w-full px-gutter-desktop py-space-lg flex flex-col gap-space-lg">
        <section className="w-full bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-space-lg relative overflow-hidden">
          <div className="absolute -right-12 -top-12 w-64 h-64 rounded-full bg-gradient-to-br from-primary/10 via-tertiary-fixed-dim/5 to-transparent pointer-events-none"></div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-space-lg z-10">
            <div className="bg-surface-container p-space-sm rounded-lg flex items-center justify-center shrink-0 shadow-sm">
              <img
                className="h-14 sm:h-16 w-auto object-contain"
                data-alt="Monogramme et wordmark officiel de FLOPSY en style typographique industriel Space Grotesk terracotta cuivré et ardoise, accompagné du logo graphique composé d'un microprocesseur stylisé sous tension électrique et d'un réseau maillé sur fond blanc immaculé."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcMkkURc_N5Szne3HYMgRbybKbEBLD45GuXpy7KrAyIdk_dIRs8hNAJTIRV0GpIR51VAzo-PBjwv1pFjtHD6RwwidgJsGX4y8B3Iq1ORSZNUPrWeNRfrKUWD1Utyl_jOJZZ49ssxJFLPnsXlLtOdYpXC8wp3o82PO5opU5mf2SpWH_kevAtfAnLqjNMi_Wjwf3vKEbiF_cXrh0Med0JF4nacsgZSJki43sg-bjNiUDDQxv9TeD4vbH"
              />
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="flex flex-wrap items-center gap-space-xs">
                <span className="font-label-sm text-label-sm uppercase font-semibold text-primary px-space-xs py-0.5 bg-primary-fixed rounded">
                  Saison 1 : La Crise des Pétaflops
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant px-space-xs py-0.5 bg-surface-container rounded">
                  SIMULATEUR ÉNERGIE · RESSOURCES · IA
                </span>
              </div>
              <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
                FLOPSY // ARCHITECTURE COMPUTING
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
                Arbitrez l'essor exponentiel de l'IA générative contre la
                finitude des terres rares et les limites de votre réseau
                énergétique.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-space-sm shrink-0 z-10">
            <div className="bg-surface-container-low p-space-sm rounded flex flex-col">
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                PUISSANCE GRID
              </span>
              <span className="font-metric-display text-headline-sm text-secondary font-bold">
                1 420 MW
              </span>
              <span className="font-label-sm text-[10px] text-secondary">
                Réseau nominal
              </span>
            </div>
            <div className="bg-surface-container-low p-space-sm rounded flex flex-col">
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                STOCK NÉODYME
              </span>
              <span className="font-metric-display text-headline-sm text-primary font-bold">
                1 200 t
              </span>
              <span className="font-label-sm text-[10px] text-primary">
                Réserve finie
              </span>
            </div>
            <div className="bg-surface-container-low p-space-sm rounded flex flex-col">
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                DEMANDE IA
              </span>
              <span className="font-metric-display text-headline-sm text-tertiary-container font-bold">
                4 850 PFLOP
              </span>
              <span className="font-label-sm text-[10px] text-tertiary">
                +18% par cycle
              </span>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
          <div className="lg:col-span-7 flex flex-col gap-space-md">
            <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-sm">
              <div className="flex items-center justify-between pb-space-xs border-b border-surface-container">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-primary text-[20px]">
                    rocket_launch
                  </span>
                  <span className="font-headline-sm text-headline-sm text-on-surface">
                    Poste d'Amorçage
                  </span>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  MOTEUR SIM v0.8.4
                </span>
              </div>

              <Link to={'/game'}>
                <button
                  className="group w-full bg-primary-container hover:bg-primary transition-all duration-150 text-on-primary-container p-space-md rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm shadow-md active:translate-y-0.5 text-left"
                  type="button"
                >
                  <div className="flex items-center gap-space-md">
                    <div className="w-12 h-12 rounded bg-surface-container-lowest/15 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[28px] text-white">
                        play_arrow
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-space-xs">
                        <span className="font-headline-sm text-headline-sm text-white font-bold tracking-wide">
                          NOUVELLE EXPÉDITION
                        </span>
                        <span className="px-space-xs py-0.5 rounded bg-surface-container-lowest/20 font-label-sm text-label-sm text-white uppercase">
                          Recommandé
                        </span>
                      </div>
                      <p className="font-body-sm text-body-sm text-white/80">
                        Déployez votre colonie · Session estimée 25–35 min ·
                        Difficulté Normale
                      </p>
                    </div>
                  </div>
                  <div className="flex sm:flex-col items-end justify-between shrink-0 font-label-sm text-label-sm text-white/90">
                    <span className="font-semibold">PLANÈTE EPSILON-4</span>
                    <span className="text-white/70">50 000 Habitants</span>
                  </div>
                </button>
              </Link>

              <Link to={'/game'}>
                <button
                  className="w-full bg-surface-container hover:bg-surface-container-high transition-colors text-on-surface p-space-md rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm text-left shadow-sm active:translate-y-0.5"
                  type="button"
                >
                  <div className="flex items-center gap-space-md">
                    <div className="w-10 h-10 rounded bg-secondary/15 text-secondary flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[22px]">
                        history
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-space-xs">
                        <span className="font-headline-sm text-headline-sm text-on-surface">
                          CONTINUER CYCLE EN COURS
                        </span>
                        <span className="w-2 h-2 rounded-full bg-secondary inline-block"></span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Cycle 12 · Année 2034 · Débit : 4 850 PFLOP/s ·
                        Sauvegarde auto il y a 8 min
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-space-xs text-secondary font-label-sm text-label-sm font-semibold self-end sm:self-center">
                    <span>REPRENDRE</span>
                    <span className="material-symbols-outlined text-[16px]">
                      arrow_forward
                    </span>
                  </div>
                </button>
              </Link>
            </div>

            <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-on-surface-variant text-[20px]">
                    tune
                  </span>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface">
                    Sélecteur de Scénario Opérationnel
                  </h2>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  3 MODES DISPONIBLES
                </span>
              </div>

              <div className="grid grid-cols-1 gap-space-xs" id="scenario-deck">
                <label className="cursor-pointer bg-surface-container-low hover:bg-surface-container transition-colors rounded-lg p-space-md flex items-start gap-space-md relative overflow-hidden">
                  <input
                    checked
                    className="mt-1 accent-primary"
                    name="scenario"
                    type="radio"
                  />
                  <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                        Mission 01 : Naissance de l'IA Citoyenne
                      </span>
                      <span className="px-space-xs py-0.5 rounded bg-secondary/15 text-secondary font-label-sm text-label-sm">
                        Standard
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Initiez la population au calcul génératif. Maintenez 100%
                      de taux d'adoption sans délestage du réseau urbain de la
                      Métropole.
                    </p>
                    <div className="flex flex-wrap items-center gap-space-sm mt-space-xs font-label-sm text-label-sm text-on-surface-variant">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] text-secondary">
                          bolt
                        </span>{' '}
                        Cible: 100% sans blackout
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] text-primary">
                          science
                        </span>{' '}
                        Finitude Terres Rares
                      </span>
                    </div>
                  </div>
                </label>

                <label className="cursor-pointer bg-surface-container-low hover:bg-surface-container transition-colors rounded-lg p-space-md flex items-start gap-space-md relative overflow-hidden">
                  <input
                    className="mt-1 accent-primary"
                    name="scenario"
                    type="radio"
                  />
                  <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                        Mission 02 : Pénurie de Néodyme
                      </span>
                      <span className="px-space-xs py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm">
                        Difficile
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Gisement sous strict contingentement. Réserve totale
                      limitée à 800t de terres rares. Optimisez le recyclage et
                      bridez les requêtes futiles.
                    </p>
                    <div className="flex flex-wrap items-center gap-space-sm mt-space-xs font-label-sm text-label-sm text-on-surface-variant">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] text-tertiary">
                          warning
                        </span>{' '}
                        Quota max 800 t
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] text-on-surface">
                          psychology
                        </span>{' '}
                        Sobriété d'usage requise
                      </span>
                    </div>
                  </div>
                </label>

                <label className="cursor-pointer bg-surface-container-low hover:bg-surface-container transition-colors rounded-lg p-space-md flex items-start gap-space-md relative overflow-hidden">
                  <input
                    className="mt-1 accent-primary"
                    name="scenario"
                    type="radio"
                  />
                  <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                        Mode Bac à Sable Illimité
                      </span>
                      <span className="px-space-xs py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">
                        Expérimental
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Paramétrez librement les constantes thermodynamiques,
                      construisez sans plafond budgétaire et éprouvez les
                      limites théoriques de la planète.
                    </p>
                  </div>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm">
              <button
                className="bg-surface-container-low hover:bg-surface-container p-space-sm rounded-lg flex items-center justify-center gap-space-xs font-label-lg text-label-lg text-on-surface transition-colors shadow-sm"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px] text-secondary">
                  school
                </span>
                <span>Tutoriel Guidé</span>
              </button>
              <button
                className="bg-surface-container-low hover:bg-surface-container p-space-sm rounded-lg flex items-center justify-center gap-space-xs font-label-lg text-label-lg text-on-surface transition-colors shadow-sm"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
                  display_settings
                </span>
                <span>Paramètres Vidéo</span>
              </button>
              <button
                className="bg-surface-container-low hover:bg-surface-container p-space-sm rounded-lg flex items-center justify-center gap-space-xs font-label-lg text-label-lg text-on-surface transition-colors shadow-sm"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px] text-primary">
                  menu_book
                </span>
                <span>Crédits &amp; Sources</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-space-md">
            <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-sm relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-secondary text-[20px]">
                    public
                  </span>
                  <span className="font-headline-sm text-headline-sm text-on-surface">
                    Monde Isométrique Actif
                  </span>
                </div>
                <span className="font-label-sm text-label-sm px-space-xs py-0.5 rounded bg-secondary/15 text-secondary font-semibold">
                  SECTEUR EPSILON-4
                </span>
              </div>

              <div className="relative w-full rounded-lg overflow-hidden bg-surface-container-highest shadow-inner aspect-[16/10]">
                <img
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  data-alt="Monde isométrique 3D stylisé flottant montrant un campus technologique moderne avec datacenters cubiques refroidis par air, une centrale nucléaire avec deux tours de refroidissement fumantes, des pylônes haute tension reliant le réseau électrique à une ville en arrière-plan sous une lumière chaude et dorée de fin d'après-midi."
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAq3uuVuLFiDsW20Bs_vlczuetRdhtT__CzDdkKoFVo7pTli0VMol4XeiK3plq37ET8UpuHSTB1rkaa0FSy_PZ0z-I4nSEweSxeuP7m8kd94R7Cq3QhnB48tZuaH7mbUy1Tebb6vYGRiSFYmbW7AfTPcQ_XsH1VuStCnvb8bIxChR3vTDwIPOP5Kz5_rG5N_CLCBa7LZ0HvoDg293tVnSG3rMuMVu0GYLTmXaoHMVc9hNM8k2Jsqmoc"
                />

                <div className="absolute top-3 left-3 bg-surface-container-lowest/90 backdrop-blur-sm px-space-xs py-1 rounded shadow-sm flex items-center gap-1.5 font-label-sm text-label-sm text-on-surface">
                  <span className="w-2 h-2 rounded-full bg-secondary"></span>
                  <span>Centrale Nucléaire 01 : 1 420 MW</span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 bg-surface-container-lowest/90 backdrop-blur-sm p-space-xs rounded shadow-sm flex items-center justify-between font-label-sm text-label-sm text-on-surface">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-primary text-[16px]">
                      memory
                    </span>
                    <span>Cluster Datacenter Nord : 4 Baies Active</span>
                  </div>
                  <span className="text-secondary font-semibold">
                    CONFIANCE 94%
                  </span>
                </div>
              </div>

              <div className="bg-surface-container-low rounded p-space-sm flex flex-col gap-space-xs font-label-sm text-label-sm">
                <div className="flex justify-between items-center py-0.5">
                  <span className="text-on-surface-variant">
                    Population Urbaine Connectée
                  </span>
                  <span className="font-semibold text-on-surface font-label-md">
                    50 000 Habitants
                  </span>
                </div>
                <div className="flex justify-between items-center py-0.5 bg-surface-container/50 px-1 rounded">
                  <span className="text-on-surface-variant">
                    Ressource Critique (Terres Rares)
                  </span>
                  <span className="font-semibold text-primary font-label-md">
                    1 200 t résiduelles
                  </span>
                </div>
                <div className="flex justify-between items-center py-0.5">
                  <span className="text-on-surface-variant">
                    Pertes de Ligne Réseau (Joule)
                  </span>
                  <span className="font-semibold text-on-surface font-label-md">
                    4.2 % (Optimisé)
                  </span>
                </div>
                <div className="flex justify-between items-center py-0.5 bg-surface-container/50 px-1 rounded">
                  <span className="text-on-surface-variant">
                    Priorité d'Arbitrage
                  </span>
                  <span className="font-semibold text-secondary font-label-md">
                    Ville Prioritaire
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-primary text-[18px]">
                    verified
                  </span>
                  <span className="font-headline-sm text-headline-sm text-on-surface">
                    Notes de Version v0.8.4
                  </span>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  MISE À JOUR MAJEURE
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Intégration de la mécanique de{' '}
                <strong className="text-on-surface">
                  valorisation de la chaleur fatale
                </strong>
                des serveurs vers le réseau de chauffage urbain. Calibration
                complète des profils de charge d'après les jeux de données
                ouverts{' '}
                <span className="text-primary font-semibold">
                  RTE (éco2mix)
                </span>{' '}
                et <span className="text-primary font-semibold">ADEME</span>.
              </p>
              <div className="mt-space-xs pt-space-xs flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-secondary">
                    cloud_download
                  </span>
                  Patch notes complets
                </span>
                <span className="text-on-surface font-medium">
                  Build 2024.11.08
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full bg-surface-container-lowest rounded-lg p-space-sm shadow-sm flex flex-col sm:flex-row items-center justify-between gap-space-sm">
          <div className="flex flex-wrap items-center gap-space-md font-label-sm text-label-sm text-on-surface-variant">
            <span className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 rounded bg-surface-container-high font-mono text-[11px] text-on-surface shadow-sm">
                ESPACE
              </kbd>
              <span>Lancer l'expédition</span>
            </span>
            <span className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 rounded bg-surface-container-high font-mono text-[11px] text-on-surface shadow-sm">
                ECHAP
              </kbd>
              <span>Quitter la simulation</span>
            </span>
            <span className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 rounded bg-surface-container-high font-mono text-[11px] text-on-surface shadow-sm">
                T
              </kbd>
              <span>Tutoriel rapide</span>
            </span>
          </div>
          <div className="flex items-center gap-space-sm font-label-sm text-label-sm text-on-surface-variant">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-secondary">
                verified_user
              </span>
              <span>Open Educational License</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

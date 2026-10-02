export default function GeneralView() {
  return (
    <div className="flex flex-col w-full">
      <div className="relative w-full overflow-hidden p-space-md flex flex-col gap-space-md">
        <header className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-space-sm z-30">
          <article className="bg-surface-container-lowest p-space-md rounded-xl shadow-md flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 h-1 w-20 bg-primary"></div>
            <div className="flex items-center justify-between gap-space-xs">
              <div className="flex items-center gap-space-xs">
                <span className="w-2 h-2 rounded-full bg-primary inline-block"></span>
                <span className="font-label-sm text-label-sm uppercase text-on-surface-variant font-bold tracking-wider">
                  01 // CALCUL IA
                </span>
              </div>
              <span className="px-space-xs py-0.5 rounded bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-ping"></span>
                +12.4%/an
              </span>
            </div>
            <div className="my-space-xs flex items-baseline justify-between">
              <div className="font-metric-display text-metric-display text-on-surface tracking-tight font-bold">
                4,850{' '}
                <span className="font-label-md text-label-md text-on-surface-variant font-normal">
                  / 5,200 PFLOP/s
                </span>
              </div>
              <span className="font-label-sm text-label-sm px-1.5 py-0.5 rounded bg-surface-container-high text-on-surface font-semibold">
                93.2% CHARGE
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <div className="grid grid-cols-12 gap-0.5 h-2 w-full p-0.5 bg-surface-container rounded-sm">
                <div className="bg-primary rounded-xs"></div>
                <div className="bg-primary rounded-xs"></div>
                <div className="bg-primary rounded-xs"></div>
                <div className="bg-primary rounded-xs"></div>
                <div className="bg-primary rounded-xs"></div>
                <div className="bg-primary rounded-xs"></div>
                <div className="bg-primary rounded-xs"></div>
                <div className="bg-primary rounded-xs"></div>
                <div className="bg-primary rounded-xs"></div>
                <div className="bg-primary rounded-xs"></div>
                <div className="bg-primary-fixed-dim rounded-xs"></div>
                <div className="bg-surface-container-highest rounded-xs"></div>
              </div>
              <div className="flex justify-between items-center text-on-surface-variant font-label-sm text-label-sm">
                <span>Racks Actifs: 34/38</span>
                <span className="text-primary font-semibold">
                  Tension modérée
                </span>
              </div>
            </div>
          </article>
          <article className="bg-surface-container-lowest p-space-md rounded-xl shadow-md flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 h-1 w-20 bg-error"></div>
            <div className="flex items-center justify-between gap-space-xs">
              <div className="flex items-center gap-space-xs">
                <span className="w-2 h-2 rounded-full bg-tertiary-container inline-block"></span>
                <span className="font-label-sm text-label-sm uppercase text-on-surface-variant font-bold tracking-wider">
                  02 // RÉSEAU ÉLECTRIQUE
                </span>
              </div>
              <span className="px-space-xs py-0.5 rounded bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px]">
                  bolt
                </span>
                DÉFICIT -70 MW
              </span>
            </div>
            <div className="my-space-xs flex items-baseline justify-between">
              <div className="font-metric-display text-metric-display text-on-surface tracking-tight font-bold">
                1,850{' '}
                <span className="font-label-md text-label-md text-on-surface-variant font-normal">
                  / 1,920 MW
                </span>
              </div>
              <span className="font-label-sm text-label-sm text-tertiary font-semibold">
                Pertes 11.2%
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <div className="grid grid-cols-12 gap-0.5 h-2 w-full p-0.5 bg-surface-container rounded-sm">
                <div className="bg-secondary rounded-xs"></div>
                <div className="bg-secondary rounded-xs"></div>
                <div className="bg-secondary rounded-xs"></div>
                <div className="bg-secondary rounded-xs"></div>
                <div className="bg-secondary rounded-xs"></div>
                <div className="bg-secondary rounded-xs"></div>
                <div className="bg-secondary rounded-xs"></div>
                <div className="bg-secondary rounded-xs"></div>
                <div className="bg-secondary rounded-xs"></div>
                <div className="bg-tertiary-fixed-dim rounded-xs"></div>
                <div className="bg-error rounded-xs"></div>
                <div className="bg-error rounded-xs"></div>
              </div>
              <div className="flex justify-between items-center text-on-surface-variant font-label-sm text-label-sm">
                <span>Centrale EPR #1 (100%)</span>
                <span className="text-error font-semibold">
                  Import Réseau requis
                </span>
              </div>
            </div>
          </article>
          <article className="bg-surface-container-lowest p-space-md rounded-xl shadow-md flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 h-1 w-20 bg-tertiary"></div>
            <div className="flex items-center justify-between gap-space-xs">
              <div className="flex items-center gap-space-xs">
                <span className="w-2 h-2 rounded-full bg-outline inline-block"></span>
                <span className="font-label-sm text-label-sm uppercase text-on-surface-variant font-bold tracking-wider">
                  03 // TERRES RARES
                </span>
              </div>
              <span className="px-space-xs py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">
                STOCK NON-RENOUVELABLE
              </span>
            </div>
            <div className="my-space-xs flex items-baseline justify-between">
              <div className="font-metric-display text-metric-display text-on-surface tracking-tight font-bold">
                1,120{' '}
                <span className="font-label-md text-label-md text-on-surface-variant font-normal">
                  tonnes
                </span>
              </div>
              <span className="font-label-sm text-label-sm px-1.5 py-0.5 rounded bg-primary-fixed text-on-primary-fixed font-semibold">
                -42 t/an (global)
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <div className="h-2 w-full bg-surface-container rounded-sm overflow-hidden flex">
                <div className="h-full bg-tertiary w-[56%]"></div>
                <div className="h-full bg-surface-container-high flex-1"></div>
              </div>
              <div className="flex justify-between items-center text-on-surface-variant font-label-sm text-label-sm">
                <span>Ville: -28t | Datacenters: -14t</span>
                <span className="text-on-surface font-semibold">
                  Reste ~26.7 ans
                </span>
              </div>
            </div>
          </article>
          <article className="bg-surface-container-lowest p-space-md rounded-xl shadow-md flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 h-1 w-20 bg-secondary"></div>
            <div className="flex items-center justify-between gap-space-xs">
              <div className="flex items-center gap-space-xs">
                <span className="w-2 h-2 rounded-full bg-secondary inline-block"></span>
                <span className="font-label-sm text-label-sm uppercase text-on-surface-variant font-bold tracking-wider">
                  04 // ADHÉSION PUBLIQUE
                </span>
              </div>
              <span className="px-space-xs py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold">
                STABLE (+1.1%/m)
              </span>
            </div>
            <div className="my-space-xs flex items-baseline justify-between">
              <div className="font-metric-display text-metric-display text-secondary tracking-tight font-bold">
                72%{' '}
                <span className="font-label-md text-label-md text-on-surface-variant font-normal">
                  CONSENSUS
                </span>
              </div>
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                Seuil alerte: &lt;45%
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <div className="h-2 w-full bg-surface-container rounded-sm overflow-hidden flex">
                <div className="h-full bg-secondary w-[72%]"></div>
                <div className="h-full bg-surface-container-high flex-1"></div>
              </div>
              <div className="flex justify-between items-center text-on-surface-variant font-label-sm text-label-sm">
                <span>Pénuries évitées: 100%</span>
                <span className="text-secondary font-semibold">
                  Priorité Citoyenne ON
                </span>
              </div>
            </div>
          </article>
        </header>
        <section className="relative w-full rounded-xl overflow-hidden shadow-xl bg-surface-container-low min-h-[640px] flex flex-col justify-between">
          <img
            alt="Simulation Tycoon Isométrique : Vue aérienne avec centrale nucléaire, datacenter d'IA et réseau de pylônes haute-tension"
            className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-ScVgDyWA-nwHsEXI4-duHfZBViRuW7hcxO0yRDlxfrOFbumMOpXgHtYSLN-SAugtxtSha_FX-v2DsrrjjIJJurxy9mELRHvr397FbgHJ160VWUJRdm_qcACQmjrmQl_ibpR1bRvVUfI0nSv2_16vAVTwLsEndTY-JpjFWGjszG9tgooYg0d36CHGiqluU_fHwxgee0K7b5HP_Gqs6OnqNXtXpRReOz2uD-MUd5J7-l5F0Zd2hpq0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-dim/40 via-transparent to-surface-container-lowest/20 pointer-events-none"></div>
          <div className="relative z-20 p-space-md flex items-center justify-between gap-space-md flex-wrap">
            <div className="flex items-center gap-1 p-1 bg-surface-container-lowest/95 backdrop-blur-md rounded shadow-md">
              <button
                className="px-space-sm py-1 rounded bg-primary-container text-on-primary-container font-label-sm text-label-sm font-semibold flex items-center gap-1 transition-transform active:translate-y-0.5"
                title="Vue Isométrique Axonométrique 45°"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">
                  view_in_ar
                </span>
                ISO 45°
              </button>
              <button
                className="w-7 h-7 rounded hover:bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors"
                title="Rotation 90 Degrés"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">
                  rotate_right
                </span>
              </button>
              <button
                className="px-space-xs py-1 rounded hover:bg-surface-container text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm flex items-center gap-1 transition-colors"
                id="gridToggle"
                title="Afficher/Masquer Grille Topologique"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">
                  grid_4x4
                </span>
                GRILLE
              </button>
              <div className="h-3 w-px bg-surface-container-high mx-0.5"></div>
              <button
                className="w-7 h-7 rounded hover:bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface"
                title="Zoom In"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">
                  add
                </span>
              </button>
              <button
                className="w-7 h-7 rounded hover:bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface"
                title="Zoom Out"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">
                  remove
                </span>
              </button>
            </div>
            <div className="hidden lg:flex items-center gap-space-sm px-space-md py-1.5 rounded bg-surface-container-lowest/90 backdrop-blur-md shadow-sm">
              <span className="material-symbols-outlined text-primary text-[18px]">
                warning
              </span>
              <span className="font-label-sm text-label-sm text-on-surface">
                <strong>PIC TARIFAIRE 18H-20H :</strong> Énergie réseau spot à{' '}
                <strong>142€/MWh</strong>. Bascule suggérée sur batteries
                locales.
              </span>
            </div>
            <div className="flex items-center gap-space-xs px-space-sm py-1 rounded bg-surface-container-lowest/90 backdrop-blur-md font-label-sm text-label-sm text-on-surface-variant">
              <span>PARCELLE [X:14 / Y:09]</span>
              <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
              <span className="text-on-surface font-semibold">
                ZONE INDUSTRIELLE SUD
              </span>
            </div>
          </div>
          <div className="relative w-full h-[360px] pointer-events-none">
            <div className="absolute left-[8%] md:left-[14%] top-[12%] pointer-events-auto flex flex-col items-start gap-1 group">
              <div className="bg-surface-container-lowest/95 backdrop-blur-md p-space-sm rounded-lg shadow-xl max-w-xs transition-all hover:scale-[1.02]">
                <div className="flex items-center justify-between gap-space-xs mb-1">
                  <span className="font-label-sm text-label-sm font-bold text-primary flex items-center gap-1">
                    <span className="w-2 h-2 rounded bg-primary"></span>
                    DATACENTER ALPHA // 4 RACKS
                  </span>
                  <span className="font-label-sm text-label-sm px-1 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-semibold">
                    92% ACTIF
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 font-label-sm text-label-sm text-on-surface-variant mb-2">
                  <span>
                    Conso: <strong className="text-on-surface">380 MW</strong>
                  </span>
                  <span>
                    Calcul:{' '}
                    <strong className="text-primary">+1,200 PFLOP</strong>
                  </span>
                  <span>
                    Refroidissement:{' '}
                    <strong className="text-secondary">Eau/Immersion</strong>
                  </span>
                  <span>
                    PUE Actuel:{' '}
                    <strong className="text-on-surface">1.18</strong>
                  </span>
                </div>
                <div className="flex items-center gap-1 pt-1 bg-surface-container-low p-1 rounded">
                  <button
                    className="w-full py-1 px-2 rounded bg-primary text-on-primary font-label-sm text-label-sm font-bold flex items-center justify-center gap-1 shadow-sm active:translate-y-0.5"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[14px]">
                      upgrade
                    </span>
                    +1 RACK (45t TR)
                  </button>
                </div>
              </div>
              <div className="flex flex-col items-center ml-8">
                <div className="w-0.5 h-6 bg-primary"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-primary ring-2 ring-surface-container-lowest"></div>
              </div>
            </div>
            <div className="absolute right-[8%] md:right-[18%] top-[8%] pointer-events-auto flex flex-col items-end gap-1 group">
              <div className="bg-surface-container-lowest/95 backdrop-blur-md p-space-sm rounded-lg shadow-xl max-w-xs text-left transition-all hover:scale-[1.02]">
                <div className="flex items-center justify-between gap-space-xs mb-1">
                  <span className="font-label-sm text-label-sm font-bold text-secondary flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-secondary"></span>
                    CENTRALE EPR #1 // 2 RÉACTEURS
                  </span>
                  <span className="font-label-sm text-label-sm px-1 py-0.5 rounded bg-surface-container text-on-surface font-semibold">
                    BASELOAD
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 font-label-sm text-label-sm text-on-surface-variant mb-2">
                  <span>
                    Production:{' '}
                    <strong className="text-on-surface">1,850 MW</strong>
                  </span>
                  <span>
                    Maintenance:{' '}
                    <strong className="text-secondary">99.4%</strong>
                  </span>
                  <span>
                    Disponibilité:{' '}
                    <strong className="text-on-surface">24/7</strong>
                  </span>
                  <span>
                    Empreinte CO2:{' '}
                    <strong className="text-secondary">4 g/kWh</strong>
                  </span>
                </div>
                <button
                  className="w-full py-1 px-2 rounded bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-sm text-label-sm font-semibold flex items-center justify-center gap-1 transition-colors"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[14px]">
                    tune
                  </span>
                  Ouvrir Régulation Cœur
                </button>
              </div>
              <div className="flex flex-col items-center mr-12">
                <div className="w-0.5 h-8 bg-secondary"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-secondary ring-2 ring-surface-container-lowest"></div>
              </div>
            </div>
            <div className="absolute left-[38%] md:left-[44%] bottom-[16%] pointer-events-auto flex flex-col items-center gap-1 group">
              <div className="bg-surface-container-lowest/95 backdrop-blur-md p-space-sm rounded-lg shadow-xl max-w-xs transition-all hover:scale-[1.02]">
                <div className="flex items-center justify-between gap-space-xs mb-1">
                  <span className="font-label-sm text-label-sm font-bold text-tertiary flex items-center gap-1">
                    <span className="w-2 h-2 rounded bg-tertiary-container"></span>
                    LIGNE HT NORD // 400 kV
                  </span>
                  <span className="font-label-sm text-label-sm px-1 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-semibold">
                    Pertes 11.2%
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-1.5 leading-snug">
                  Échauffement par effet Joule important entre la centrale et le
                  cluster Alpha.
                </p>
                <button
                  className="w-full py-1 px-2 rounded bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-bold flex items-center justify-center gap-1 hover:bg-secondary-fixed-dim transition-colors"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[14px]">
                    upgrade
                  </span>
                  Convertir en Câble Supraconducteur (-6% pertes)
                </button>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-0.5 h-4 bg-tertiary"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-tertiary ring-2 ring-surface-container-lowest"></div>
              </div>
            </div>
          </div>
          <div className="relative z-20 p-space-md grid grid-cols-1 md:grid-cols-12 gap-space-md items-end">
            <div className="md:col-span-5 bg-surface-container-lowest/95 backdrop-blur-md p-space-md rounded-xl shadow-lg flex flex-col gap-space-xs">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm font-bold text-on-surface uppercase tracking-wider flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-primary text-[18px]">
                    power_settings_new
                  </span>
                  ARBITRAGE DE CHARGE // DÉLESTAGE D'URGENCE
                </span>
                <span className="w-2 h-2 rounded-full bg-secondary"></span>
              </div>
              <div className="p-1 rounded bg-surface-container flex items-center gap-1 mt-1">
                <button
                  className="flex-1 py-1.5 px-space-xs rounded bg-surface-container-lowest text-on-surface font-label-sm text-label-sm font-bold shadow-sm text-center flex items-center justify-center gap-1 transition-all"
                  id="btnModeVille"
                  type="button"
                >
                  <span className="w-2 h-2 rounded-full bg-secondary"></span>
                  HABITANTS D'ABORD
                </button>
                <button
                  className="flex-1 py-1.5 px-space-xs rounded text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm font-semibold text-center flex items-center justify-center gap-1 transition-all"
                  id="btnModeIA"
                  type="button"
                >
                  <span className="w-2 h-2 rounded-full bg-surface-container-high"></span>
                  PRIORITÉ FLOPS IA
                </button>
              </div>
              <p
                className="font-body-sm text-body-sm text-on-surface-variant mt-0.5"
                id="arbitrageExplanation"
              >
                <strong>Règle active :</strong> En cas de creux électrique, les
                datacenters brident leur entraînement IA pour garantir
                l'alimentation sans coupure des 50 000 foyers de
                l'agglomération.
              </p>
            </div>
            <div className="md:col-span-7 bg-surface-container-lowest/95 backdrop-blur-md p-space-md rounded-xl shadow-lg flex flex-col gap-space-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-space-xs">
                  <span className="px-1.5 py-0.5 rounded bg-surface-container-high font-label-sm text-label-sm font-bold text-on-surface">
                    PÉDAGOGIE SYSTÉMIQUE
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    // Sources : ADEME, RTE, IEA 2024
                  </span>
                </div>
                <span className="font-label-sm text-label-sm text-primary font-bold">
                  1 PROMPT IA ≈ 2.9 Wh
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm pt-1">
                <div className="p-2 rounded bg-surface-container-low flex flex-col">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    Échelle Datacenter
                  </span>
                  <span className="font-headline-sm text-headline-sm text-on-surface font-bold mt-0.5">
                    ≈ 50k hab.
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    Conso électrique moyenne par an
                  </span>
                </div>
                <div className="p-2 rounded bg-surface-container-low flex flex-col">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    Recyclabilité Métaux
                  </span>
                  <span className="font-headline-sm text-headline-sm text-error font-bold mt-0.5">
                    &lt; 2.0%
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    Pour Gallium/Indium/Terres rares
                  </span>
                </div>
                <div className="p-2 rounded bg-surface-container-low flex flex-col">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    Équivalent Énergie
                  </span>
                  <span className="font-headline-sm text-headline-sm text-primary font-bold mt-0.5">
                    10x
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    Plus lourd qu'une requête web standard
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full bg-surface-container-lowest p-space-md rounded-xl shadow-lg flex flex-col gap-space-md z-30">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
            <div className="flex items-center gap-space-sm">
              <div className="w-8 h-8 rounded bg-primary-container text-on-primary-container flex items-center justify-center shadow-sm">
                <span className="material-symbols-outlined text-[20px]">
                  precision_manufacturing
                </span>
              </div>
              <div>
                <h2 className="font-headline-sm text-headline-sm text-on-surface uppercase tracking-tight">
                  MODULE DE CHANTIER • INFRASTRUCTURE
                </h2>
                <p className="font-label-sm text-label-sm text-on-surface-variant">
                  Sélectionnez une unité pour la placer sur la matrice
                  orthogonale
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 p-1 rounded bg-surface-container">
              <button
                className="px-space-md py-1 rounded bg-surface-container-lowest text-on-surface font-label-sm text-label-sm font-bold shadow-sm flex items-center gap-1"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">
                  memory
                </span>
                DATACENTERS (4)
              </button>
              <button
                className="px-space-md py-1 rounded hover:bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm font-semibold flex items-center gap-1 transition-colors"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">
                  solar_power
                </span>
                ÉNERGIE &amp; CENTRALES (3)
              </button>
              <button
                className="px-space-md py-1 rounded hover:bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm font-semibold flex items-center gap-1 transition-colors"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">
                  electrical_services
                </span>
                RÉSEAU &amp; PYLÔNES (2)
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-space-sm">
            <div className="bg-surface-container-low hover:bg-surface-container p-space-md rounded-lg flex flex-col justify-between transition-all group">
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-bold">
                    MOD-01 // RACK AIR
                  </span>
                  <span className="font-label-sm text-label-sm px-1.5 py-0.5 rounded bg-surface-container-high text-on-surface">
                    DISPONIBLE
                  </span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mt-0.5">
                  Datacenter Edge T1
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Unité compacte à faible inertie thermique pour inférence
                  légère.
                </p>
              </div>
              <div className="my-space-md flex flex-col gap-1 pt-space-xs">
                <div className="flex justify-between font-label-sm text-label-sm">
                  <span className="text-on-surface-variant">
                    Coût Matériaux :
                  </span>
                  <span className="font-bold text-tertiary">
                    65t Terres Rares
                  </span>
                </div>
                <div className="flex justify-between font-label-sm text-label-sm">
                  <span className="text-on-surface-variant">
                    Besoin Énergie :
                  </span>
                  <span className="font-bold text-error">140 MW</span>
                </div>
                <div className="flex justify-between font-label-sm text-label-sm">
                  <span className="text-on-surface-variant">
                    Apport Calcul :
                  </span>
                  <span className="font-bold text-primary">+450 PFLOP/s</span>
                </div>
              </div>
              <button
                className="w-full py-2 px-space-md rounded bg-surface-container-highest hover:bg-primary hover:text-on-primary text-on-surface font-label-sm text-label-sm font-bold flex items-center justify-center gap-1.5 transition-colors"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">
                  add_location_alt
                </span>
                POSER SUR LA GRILLE
              </button>
            </div>
            <div className="bg-surface-container p-space-md rounded-lg flex flex-col justify-between relative shadow-sm group">
              <div className="absolute -top-2.5 right-3 px-2 py-0.5 rounded bg-primary text-on-primary font-label-sm text-label-sm font-bold">
                SÉLECTIONNÉ
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm text-primary font-bold">
                    MOD-02 // LIQUID COOLING
                  </span>
                  <span className="font-label-sm text-label-sm px-1.5 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-bold">
                    HAUT RENDEMENT
                  </span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mt-0.5">
                  Datacenter Modulaire T2
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Cluster d'entraînement LLM à refroidissement liquide en boucle
                  fermée.
                </p>
              </div>
              <div className="my-space-md flex flex-col gap-1 pt-space-xs">
                <div className="flex justify-between font-label-sm text-label-sm">
                  <span className="text-on-surface-variant">
                    Coût Matériaux :
                  </span>
                  <span className="font-bold text-tertiary">
                    140t Terres Rares
                  </span>
                </div>
                <div className="flex justify-between font-label-sm text-label-sm">
                  <span className="text-on-surface-variant">
                    Besoin Énergie :
                  </span>
                  <span className="font-bold text-error">320 MW</span>
                </div>
                <div className="flex justify-between font-label-sm text-label-sm">
                  <span className="text-on-surface-variant">
                    Apport Calcul :
                  </span>
                  <span className="font-bold text-primary">+1,100 PFLOP/s</span>
                </div>
              </div>
              <button
                className="w-full py-2 px-space-md rounded bg-primary text-on-primary font-label-sm text-label-sm font-bold flex items-center justify-center gap-1.5 shadow-md active:translate-y-0.5 transition-transform"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">
                  touch_app
                </span>
                PLACER LE CLUSTER [ESPACE]
              </button>
            </div>
            <div className="bg-surface-container-low hover:bg-surface-container p-space-md rounded-lg flex flex-col justify-between transition-all group">
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm text-secondary font-bold">
                    PWR-04 // ATOMIQUE SMR
                  </span>
                  <span className="font-label-sm text-label-sm px-1.5 py-0.5 rounded bg-surface-container-high text-on-surface">
                    ZÉRO CARBONE
                  </span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mt-0.5">
                  Centrale SMR Compacte
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Réacteur modulaire dédié pour stabiliser la tension du campus
                  numérique.
                </p>
              </div>
              <div className="my-space-md flex flex-col gap-1 pt-space-xs">
                <div className="flex justify-between font-label-sm text-label-sm">
                  <span className="text-on-surface-variant">
                    Coût Matériaux :
                  </span>
                  <span className="font-bold text-tertiary">
                    220t Terres Rares
                  </span>
                </div>
                <div className="flex justify-between font-label-sm text-label-sm">
                  <span className="text-on-surface-variant">
                    Production Énergie :
                  </span>
                  <span className="font-bold text-secondary">
                    +450 MW continus
                  </span>
                </div>
                <div className="flex justify-between font-label-sm text-label-sm">
                  <span className="text-on-surface-variant">
                    Temps de chantier :
                  </span>
                  <span className="font-bold text-on-surface">18 Mois</span>
                </div>
              </div>
              <button
                className="w-full py-2 px-space-md rounded bg-surface-container-highest hover:bg-secondary hover:text-on-secondary text-on-surface font-label-sm text-label-sm font-bold flex items-center justify-center gap-1.5 transition-colors"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">
                  construction
                </span>
                LANCER CONSTRUCTION
              </button>
            </div>
            <div className="bg-surface-container-low hover:bg-surface-container p-space-md rounded-lg flex flex-col justify-between transition-all group">
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-bold">
                    GRID-08 // HAUTE TENSION
                  </span>
                  <span className="font-label-sm text-label-sm px-1.5 py-0.5 rounded bg-surface-container-high text-on-surface">
                    INFRA
                  </span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mt-0.5">
                  Ligne Supraconductrice
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Cryo-câbles enterrés supprimant 50% de la perte thermique en
                  transport.
                </p>
              </div>
              <div className="my-space-md flex flex-col gap-1 pt-space-xs">
                <div className="flex justify-between font-label-sm text-label-sm">
                  <span className="text-on-surface-variant">
                    Coût au kilomètre :
                  </span>
                  <span className="font-bold text-tertiary">
                    18t Terres Rares
                  </span>
                </div>
                <div className="flex justify-between font-label-sm text-label-sm">
                  <span className="text-on-surface-variant">
                    Gain Pertes Réseau :
                  </span>
                  <span className="font-bold text-secondary">-4.5% Global</span>
                </div>
                <div className="flex justify-between font-label-sm text-label-sm">
                  <span className="text-on-surface-variant">
                    Impact Confiance :
                  </span>
                  <span className="font-bold text-secondary">+2% Adhésion</span>
                </div>
              </div>
              <button
                className="w-full py-2 px-space-md rounded bg-surface-container-highest hover:bg-tertiary hover:text-on-tertiary text-on-surface font-label-sm text-label-sm font-bold flex items-center justify-center gap-1.5 transition-colors"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">
                  cable
                </span>
                DÉPLOYER CÂBLE
              </button>
            </div>
          </div>
          <footer className="flex flex-wrap items-center justify-between gap-space-sm pt-space-xs font-label-sm text-label-sm text-on-surface-variant">
            <div className="flex items-center gap-space-md flex-wrap">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-surface-container font-mono text-[11px] text-on-surface">
                  CLIC-G
                </kbd>
                Sélectionner / Poser
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-surface-container font-mono text-[11px] text-on-surface">
                  R
                </kbd>
                Pivoter Bâtiment (45°)
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-surface-container font-mono text-[11px] text-on-surface">
                  ÉCHAP
                </kbd>
                Annuler Pose
              </span>
            </div>
            <div className="flex items-center gap-space-xs">
              <span className="w-2 h-2 rounded-full bg-secondary"></span>
              <span>Simulation en direct synchronisée • 60 FPS</span>
            </div>
          </footer>
        </section>
      </div>
    </div>
  );
}
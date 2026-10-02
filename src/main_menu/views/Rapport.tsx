export default function Rapport() {
  return (
    <div className="flex flex-col w-full">
      <div className="w-full px-gutter-desktop py-space-lg flex flex-col gap-space-lg">
        <div className="w-full bg-error-container/40 rounded-xl p-space-md sm:p-space-lg shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md">
          <div className="flex items-start gap-space-md">
            <div className="w-12 h-12 rounded-lg bg-error flex items-center justify-center flex-shrink-0 text-on-error shadow-sm">
              <span className="material-symbols-outlined text-[28px]">
                warning
              </span>
            </div>
            <div className="flex flex-col gap-space-xs">
              <div className="flex items-center gap-space-sm flex-wrap">
                <span className="font-label-sm text-label-sm uppercase px-space-xs py-0.5 rounded bg-error text-on-error tracking-wider font-semibold">
                  CRITICAL TERMINATION // SECTEUR 04
                </span>
                <span className="font-label-sm text-label-sm text-outline font-semibold">
                  REF: PROTOCOLE-RUPTURE-C22
                </span>
              </div>
              <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-error font-bold tracking-tight">
                EFFONDREMENT DU SYSTÈME // RUPTURE DE CONFIANCE
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl">
                La{' '}
                <strong className="text-error font-semibold">
                  confiance du public est tombée à 0%
                </strong>{' '}
                suite à un délestage massif et prolongé des services civiques
                (urgences médicales, réseaux de chauffage urbain) au profit du
                maintien forcé des clusters de supercalcul IA en surcharge
                thermique.
              </p>
            </div>
          </div>
          <div className="flex-shrink-0 flex flex-col items-end gap-1 bg-surface-container-lowest/80 px-space-md py-space-sm rounded-lg shadow-sm">
            <span className="font-label-sm text-label-sm text-outline uppercase">
              Statut Simulation
            </span>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-error inline-block animate-ping"></span>
              <span className="font-label-lg text-label-lg font-bold text-error">
                BLACKOUT GÉNÉRAL
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-space-md">
          <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between gap-space-sm">
            <div className="flex items-center justify-between text-outline">
              <span className="font-label-sm text-label-sm uppercase tracking-wide">
                Durée de Résilience
              </span>
              <span className="material-symbols-outlined text-[18px]">
                timelapse
              </span>
            </div>
            <div>
              <div className="font-metric-display text-metric-display text-on-surface">
                14a 08m
              </div>
              <div className="font-label-sm text-label-sm text-outline-variant mt-0.5">
                CYCLE D'OPÉRATION #22
              </div>
            </div>
            <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
              <div className="bg-primary h-full w-[72%]"></div>
            </div>
          </div>
          <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between gap-space-sm">
            <div className="flex items-center justify-between text-outline">
              <span className="font-label-sm text-label-sm uppercase tracking-wide">
                Phase Atteinte
              </span>
              <span className="material-symbols-outlined text-[18px]">
                trending_up
              </span>
            </div>
            <div>
              <div className="font-metric-display text-metric-display text-primary">
                PHASE 2
              </div>
              <div className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">
                Surconsommation (134% intensité)
              </div>
            </div>
            <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
              <div className="bg-tertiary-container h-full w-full"></div>
            </div>
          </div>
          <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between gap-space-sm">
            <div className="flex items-center justify-between text-outline">
              <span className="font-label-sm text-label-sm uppercase tracking-wide">
                Puissance IA Crête
              </span>
              <span className="material-symbols-outlined text-[18px]">
                memory
              </span>
            </div>
            <div>
              <div className="font-metric-display text-metric-display text-on-surface">
                7 400 <span className="text-sm font-label-sm">PFLOP/s</span>
              </div>
              <div className="font-label-sm text-label-sm text-error mt-0.5">
                Besoin non-couvert: 2 150 PFLOP/s
              </div>
            </div>
            <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
              <div className="bg-error h-full w-[88%]"></div>
            </div>
          </div>
          <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between gap-space-sm">
            <div className="flex items-center justify-between text-outline">
              <span className="font-label-sm text-label-sm uppercase tracking-wide">
                Gisement Terres Rares
              </span>
              <span className="material-symbols-outlined text-[18px]">
                layers
              </span>
            </div>
            <div>
              <div className="font-metric-display text-metric-display text-error">
                84 <span className="text-sm font-label-sm">tonnes</span>
              </div>
              <div className="font-label-sm text-label-sm text-error mt-0.5">
                Épuisement imminent à 93%
              </div>
            </div>
            <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
              <div className="bg-error h-full w-[93%]"></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
          <div className="lg:col-span-5 flex flex-col gap-space-md">
            <div className="bg-surface-container-lowest rounded-xl p-space-md sm:p-space-lg shadow-sm flex flex-col gap-space-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-outline text-[20px]">
                    ssid_chart
                  </span>
                  <span className="font-label-md text-label-md uppercase font-semibold text-on-surface">
                    DYNAMIQUES DE L'EFFONDREMENT
                  </span>
                </div>
                <span className="font-label-sm text-label-sm text-outline">
                  CYCLES 01 → 22
                </span>
              </div>

              <div className="w-full bg-surface-container-low rounded-lg p-space-sm flex flex-col gap-space-xs">
                <div className="flex items-center justify-between text-label-sm font-label-sm px-1 text-outline">
                  <span>ADOPTION &amp; STOCK</span>
                  <span className="text-error font-semibold">
                    ↓ BLACKOUT CYCLE 19
                  </span>
                </div>
                <svg
                  className="w-full h-44 text-on-surface overflow-visible"
                  fill="none"
                  viewBox="0 0 460 180"
                >
                  <line
                    stroke="currentColor"
                    stroke-dasharray="2 2"
                    stroke-opacity="0.08"
                    x1="20"
                    x2="440"
                    y1="20"
                    y2="20"
                  ></line>
                  <line
                    stroke="currentColor"
                    stroke-dasharray="2 2"
                    stroke-opacity="0.08"
                    x1="20"
                    x2="440"
                    y1="65"
                    y2="65"
                  ></line>
                  <line
                    stroke="currentColor"
                    stroke-dasharray="2 2"
                    stroke-opacity="0.08"
                    x1="20"
                    x2="440"
                    y1="110"
                    y2="110"
                  ></line>
                  <line
                    stroke="currentColor"
                    stroke-opacity="0.08"
                    x1="20"
                    x2="440"
                    y1="155"
                    y2="155"
                  ></line>

                  <line
                    stroke="#ba1a1a"
                    stroke-dasharray="3 3"
                    stroke-width="1.5"
                    x1="380"
                    x2="380"
                    y1="10"
                    y2="160"
                  ></line>
                  <rect
                    fill="#ba1a1a"
                    height="18"
                    rx="2"
                    width="80"
                    x="340"
                    y="8"
                  ></rect>
                  <text
                    fill="#ffffff"
                    font-family="JetBrains Mono"
                    font-size="9"
                    font-weight="bold"
                    text-anchor="middle"
                    x="380"
                    y="21"
                  >
                    BLACKOUT C19
                  </text>

                  <path
                    d="M 20 150 C 100 148, 180 135, 260 100 C 320 70, 370 42, 440 25"
                    stroke="#bd5611"
                    stroke-linecap="round"
                    stroke-width="2.5"
                  ></path>

                  <path
                    d="M 20 35 C 120 40, 200 65, 280 100 C 340 128, 400 148, 440 152"
                    stroke="#356759"
                    stroke-dasharray="4 2"
                    stroke-width="2"
                  ></path>

                  <path
                    d="M 20 45 C 100 45, 200 48, 300 55 C 340 62, 370 70, 380 90 L 410 148 L 440 160"
                    stroke="#ba1a1a"
                    stroke-linecap="round"
                    stroke-width="3"
                  ></path>

                  <circle cx="380" cy="90" fill="#ba1a1a" r="4"></circle>
                  <circle cx="440" cy="160" fill="#ba1a1a" r="4"></circle>
                </svg>

                <div className="grid grid-cols-3 gap-space-xs pt-1 px-1 font-label-sm text-label-sm">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-1 rounded bg-[#bd5611]"></span>
                    <span className="text-on-surface-variant truncate">
                      Demande IA
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-1 rounded bg-secondary"></span>
                    <span className="text-on-surface-variant truncate">
                      Terres Rares
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-1 rounded bg-error"></span>
                    <span className="text-error font-medium truncate">
                      Confiance (0%)
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-surface-container-low rounded-lg p-space-md flex flex-col gap-space-sm">
                <span className="font-label-sm text-label-sm text-outline uppercase font-semibold">
                  RAPPORT DE DÉCISION DU CONSEIL
                </span>
                <div className="flex flex-col gap-space-xs font-body-sm text-body-sm text-on-surface-variant">
                  <div className="flex items-start gap-space-sm py-1 bg-surface-container-lowest/60 px-2 rounded">
                    <span className="font-label-sm text-label-sm text-primary font-bold">
                      C12
                    </span>
                    <span>
                      Adoption citoyenne à 100%. Début de la surutilisation
                      récréative non régulée.
                    </span>
                  </div>
                  <div className="flex items-start gap-space-sm py-1 bg-surface-container-lowest/60 px-2 rounded">
                    <span className="font-label-sm text-label-sm text-tertiary font-bold">
                      C17
                    </span>
                    <span>
                      Pénurie de Terres Rares : impossibilité de bâtir le
                      Datacenter Omega 04.
                    </span>
                  </div>
                  <div className="flex items-start gap-space-sm py-1 bg-error-container/30 px-2 rounded text-error">
                    <span className="font-label-sm text-label-sm font-bold">
                      C19
                    </span>
                    <span>
                      Arbitrage : 100% de la centrale attribuée à l'IA. Arrêt du
                      chauffage urbain.
                    </span>
                  </div>
                  <div className="flex items-start gap-space-sm py-1 bg-error-container/60 px-2 rounded text-error font-medium">
                    <span className="font-label-sm text-label-sm font-bold">
                      C22
                    </span>
                    <span>
                      Grève générale, sabotages civils et destitution immédiate
                      du gouverneur.
                    </span>
                  </div>
                </div>
              </div>

              <div className="relative w-full h-44 rounded-lg overflow-hidden bg-surface-container-high group">
                <img
                  className="w-full h-full object-cover grayscale-[30%] contrast-110"
                  data-alt="Vue isométrique en maquette 3D miniature d'une ville technologique en panne de courant totale, avec des datacenters aux serveurs rouges en alerte surchauffée et un réacteur nucléaire miniature à l'arrêt, éclairage dramatique crépusculaire avec ombres portées et style low-poly précis."
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvPrFz4wyClAJufOhQPc-Ff0e9jz9sf7OY9-lo_vaozODo4_eDpUNtf2u9s3hzJBwgvO97mOEBozpt7Ad77cSyMsAVGVtzqRt-FDtKsRm4vwsBOt8o6Ikkf_CAU9JREvYSZB2q16mc2YjTJXZGFiw4LZCtQoSOVSx-2ZoDQh_EsQUqrv0L0mvrgebs4hytMLHPU1QgZimJzJq9t-0eXFXZK1kU6zr_dlqUA6hv7hYo5FP4n2rVKLsY"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/80 via-transparent to-transparent flex items-end p-space-sm">
                  <div className="flex items-center justify-between w-full text-on-primary">
                    <span className="font-label-sm text-label-sm tracking-wider uppercase bg-inverse-surface/70 px-2 py-0.5 rounded">
                      TERRITOIRE ALPHA // VUE SAT-ORBITALE
                    </span>
                    <span className="font-label-sm text-label-sm text-tertiary-fixed font-bold">
                      BLACKOUT TOTAL
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-space-md">
            <div className="bg-surface-container-lowest rounded-xl p-space-md sm:p-space-xl shadow-sm flex flex-col gap-space-lg">
              <div className="flex flex-col gap-space-xs">
                <div className="flex items-center gap-space-sm flex-wrap">
                  <span className="font-label-sm text-label-sm uppercase px-space-xs py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-bold tracking-wider">
                    DOCUMENTATION SCIENTIFIQUE // SECTION 8
                  </span>
                  <span className="font-label-sm text-label-sm text-outline">
                    SOURCES OUVERTES HOMOLOGUÉES
                  </span>
                </div>
                <h2 className="font-headline-xl text-headline-xl-mobile md:text-headline-xl text-on-surface font-bold tracking-tight">
                  ET DANS LE MONDE RÉEL ?
                </h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                  Dans{' '}
                  <strong className="text-primary font-semibold">FLOPSY</strong>
                  , vous avez choisi d'alimenter les machines plutôt que la
                  population. Sur Terre, l'expansion vertigineuse des modèles
                  génératifs pose exactement le même défi physique : un
                  télescopage entre finitude géologique et soif énergétique
                  illimitée.
                </p>
              </div>

              <div className="flex flex-col gap-space-md">
                <div className="bg-surface-container-low rounded-xl p-space-md flex flex-col sm:flex-row items-start gap-space-md transition-all hover:bg-surface-container">
                  <div className="w-12 h-12 rounded-lg bg-primary-container text-on-primary-container flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-[26px]">
                      bolt
                    </span>
                  </div>
                  <div className="flex flex-col gap-space-xs flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-label-sm text-label-sm uppercase font-semibold text-primary">
                        RÉSEAU &amp; PRODUCTION // SOURCE RTE - AIE
                      </span>
                      <span className="font-label-sm text-label-sm text-outline px-1.5 py-0.5 rounded bg-surface-container-high">
                        HORIZON 2030
                      </span>
                    </div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                      Le doublement énergétique global des centres de calcul
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant">
                      D'après l'Agence Internationale de l'Énergie (AIE), la
                      demande électrique mondiale liée aux datacenters et à l'IA
                      pourrait dépasser <strong>1 000 TWh dès 2026-2030</strong>
                      , soit l'équivalent de la consommation électrique
                      intégrale du{' '}
                      <strong className="text-on-surface font-semibold">
                        Japon
                      </strong>
                      .
                    </p>
                  </div>
                </div>

                <div className="bg-surface-container-low rounded-xl p-space-md flex flex-col sm:flex-row items-start gap-space-md transition-all hover:bg-surface-container">
                  <div className="w-12 h-12 rounded-lg bg-secondary text-on-secondary flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-[26px]">
                      diamond
                    </span>
                  </div>
                  <div className="flex flex-col gap-space-xs flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-label-sm text-label-sm uppercase font-semibold text-secondary">
                        RESSOURCES CRITIQUES // RMIS COMMISSION EUROPÉENNE
                      </span>
                      <span className="font-label-sm text-label-sm text-outline px-1.5 py-0.5 rounded bg-surface-container-high">
                        RECYCLAGE &lt; 2%
                      </span>
                    </div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                      Gallium, Germanium et Néodyme : L'angle mort matériel
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant">
                      Chaque accesseur accélérateur de calcul GPU mobilise des
                      métaux ultra-spécifiques dont l'extraction est polluante
                      et géographiquement concentrée. Le taux de recyclage réel
                      de ces micro-composants reste{' '}
                      <strong>inférieur à 2% au niveau mondial</strong>. Tout
                      remplacement de serveur consume irrémédiablement le
                      capital minier terrestre.
                    </p>
                  </div>
                </div>

                <div className="bg-surface-container-low rounded-xl p-space-md flex flex-col sm:flex-row items-start gap-space-md transition-all hover:bg-surface-container">
                  <div className="w-12 h-12 rounded-lg bg-tertiary-container text-on-tertiary-container flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-[26px]">
                      psychology
                    </span>
                  </div>
                  <div className="flex flex-col gap-space-xs flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-label-sm text-label-sm uppercase font-semibold text-tertiary">
                        INTENSITÉ PAR REQUÊTE // ADEME &amp; COMPAR:IA
                      </span>
                      <span className="font-label-sm text-label-sm text-outline px-1.5 py-0.5 rounded bg-surface-container-high">
                        ×10 À ×30 ÉNERGIE
                      </span>
                    </div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                      La disproportion flagrante des requêtes récréatives
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant">
                      La génération d'une seule image HD ou le traitement d'un
                      prompt conversationnel complexe consomme
                      <strong>10 à 30 fois plus d'énergie</strong> qu'une
                      requête de recherche documentaire indexée classique. La
                      massification d'usages automatisés futiles accélère
                      l'effet rebond thermique.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-surface-container-high/60 rounded-xl p-space-md sm:p-space-lg flex flex-col gap-space-sm">
                <div className="flex items-center gap-space-sm text-on-surface">
                  <span className="material-symbols-outlined text-primary text-[24px]">
                    lightbulb
                  </span>
                  <h4 className="font-headline-sm text-headline-sm font-bold">
                    Le piège de l'expansion infinie
                  </h4>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  « Construire toujours plus de centrales et de datacenters ne
                  résout pas la crise : sans régulation des usages superficiels,
                  sans sobriété architecturale logicielle et sans valorisation
                  fatale de la chaleur, le mur des limites planétaires s'impose
                  toujours. »
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-space-md pt-space-xs">
                <button
                  className="flex-1 bg-primary text-on-primary px-space-lg py-space-md rounded-lg font-label-lg text-label-lg font-bold tracking-wide uppercase shadow-md hover:bg-primary-container active:translate-y-0.5 transition-all flex items-center justify-center gap-space-sm"
                  id="btn-restart"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    replay
                  </span>
                  <span>Recommencer une partie</span>
                </button>
                <button
                  className="bg-surface-container text-on-surface px-space-lg py-space-md rounded-lg font-label-lg text-label-lg font-bold uppercase hover:bg-surface-container-high active:translate-y-0.5 transition-all flex items-center justify-center gap-space-sm"
                  id="btn-world-review"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    travel_explore
                  </span>
                  <span>Revoir la carte</span>
                </button>
                <button
                  aria-label="Retour au menu principal"
                  className="p-space-md rounded-lg bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all flex items-center justify-center"
                  id="btn-home"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[22px]">
                    home
                  </span>
                </button>
              </div>

              <div className="flex items-center gap-space-sm font-label-sm text-label-sm text-outline px-space-xs">
                <span className="material-symbols-outlined text-[16px] text-tertiary">
                  tips_and_updates
                </span>
                <span>
                  Conseil stratégique pour le prochain essai :{' '}
                  <strong className="text-on-surface font-semibold">
                    Brisez le pic de Phase 2 en rationnant les calculs
                    récréatifs dès le Cycle 10.
                  </strong>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div
          className="hidden fixed inset-0 z-50 bg-inverse-surface/60 backdrop-blur-sm flex items-center justify-center p-space-md"
          id="modal-map-review"
        >
          <div className="bg-surface-container-lowest max-w-2xl w-full rounded-xl p-space-lg shadow-xl flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-primary text-[24px]">
                  map
                </span>
                <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                  Instantané de la planète au Cycle 22
                </h3>
              </div>
              <button
                className="p-1 rounded hover:bg-surface-container text-on-surface-variant"
                id="btn-close-modal"
                type="button"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="w-full h-64 rounded-lg bg-surface-container-low overflow-hidden relative">
              <img
                className="w-full h-full object-cover"
                data-alt="Plan aérien détaillé d'un plateau industriel avec réacteurs refroidis, réseau électrique sectionné aux lignes tombées au sol et grappes de serveurs éteintes sur sol aride, style isométrique architectural propre."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_wPbLDIQhlyK_6Jn3fmZI0zuiYiuv1o_AW_NJ_DMplNGAmSktMMnjCwG30d88ezbQWQPfmfr0p7Fcq7NolnCb0b-b-jNDqOFq_wmJDz0aA6acHWmi3y_kSoKWXhPBJU_CPBJK6k_o1nuIOpoyie-TyBH0zJZ1xcEJibfxb8zDbtksllU-KaEHP9RUr_jkMy_t4KVuC3LXuSmim_r-nLwMbakPFi9AgIJaxy1avrlXc6j5GSY14pIH"
              />
              <div className="absolute bottom-2 left-2 bg-surface-container-lowest/90 px-2 py-1 rounded text-label-sm font-label-sm text-error font-semibold">
                Dernier état : Surchauffe thermale du réseau
              </div>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Vos 12 datacenters ont fonctionné à 98% de charge continue sans
              cycle de purge. Le gisement minier local est épuisé à 93%, privant
              l'urbanisation de tout composant d'entretien civil.
            </p>
            <div className="flex justify-end gap-space-sm pt-space-xs">
              <button
                className="px-space-md py-space-sm bg-surface-container rounded-lg font-label-md text-label-md font-semibold text-on-surface"
                id="btn-close-modal-alt"
                type="button"
              >
                Fermer
              </button>
              <button
                className="px-space-md py-space-sm bg-primary text-on-primary rounded-lg font-label-md text-label-md font-bold uppercase"
                type="button"
              >
                Relancer la simulation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

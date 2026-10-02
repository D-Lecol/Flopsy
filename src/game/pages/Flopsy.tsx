import { useState } from 'react';
import LogoWithTitle from '../../core/LogoWithTitle.js';
import Navigation from '../navigation/Navigation.js';
import { views } from '../navigation/Views.js';
import { Link } from 'react-router';

export default function Flopsy() {
  const [activeView, setActiveView] = useState(views[0]!);

  return (
    <div className="bg-surface font-body-md text-on-surface antialiased select-none">
      <header className="fixed top-0 inset-x-0 h-16 z-50 bg-surface/90 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="h-16 w-full px-gutter-desktop flex items-center justify-between gap-space-md">
          <div className="flex items-start gap-space-md">
            <LogoWithTitle />
          </div>
          <div className="flex items-center gap-space-md">
            <div className="flex items-center p-space-xs rounded bg-surface-container">
              <button
                className="px-space-sm py-space-xs rounded font-label-sm text-label-sm text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors flex items-center gap-space-xs"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">
                  pause
                </span>
                Pause
              </button>
              <button
                className="px-space-sm py-space-xs rounded font-label-sm text-label-sm bg-primary-container text-on-primary-container font-semibold flex items-center gap-space-xs"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">
                  play_arrow
                </span>
                1x
              </button>
              <button
                className="px-space-sm py-space-xs rounded font-label-sm text-label-sm text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors"
                type="button"
              >
                2x
              </button>
              <button
                className="px-space-sm py-space-xs rounded font-label-sm text-label-sm text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors"
                type="button"
              >
                5x
              </button>
              <span className="px-space-xs font-label-sm text-label-sm text-on-surface-variant opacity-60">
                [ESPACE]
              </span>
            </div>
            <div className="h-4 w-px bg-surface-container-high"></div>
            <div className="flex items-center gap-space-xs">
              <button
                className="w-8 h-8 rounded flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors"
                title="Audio"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">
                  volume_up
                </span>
              </button>
              <button
                className="w-8 h-8 rounded flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors"
                title="Paramètres"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">
                  settings
                </span>
              </button>
              <Link to={'/'}>
                <button
                  className="w-8 h-8 rounded flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors"
                  title="Quitter"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    logout
                  </span>
                </button>
              </Link>
            </div>
            <div className="h-4 w-px bg-surface-container-high"></div>
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-ScVgDyWA-nwHsEXI4-duHfZBViRuW7hcxO0yRDlxfrOFbumMOpXgHtYSLN-SAugtxtSha_FX-v2DsrrjjIJJurxy9mELRHvr397FbgHJ160VWUJRdm_qcACQmjrmQl_ibpR1bRvVUfI0nSv2_16vAVTwLsEndTY-JpjFWGjszG9tgooYg0d36CHGiqluU_fHwxgee0K7b5HP_Gqs6OnqNXtXpRReOz2uD-MUd5J7-l5F0Zd2hpq0"
            />
          </div>
        </div>
      </header>
      <aside className="fixed left-0 top-16 bottom-0 w-64 z-40 bg-surface-container-low shadow-[0_1px_8px_rgba(0,0,0,0.04)] flex flex-col justify-between p-space-md">
        <Navigation active={activeView} onSelect={setActiveView} />
        <div className="p-space-sm rounded bg-surface-container flex flex-col gap-space-xs">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              Stabilité Réseau
            </span>
            <span className="font-label-sm text-label-sm font-semibold text-secondary">
              99.8%
            </span>
          </div>
          <div className="h-1.5 w-full bg-surface-container-high rounded overflow-hidden">
            <div className="h-full bg-secondary w-[99.8%]"></div>
          </div>
          <div className="flex items-center justify-between pt-space-xs">
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              Capacité Calcul
            </span>
            <span className="font-label-sm text-label-sm font-semibold text-primary">
              4.2 EFLOPS
            </span>
          </div>
        </div>
      </aside>
      <div className="pl-64">
        <main className="relative pt-16 w-full min-h-screen bg-surface">
          {<activeView.component />}
        </main>
      </div>
    </div>
  );
}

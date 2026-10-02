import Navigation from '../navigation/Navigation.js';
import { useState } from 'react';
import { views } from '../navigation/Views.js';
import LogoWithTitle from '../../core/LogoWithTitle.js';

export default function Home() {
  const [activeView, setActiveView] = useState(views[0]!);

  return (
    <div className="bg-surface font-body-md text-on-surface antialiased min-h-screen flex flex-col justify-between selection:bg-primary-fixed selection:text-on-primary-fixed">
      <header className="fixed top-0 left-0 w-full z-50 bg-surface/85 backdrop-blur-md shadow-[0_2px_0_0_#dce3eb,0_4px_12px_rgba(30,37,43,0.06)]">
        <div className="h-16 w-full px-gutter-desktop flex items-center justify-between">
          <div className="flex items-center gap-space-md">
            <LogoWithTitle />
            <div className="h-4 w-px bg-surface-container-highest hidden sm:block"></div>
            <span className="font-label-sm text-label-sm uppercase tracking-wider px-space-xs py-0.5 rounded bg-surface-container-high text-on-surface-variant">
              v0.8.4-beta
            </span>
          </div>
          <Navigation active={activeView} onSelect={setActiveView} />
          <div className="flex items-center gap-space-sm">
            <div className="flex items-center bg-surface-container rounded p-0.5 shadow-[inset_0_1px_2px_rgba(30,37,43,0.08)]">
              <button
                aria-label="Basculer effets sonores"
                className="p-1.5 rounded hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors flex items-center justify-center"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">
                  volume_up
                </span>
              </button>
              <button
                aria-label="Basculer musique de fond"
                className="p-1.5 rounded hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors flex items-center justify-center"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">
                  music_note
                </span>
              </button>
            </div>
            <div className="flex items-center gap-space-xs px-space-sm py-1 bg-surface-container-low rounded text-on-surface-variant hover:text-on-surface">
              <span className="material-symbols-outlined text-[16px]">
                language
              </span>
              <span className="font-label-sm text-label-sm font-semibold">
                FR
              </span>
            </div>
            <button
              aria-label="Configuration système"
              className="p-2 rounded bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors flex items-center justify-center"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">
                tune
              </span>
            </button>
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-on-primary text-[18px]">
                person
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="w-full pt-16 bg-surface min-h-[calc(100vh-4rem)] flex-1 flex flex-col">
        <activeView.component />
      </main>

      <footer className="w-full bg-surface-container-low py-space-md">
        <div className="w-full px-gutter-desktop flex flex-col sm:flex-row items-center justify-between gap-space-sm font-label-sm text-label-sm text-on-surface-variant">
          <div className="flex items-center gap-space-md">
            <span>FLOPSY AUTOMATION &amp; ENERGY SIMULATION</span>
            <span className="hidden md:inline text-outline-variant">|</span>
            <span className="hidden md:inline">
              SECTEUR COMPUTING INDUSTRIEL
            </span>
          </div>
          <div className="flex items-center gap-space-lg">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-secondary inline-block animate-pulse"></span>
              RÉSEAU ÉNERGÉTIQUE CONNECTÉ
            </span>
            <span>© 2024 FLOPSY TYCOON</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

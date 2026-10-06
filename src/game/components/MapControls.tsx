import type { MapEngine } from '../iso/index.js';

export default function MapControls({ engine }: { engine: MapEngine | null }) {
  return (
    <div className="flex items-center gap-1 p-1 bg-surface-container-lowest/95 backdrop-blur-md rounded shadow-md">
      <button
        className="w-7 h-7 rounded hover:bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors"
        title="Rotation 90 Degrés"
        type="button"
        onClick={() => {
          engine?.rotateView(1);
        }}
      >
        <span className="material-symbols-outlined text-[18px]">
          rotate_left
        </span>
      </button>
      <button
        className="w-7 h-7 rounded hover:bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors"
        title="Rotation 90 Degrés"
        type="button"
        onClick={() => {
          engine?.rotateView(-1);
        }}
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
        <span className="material-symbols-outlined text-[16px]">grid_4x4</span>
        GRILLE
      </button>
      <div className="h-3 w-px bg-surface-container-high mx-0.5"></div>
      <button
        className="w-7 h-7 rounded hover:bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface"
        title="Zoom In"
        type="button"
      >
        <span className="material-symbols-outlined text-[18px]">add</span>
      </button>
      <button
        className="w-7 h-7 rounded hover:bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface"
        title="Zoom Out"
        type="button"
      >
        <span className="material-symbols-outlined text-[18px]">remove</span>
      </button>
    </div>
  );
}

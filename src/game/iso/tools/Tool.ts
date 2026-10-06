import type { BuildingType } from '../config.js';
import type { Footprint } from '../domain/Footprint.js';
import type { CellPoint } from '../domain/GridCell.js';
import type { Rotation } from '../domain/Rotation.js';

export type ToolId = BuildingType | 'demolish';
export type MarkerColor = 'allowed' | 'blocked' | 'demolish';

/** Position du curseur à l'écran, en pixels. */
export interface Pointer {
  x: number;
  y: number;
}

/** Ce que les outils peuvent afficher comme aperçu. */
export interface GhostView {
  showBuilding(
    type: BuildingType,
    rotation: Rotation,
    footprint: Footprint,
    groundHeight: number,
    allowed: boolean,
  ): void;
  showMarkerOnly(footprint: Footprint, groundHeight: number, color: MarkerColor): void;
  hide(): void;
}

/** Ce que vise le joueur : on peut l'afficher en aperçu, puis l'appliquer. */
export interface Aim {
  preview(ghost: GhostView): void;
  apply(): void;
}

/** Un outil transforme une position de curseur en visée. Nouvel outil = nouvelle classe. */
export interface Tool {
  aimAt(cursor: CellPoint, rotation: Rotation): Aim;
}

/** Retrouve le point de la grille sous le curseur. */
export interface CellPicker {
  cellUnder(pointer: Pointer): CellPoint | null;
}

import * as THREE from 'three';
import { MAP_SIZE } from '../config.js';
import type { Footprint } from '../domain/Footprint.js';
import { GridCell, type CellPoint } from '../domain/GridCell.js';

/**
 * Deux repères :
 *  - la GRILLE : le coin de la carte est (0, 0), elle va jusqu'à MAP_SIZE ;
 *  - le MONDE 3D : centré sur (0, 0), une case = une unité.
 */
const HALF_MAP = MAP_SIZE / 2;

export function worldFromCell(gridCoordinate: number): number {
  return gridCoordinate - HALF_MAP;
}

export function cellFromWorld(worldCoordinate: number): number {
  return worldCoordinate + HALF_MAP;
}

/** Point de la grille → position au sol (y = 0) dans le monde 3D. */
export function toWorld(point: CellPoint): THREE.Vector3 {
  return new THREE.Vector3(worldFromCell(point.column), 0, worldFromCell(point.row));
}

export function toGrid(position: THREE.Vector3): CellPoint {
  return { column: cellFromWorld(position.x), row: cellFromWorld(position.z) };
}

export function footprintCenter(footprint: Footprint): THREE.Vector3 {
  return toWorld(footprint.center());
}

export function cellCenter(cell: GridCell): THREE.Vector3 {
  return toWorld(cell.center());
}

export function cellAt(position: THREE.Vector3): GridCell {
  return GridCell.under(toGrid(position));
}

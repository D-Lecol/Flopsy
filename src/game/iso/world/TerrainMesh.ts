import * as THREE from 'three';
import { TERRAIN, type TerrainType } from '../config.js';
import type { GridCell } from '../domain/GridCell.js';
import { randomForCell } from '../util/random.js';
import { cellCenter } from './coordinates.js';

/** Ce qu'il faut savoir de la grille pour dessiner le sol. */
export interface TerrainSource {
  readonly size: number;
  forEachCell(visit: (cell: GridCell, terrain: TerrainType) => void): void;
}

const TILE_SHADE = { darkest: 0.93, range: 0.1, seed: 4 };
const ISLAND_BASE = { margin: 0.2, soil: 0.5, rock: 1.8, soilColor: 0xb5651d, rockColor: 0x6b4a35 };

/** Toutes les cases du sol dans un seul InstancedMesh (une seule draw call). */
export function createTerrainMesh(source: TerrainSource): THREE.InstancedMesh {
  const mesh = new THREE.InstancedMesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshLambertMaterial(),
    source.size * source.size,
  );
  let index = 0;
  source.forEachCell((cell, terrain) => {
    mesh.setMatrixAt(index, tileMatrix(cell, TERRAIN[terrain].height));
    mesh.setColorAt(index, tileColor(cell, terrain));
    index++;
  });
  mesh.receiveShadow = true;
  return mesh;
}

/** Une case est un cube posé au sol, étiré à la hauteur de son terrain. */
function tileMatrix(cell: GridCell, height: number): THREE.Matrix4 {
  const position = cellCenter(cell).setY(height / 2);
  const scale = new THREE.Vector3(1, height, 1);
  return new THREE.Matrix4().compose(position, new THREE.Quaternion(), scale);
}

/** Légère variation de teinte d'une case à l'autre, pour éviter un aplat. */
function tileColor(cell: GridCell, terrain: TerrainType): THREE.Color {
  const shade =
    TILE_SHADE.darkest + randomForCell(cell.column, cell.row, TILE_SHADE.seed) * TILE_SHADE.range;
  return new THREE.Color(TERRAIN[terrain].color).multiplyScalar(shade);
}

/** La tranche de terre puis de roche sous l'île. */
export function createIslandBase(size: number): THREE.Mesh[] {
  const side = size + ISLAND_BASE.margin;
  const layer = (thickness: number, top: number, color: number) => {
    const geometry = new THREE.BoxGeometry(side, thickness, side);
    const mesh = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color }));
    mesh.position.y = top - thickness / 2;
    return mesh;
  };
  return [
    layer(ISLAND_BASE.soil, 0, ISLAND_BASE.soilColor),
    layer(ISLAND_BASE.rock, -ISLAND_BASE.soil, ISLAND_BASE.rockColor),
  ];
}

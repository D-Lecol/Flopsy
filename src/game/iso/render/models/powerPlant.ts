import type * as THREE from 'three';
import { BatchBuilder } from '../BatchBuilder.js';
import { PAD_THICKNESS, PALETTE } from './palette.js';

const FLOOR = PAD_THICKNESS;

interface CoolingTower {
  x: number;
  z: number;
  topRadius: number;
  bottomRadius: number;
  height: number;
}

const TOWERS: CoolingTower[] = [
  { x: -0.8, z: -0.7, topRadius: 0.34, bottomRadius: 0.55, height: 1.6 },
  { x: 0.15, z: -0.85, topRadius: 0.28, bottomRadius: 0.46, height: 1.3 },
];

/** Centrale SMR : empreinte 3×3, deux tours de refroidissement et un dôme. */
export function createPowerPlant(): THREE.Mesh {
  const model = new BatchBuilder();
  model.box(0, 0, 0, 2.9, PAD_THICKNESS, 2.9, PALETTE.pad);
  TOWERS.forEach((tower) => addCoolingTower(model, tower));
  model.box(0.7, FLOOR, 0.65, 1.3, 0.6, 1.2, PALETTE.reactorHall);
  model.dome(0.7, FLOOR + 0.6, 0.65, 0.5, PALETTE.dome);
  model.box(-0.8, FLOOR, 0.7, 0.9, 0.45, 1.1, PALETTE.turbineHall);
  model.box(-0.8, FLOOR + 0.45, 0.7, 0.94, 0.05, 1.14, PALETTE.roof);
  return model.build();
}

/** Tour évasée, anneau orange au sommet et nuage de vapeur. */
function addCoolingTower(model: BatchBuilder, tower: CoolingTower): void {
  const { x, z, topRadius, bottomRadius, height } = tower;
  const top = FLOOR + height;
  model.cyl(x, FLOOR, z, topRadius, bottomRadius, height, PALETTE.concrete, 18);
  model.cyl(x, top, z, topRadius + 0.01, topRadius + 0.01, 0.06, PALETTE.roof, 18);
  model.sphere(x, top + 0.02, z, topRadius * 0.88, PALETTE.steam);
}

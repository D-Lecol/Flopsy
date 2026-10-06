import type * as THREE from 'three';
import { BatchBuilder } from '../BatchBuilder.js';
import { PAD_THICKNESS, PALETTE } from './palette.js';

const FLOOR = PAD_THICKNESS;
const WINDOW_BAND = 0.07;
const FAN = { radius: 0.26, height: 0.08 };

/** Datacenter Edge T1 : empreinte 2×2, un hall et ses refroidisseurs. */
export function createEdgeDatacenter(): THREE.Mesh {
  const model = new BatchBuilder();
  model.box(0, 0, 0, 1.9, PAD_THICKNESS, 1.9, PALETTE.pad);
  addHall(model, { x: -0.2, width: 1.3, height: 0.85, depth: 1.5, windows: PALETTE.windowsBlue });
  model.box(0.72, FLOOR, 0, 0.42, 0.4, 1.4, PALETTE.chiller);
  model.cyl(0.72, 0.48, -0.35, 0.15, 0.15, 0.06, PALETTE.fan);
  model.cyl(0.72, 0.48, 0.35, 0.15, 0.15, 0.06, PALETTE.fan);
  return model.build();
}

/** Datacenter Modulaire T2 : empreinte 3×2, deux halls reliés. */
export function createModularDatacenter(): THREE.Mesh {
  const model = new BatchBuilder();
  model.box(0, 0, 0, 2.9, PAD_THICKNESS, 1.9, PALETTE.pad);
  for (const x of [-0.78, 0.78]) {
    addHall(model, { x, width: 1.2, height: 1.05, depth: 1.5, windows: PALETTE.windowsLightBlue });
  }
  model.box(0, 0.35, 0, 0.5, 0.18, 0.28, PALETTE.pipe);
  model.box(0, FLOOR, 0.82, 1.2, 0.28, 0.14, PALETTE.chiller);
  return model.build();
}

interface HallShape {
  x: number;
  width: number;
  height: number;
  depth: number;
  windows: number;
}

/** Un hall de serveurs : murs, bandes vitrées, toit orange et deux ventilateurs. */
function addHall(model: BatchBuilder, hall: HallShape): void {
  const { x, width, height, depth, windows } = hall;
  model.box(x, FLOOR, 0, width, height, depth, PALETTE.wall);
  for (const level of [0.25, 0.5, 0.75]) {
    model.box(x, FLOOR + height * level, 0, width + 0.04, WINDOW_BAND, depth + 0.04, windows);
  }
  const roofTop = FLOOR + height;
  model.box(x, roofTop, 0, width + 0.06, WINDOW_BAND, depth + 0.06, PALETTE.roof);
  model.cyl(
    x - width * 0.2,
    roofTop + WINDOW_BAND,
    -0.35,
    FAN.radius,
    FAN.radius,
    FAN.height,
    PALETTE.fan,
  );
  model.cyl(
    x + width * 0.2,
    roofTop + WINDOW_BAND,
    0.35,
    FAN.radius,
    FAN.radius,
    FAN.height,
    PALETTE.fan,
  );
}

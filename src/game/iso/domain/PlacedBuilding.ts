import type { BuildingType } from '../config.js';
import type { Footprint } from './Footprint.js';
import type { Rotation } from './Rotation.js';

export type BuildingId = number;

/** Un bâtiment posé. Son empreinte tient déjà compte de la rotation. */
export interface PlacedBuilding {
  readonly id: BuildingId;
  readonly type: BuildingType;
  readonly footprint: Footprint;
  readonly rotation: Rotation;
}

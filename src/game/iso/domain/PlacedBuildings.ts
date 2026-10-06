import { BUILDINGS, type BuildingType } from '../config.js';
import { Footprint } from './Footprint.js';
import type { GridCell } from './GridCell.js';
import type { BuildingId, PlacedBuilding } from './PlacedBuilding.js';
import type { Rotation } from './Rotation.js';

/** Lecture seule de la liste des bâtiments. */
export interface BuildingDirectory {
  all(): readonly PlacedBuilding[];
  find(id: BuildingId): PlacedBuilding | undefined;
}

export interface Totals {
  computePflops: number;
  powerProducedMw: number;
  powerNeededMw: number;
}

const NO_TOTALS: Totals = { computePflops: 0, powerProducedMw: 0, powerNeededMw: 0 };

/** Collection des bâtiments posés : création, retrait et totaux. */
export class PlacedBuildings implements BuildingDirectory {
  private readonly buildings: PlacedBuilding[] = [];
  private nextId: BuildingId = 1;

  create(type: BuildingType, corner: GridCell, rotation: Rotation): PlacedBuilding {
    const size = rotation.apply(BUILDINGS[type].size);
    const building = { id: this.nextId++, type, rotation, footprint: Footprint.at(corner, size) };
    this.buildings.push(building);
    return building;
  }

  remove(id: BuildingId): PlacedBuilding | undefined {
    const index = this.buildings.findIndex((building) => building.id === id);
    if (index < 0) return undefined;
    return this.buildings.splice(index, 1)[0];
  }

  find(id: BuildingId): PlacedBuilding | undefined {
    return this.buildings.find((building) => building.id === id);
  }

  all(): readonly PlacedBuilding[] {
    return this.buildings;
  }

  totals(): Totals {
    return this.buildings.reduce(addToTotals, NO_TOTALS);
  }
}

function addToTotals(totals: Totals, building: PlacedBuilding): Totals {
  const { computePflops, powerMw } = BUILDINGS[building.type];
  return {
    computePflops: totals.computePflops + computePflops,
    powerProducedMw: totals.powerProducedMw + Math.max(0, powerMw),
    powerNeededMw: totals.powerNeededMw + Math.max(0, -powerMw),
  };
}

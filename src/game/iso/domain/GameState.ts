import { BUILDINGS, RARE_EARTHS_AT_START_TONNES, type BuildingType } from '../config.js';
import { Emitter } from '../util/Emitter.js';
import type { Footprint } from './Footprint.js';
import type { GridCell } from './GridCell.js';
import type { BuildingId, PlacedBuilding } from './PlacedBuilding.js';
import { PlacedBuildings, type BuildingDirectory } from './PlacedBuildings.js';
import { RareEarthStock } from './RareEarthStock.js';
import { Rotation } from './Rotation.js';
import { statsFrom, type Stats } from './Stats.js';

export type RefusalReason = 'not-enough-rare-earths' | 'blocked';

export interface GameEvents {
  changed: Stats;
  built: { building: PlacedBuilding; isStartingBuilding: boolean };
  demolished: { building: PlacedBuilding };
  refused: { type: BuildingType; footprint: Footprint; reason: RefusalReason };
}

/** Ce dont un outil de construction a besoin. */
export interface ConstructionSite {
  canAfford(type: BuildingType): boolean;
  construct(type: BuildingType, corner: GridCell, rotation: Rotation): PlacedBuilding;
  refuse(type: BuildingType, footprint: Footprint, reason: RefusalReason): void;
}

/** Ce dont un outil de démolition a besoin. */
export interface DemolitionSite {
  buildingWithId(id: BuildingId): PlacedBuilding | undefined;
  demolish(id: BuildingId): void;
}

/** Source de vérité du jeu, sans Three.js ni React. */
export class GameState implements ConstructionSite, DemolitionSite {
  readonly events = new Emitter<GameEvents>();
  private readonly buildings = new PlacedBuildings();
  private readonly rareEarths = new RareEarthStock(RARE_EARTHS_AT_START_TONNES);
  private currentStats: Stats;

  constructor() {
    this.currentStats = this.computeStats();
  }

  /** Nouvel objet à chaque changement (compatible useSyncExternalStore). */
  stats(): Stats {
    return this.currentStats;
  }

  directory(): BuildingDirectory {
    return this.buildings;
  }

  buildingWithId(id: BuildingId): PlacedBuilding | undefined {
    return this.buildings.find(id);
  }

  canAfford(type: BuildingType): boolean {
    return this.rareEarths.canPay(BUILDINGS[type].rareEarthCost);
  }

  /** Bâtiment de départ : gratuit, et signalé comme tel aux observateurs. */
  placeStartingBuilding(type: BuildingType, corner: GridCell): PlacedBuilding {
    return this.place(type, corner, Rotation.NONE, true);
  }

  construct(type: BuildingType, corner: GridCell, rotation: Rotation): PlacedBuilding {
    this.rareEarths.pay(BUILDINGS[type].rareEarthCost);
    return this.place(type, corner, rotation, false);
  }

  demolish(id: BuildingId): void {
    const building = this.buildings.remove(id);
    if (!building) return;
    this.publishChange();
    this.events.emit('demolished', { building });
  }

  refuse(type: BuildingType, footprint: Footprint, reason: RefusalReason): void {
    this.events.emit('refused', { type, footprint, reason });
  }

  subscribe(listener: () => void): () => void {
    return this.events.on('changed', listener);
  }

  private place(
    type: BuildingType,
    corner: GridCell,
    rotation: Rotation,
    isStartingBuilding: boolean,
  ): PlacedBuilding {
    const building = this.buildings.create(type, corner, rotation);
    this.publishChange();
    this.events.emit('built', { building, isStartingBuilding });
    return building;
  }

  private publishChange(): void {
    this.currentStats = this.computeStats();
    this.events.emit('changed', this.currentStats);
  }

  private computeStats(): Stats {
    return statsFrom(this.buildings.totals(), this.rareEarths.remaining());
  }
}

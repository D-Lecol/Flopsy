import * as THREE from 'three';
import { TERRAIN, type TerrainType } from '../config.js';
import type { BuildingObserver, SceneLayer } from '../contracts.js';
import type { Footprint } from '../domain/Footprint.js';
import { GridCell } from '../domain/GridCell.js';
import type { BuildingId, PlacedBuilding } from '../domain/PlacedBuilding.js';
import { range } from '../util/math.js';
import type { TerrainGenerator } from './TerrainGenerator.js';
import { createIslandBase, createTerrainMesh, type TerrainSource } from './TerrainMesh.js';

const OUTSIDE_THE_MAP: TerrainType = 'water';

export interface GroundHeights {
  groundHeightAt(cell: GridCell): number;
  groundHeightUnder(footprint: Footprint): number;
}

export interface OccupancyMap {
  contains(cell: GridCell): boolean;
  occupantAt(cell: GridCell): BuildingId | null;
  isOccupied(cell: GridCell): boolean;
}

export interface BuildableArea extends GroundHeights {
  canBuildOn(footprint: Footprint): boolean;
}

/** La grille : terrain de chaque case, cases occupées, et mesh du sol. */
export class World
  implements SceneLayer, BuildingObserver, TerrainSource, OccupancyMap, BuildableArea
{
  readonly group = new THREE.Group();
  private readonly terrain = new Map<string, TerrainType>();
  private readonly occupants = new Map<string, BuildingId>();

  constructor(
    readonly size: number,
    generator: TerrainGenerator,
  ) {
    this.allCells().forEach((cell) => this.terrain.set(cell.key(), generator.terrainAt(cell)));
    this.group.add(createTerrainMesh(this), ...createIslandBase(size));
  }

  forEachCell(visit: (cell: GridCell, terrain: TerrainType) => void): void {
    this.allCells().forEach((cell) => visit(cell, this.terrainAt(cell)));
  }

  contains({ column, row }: GridCell): boolean {
    return Math.min(column, row) >= 0 && Math.max(column, row) < this.size;
  }

  /** Hors de la carte, c'est la mer. */
  terrainAt(cell: GridCell): TerrainType {
    return this.terrain.get(cell.key()) ?? OUTSIDE_THE_MAP;
  }

  groundHeightAt(cell: GridCell): number {
    return TERRAIN[this.terrainAt(cell)].height;
  }

  /** La hauteur de la case la plus haute sous l'empreinte. */
  groundHeightUnder(footprint: Footprint): number {
    return Math.max(...footprint.cells().map((cell) => this.groundHeightAt(cell)));
  }

  canBuildOn(footprint: Footprint): boolean {
    return footprint.cells().every((cell) => this.isBuildable(cell));
  }

  occupantAt(cell: GridCell): BuildingId | null {
    return this.occupants.get(cell.key()) ?? null;
  }

  isOccupied(cell: GridCell): boolean {
    return this.occupantAt(cell) !== null;
  }

  onBuilt(building: PlacedBuilding): void {
    building.footprint.cells().forEach((cell) => this.occupants.set(cell.key(), building.id));
  }

  onDemolished(building: PlacedBuilding): void {
    building.footprint.cells().forEach((cell) => this.occupants.delete(cell.key()));
  }

  private isBuildable(cell: GridCell): boolean {
    if (!this.contains(cell) || this.isOccupied(cell)) return false;
    return TERRAIN[this.terrainAt(cell)].buildable;
  }

  private allCells(): GridCell[] {
    return range(this.size).flatMap((column) =>
      range(this.size).map((row) => new GridCell(column, row)),
    );
  }
}

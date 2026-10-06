import * as THREE from 'three';
import type { TerrainType } from '../../config.js';
import type { BuildingObserver, SceneLayer } from '../../contracts.js';
import type { GridCell } from '../../domain/GridCell.js';
import type { PlacedBuilding } from '../../domain/PlacedBuilding.js';
import { type Random, seededRandom } from '../../util/random.js';
import { DecorBatch } from './DecorBatch.js';
import { DECORATORS, type TerrainDecorator } from './decorators.js';
import { Spot } from './Spot.js';

/** Ce qu'il faut savoir de la grille pour la décorer. */
export interface DecorableArea {
  readonly size: number;
  forEachCell(visit: (cell: GridCell, terrain: TerrainType) => void): void;
  groundHeightAt(cell: GridCell): number;
}

const SEED = 42;
const NEAR_EDGE_BAND = 3; // plus d'arbres sur les bords de l'île

/** Herbe, arbres, fleurs, rochers et cristaux. Disparaît sous les bâtiments posés. */
export class Decor implements SceneLayer, BuildingObserver {
  readonly group = new THREE.Group();
  private readonly batch = new DecorBatch();

  constructor(
    private readonly decorators: Record<
      TerrainType,
      TerrainDecorator
    > = DECORATORS,
  ) {}

  populate(area: DecorableArea, random: Random = seededRandom(SEED)): void {
    area.forEachCell((cell, terrain) => {
      const spot = new Spot(
        cell,
        area.groundHeightAt(cell),
        isNearEdge(cell, area.size),
        random,
      );
      this.decorators[terrain].decorate(spot, this.batch);
    });
    this.batch.createMeshes().forEach((mesh) => this.group.add(mesh));
  }

  onBuilt(building: PlacedBuilding): void {
    this.batch.hide(building.footprint.cells());
  }

  /** Le décor ne repousse pas après une démolition. */
  onDemolished(): void {}
}

function isNearEdge({ column, row }: GridCell, size: number): boolean {
  return (
    Math.min(column, row) < NEAR_EDGE_BAND ||
    Math.max(column, row) >= size - NEAR_EDGE_BAND
  );
}

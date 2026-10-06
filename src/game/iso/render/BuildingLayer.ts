import * as THREE from 'three';
import type { BuildingObserver, FrameTime, FrameUpdatable, SceneLayer } from '../contracts.js';
import type { BuildingId, PlacedBuilding } from '../domain/PlacedBuilding.js';
import { footprintCenter } from '../world/coordinates.js';
import type { GroundHeights } from '../world/World.js';
import type { ModelCatalog } from './models/ModelCatalog.js';
import { PopInAnimations } from './PopInAnimations.js';

/** Les modèles 3D des bâtiments posés. */
export class BuildingLayer implements SceneLayer, BuildingObserver, FrameUpdatable {
  readonly group = new THREE.Group();
  private readonly modelsById = new Map<BuildingId, THREE.Object3D>();
  private readonly animations = new PopInAnimations();

  constructor(
    private readonly catalog: ModelCatalog,
    private readonly ground: GroundHeights,
  ) {}

  onBuilt(building: PlacedBuilding, isStartingBuilding: boolean): void {
    const model = this.createModel(building);
    this.group.add(model);
    this.modelsById.set(building.id, model);
    if (!isStartingBuilding) this.animations.start(model);
  }

  onDemolished(building: PlacedBuilding): void {
    const model = this.modelsById.get(building.id);
    if (model) this.group.remove(model);
    this.modelsById.delete(building.id);
  }

  update(frame: FrameTime): void {
    this.animations.advance(frame.seconds);
  }

  /** Le modèle tourne sur lui-même, puis est posé au centre de son empreinte. */
  private createModel(building: PlacedBuilding): THREE.Group {
    const model = this.catalog.create(building.type);
    model.rotation.y = building.rotation.radians();
    const anchor = new THREE.Group();
    anchor.add(model);
    const center = footprintCenter(building.footprint);
    anchor.position.set(center.x, this.ground.groundHeightUnder(building.footprint), center.z);
    return anchor;
  }
}

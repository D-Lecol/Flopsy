import * as THREE from 'three';
import type { BuildingType } from '../../config.js';
import { createCity } from './city.js';
import { createEdgeDatacenter, createModularDatacenter } from './datacenters.js';
import { createPowerPlant } from './powerPlant.js';

/** Fabrique le modèle 3D d'un type de bâtiment, centré sur son empreinte, posé à y = 0. */
export interface ModelCatalog {
  create(type: BuildingType): THREE.Group;
}

const BUILDERS: Record<BuildingType, () => THREE.Object3D> = {
  edgeDatacenter: createEdgeDatacenter,
  modularDatacenter: createModularDatacenter,
  smrPlant: createPowerPlant,
  city: createCity,
};

export class BuildingModelCatalog implements ModelCatalog {
  constructor(private readonly builders: Record<BuildingType, () => THREE.Object3D> = BUILDERS) {}

  create(type: BuildingType): THREE.Group {
    const group = new THREE.Group();
    group.add(this.builders[type]());
    return group;
  }
}

import * as THREE from 'three';
import { describe, expect, it } from 'vitest';
import { BUILDINGS, type BuildingType } from '../../config.js';
import { BuildingModelCatalog } from './ModelCatalog.js';

const ALL_TYPES = Object.keys(BUILDINGS) as BuildingType[];

describe('BuildingModelCatalog', () => {
  it.each(ALL_TYPES)('fabrique un modèle de %s qui tient dans son empreinte', (type) => {
    const size = new THREE.Box3()
      .setFromObject(new BuildingModelCatalog().create(type))
      .getSize(new THREE.Vector3());
    expect(size.x).toBeLessThanOrEqual(BUILDINGS[type].size.width);
    expect(size.z).toBeLessThanOrEqual(BUILDINGS[type].size.depth);
  });

  it.each(ALL_TYPES)('pose le modèle de %s sur le sol', (type) => {
    const bounds = new THREE.Box3().setFromObject(new BuildingModelCatalog().create(type));
    expect(bounds.min.y).toBeCloseTo(0);
  });

  it('fabrique un nouveau modèle à chaque demande', () => {
    const catalog = new BuildingModelCatalog();
    expect(catalog.create('city')).not.toBe(catalog.create('city'));
  });

  it('utilise les fabricants qu’on lui donne', () => {
    const marker = new THREE.Object3D();
    const builders = Object.fromEntries(ALL_TYPES.map((type) => [type, () => marker])) as Record<
      BuildingType,
      () => THREE.Object3D
    >;
    expect(new BuildingModelCatalog(builders).create('smrPlant').children).toContain(marker);
  });

  it('produit toujours la même ville', () => {
    const vertices = () => {
      const mesh = new BuildingModelCatalog().create('city').children[0] as THREE.Mesh;
      return mesh.geometry.getAttribute('position').count;
    };
    expect(vertices()).toBe(vertices());
  });
});

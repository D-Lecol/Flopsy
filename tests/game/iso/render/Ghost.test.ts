import * as THREE from 'three';
import { describe, expect, it } from 'vitest';
import { Footprint } from '../../../../src/game/iso/domain/Footprint.js';
import { Rotation } from '../../../../src/game/iso/domain/Rotation.js';
import { at, BoxCatalog } from '../testing/fakes.js';
import { Ghost, MARKER_COLORS } from '../../../../src/game/iso/render/Ghost.js';

const footprint = new Footprint(3, 4, 2, 3);
const markerOf = (ghost: Ghost) =>
  ghost.group.children[0] as THREE.Mesh<
    THREE.BufferGeometry,
    THREE.MeshBasicMaterial
  >;
const modelsOf = (ghost: Ghost) => ghost.group.children.slice(1);

describe('Ghost', () => {
  it('est caché au départ', () => {
    expect(new Ghost(new BoxCatalog()).group.visible).toBe(false);
  });

  it('montre le bâtiment et une zone de la taille de son empreinte', () => {
    const ghost = new Ghost(new BoxCatalog());
    ghost.showBuilding(
      'modularDatacenter',
      Rotation.NONE,
      footprint,
      0.4,
      true,
    );
    expect(ghost.group.visible).toBe(true);
    expect(at(modelsOf(ghost), 0).visible).toBe(true);
    expect([markerOf(ghost).scale.x, markerOf(ghost).scale.z]).toEqual([2, 3]);
  });

  it('colore la zone en vert si la pose est possible, en rouge sinon', () => {
    const ghost = new Ghost(new BoxCatalog());
    ghost.showBuilding('smrPlant', Rotation.NONE, footprint, 0.4, true);
    expect(markerOf(ghost).material.color.getHex()).toBe(
      new THREE.Color(MARKER_COLORS.allowed).getHex(),
    );
    ghost.showBuilding('smrPlant', Rotation.NONE, footprint, 0.4, false);
    expect(markerOf(ghost).material.color.getHex()).toBe(
      new THREE.Color(MARKER_COLORS.blocked).getHex(),
    );
  });

  it('tourne le modèle selon la rotation', () => {
    const ghost = new Ghost(new BoxCatalog());
    ghost.showBuilding(
      'smrPlant',
      Rotation.ofQuarterTurns(2),
      footprint,
      0.4,
      true,
    );
    expect(at(modelsOf(ghost), 0).rotation.y).toBeCloseTo(Math.PI);
  });

  it('réutilise le même modèle pour un même type', () => {
    const catalog = new BoxCatalog();
    const ghost = new Ghost(catalog);
    ghost.showBuilding('smrPlant', Rotation.NONE, footprint, 0.4, true);
    ghost.showBuilding('smrPlant', Rotation.NONE, footprint, 0.4, true);
    expect(catalog.created).toEqual(['smrPlant']);
  });

  it("n'affiche que le modèle du type demandé", () => {
    const ghost = new Ghost(new BoxCatalog());
    ghost.showBuilding('smrPlant', Rotation.NONE, footprint, 0.4, true);
    ghost.showBuilding('edgeDatacenter', Rotation.NONE, footprint, 0.4, true);
    expect(modelsOf(ghost).map((model) => model.visible)).toEqual([
      false,
      true,
    ]);
  });

  it('peut ne montrer que la zone, sans modèle', () => {
    const ghost = new Ghost(new BoxCatalog());
    ghost.showBuilding('smrPlant', Rotation.NONE, footprint, 0.4, true);
    ghost.showMarkerOnly(footprint, 0.4, 'demolish');
    expect(at(modelsOf(ghost), 0).visible).toBe(false);
    expect(markerOf(ghost).material.color.getHex()).toBe(
      new THREE.Color(MARKER_COLORS.demolish).getHex(),
    );
  });

  it('se cache sur demande', () => {
    const ghost = new Ghost(new BoxCatalog());
    ghost.showMarkerOnly(footprint, 0.4, 'blocked');
    ghost.hide();
    expect(ghost.group.visible).toBe(false);
  });
});

import * as THREE from 'three';
import { describe, expect, it } from 'vitest';
import { BatchBuilder } from '../../../../src/game/iso/render/BatchBuilder.js';

const boundsOf = (mesh: THREE.Mesh) => new THREE.Box3().setFromObject(mesh);

describe('BatchBuilder', () => {
  it('fusionne toutes les formes en un seul mesh', () => {
    const mesh = new BatchBuilder()
      .box(0, 0, 0, 1, 1, 1, 0xff0000)
      .cyl(2, 0, 0, 0.5, 0.5, 1, 0x00ff00)
      .build();
    expect(mesh).toBeInstanceOf(THREE.Mesh);
    expect(mesh.geometry.getAttribute('position').count).toBeGreaterThan(24);
  });

  it('pose le bas de la forme à la hauteur donnée', () => {
    const mesh = new BatchBuilder().box(0, 2, 0, 1, 3, 1, 0xffffff).build();
    expect(boundsOf(mesh).min.y).toBeCloseTo(2);
    expect(boundsOf(mesh).max.y).toBeCloseTo(5);
  });

  it('colore chaque forme avec sa couleur', () => {
    const mesh = new BatchBuilder().box(0, 0, 0, 1, 1, 1, 0xff0000).build();
    const colors = mesh.geometry.getAttribute('color');
    expect([colors.getX(0), colors.getY(0), colors.getZ(0)]).toEqual([1, 0, 0]);
  });

  it('projette et reçoit des ombres', () => {
    const mesh = new BatchBuilder().sphere(0, 0, 0, 1, 0xffffff).build();
    expect(mesh.castShadow && mesh.receiveShadow).toBe(true);
  });

  it('pose une coupole sur sa base', () => {
    const mesh = new BatchBuilder()
      .dome(0, 1, 0, 0.5, 0xffffff)
      .cone(2, 0, 0, 0.3, 1, 0x000000)
      .build();
    expect(boundsOf(mesh).min.y).toBeCloseTo(0);
    expect(boundsOf(mesh).max.y).toBeCloseTo(1.5);
  });
});

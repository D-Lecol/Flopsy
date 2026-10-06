import * as THREE from 'three';
import { describe, expect, it, vi } from 'vitest';
import type { TerrainType } from '../../config.js';
import { aBuilding, isHidden, uniformWorld } from '../../testing/fakes.js';
import { Decor } from './Decor.js';
import { DECORATORS, type TerrainDecorator } from './decorators.js';

describe('Decor', () => {
  it('décore chaque case avec le décorateur de son terrain', () => {
    const grass: TerrainDecorator = { decorate: vi.fn() };
    const decorators: Record<TerrainType, TerrainDecorator> = {
      ...DECORATORS,
      grass,
    };
    new Decor(decorators).populate(uniformWorld(3, 'grass'));
    expect(grass.decorate).toHaveBeenCalledTimes(9);
  });

  it('prévient le décorateur quand la case est près du bord', () => {
    const decorate = vi.fn();
    new Decor({ ...DECORATORS, grass: { decorate } }).populate(
      uniformWorld(10, 'grass'),
    );
    const edgeFlags = decorate.mock.calls.map(([spot]) => spot.isNearEdge);
    expect(edgeFlags).toContain(true);
    expect(edgeFlags).toContain(false);
  });

  it('ajoute ses meshes à la scène', () => {
    const decor = new Decor();
    decor.populate(uniformWorld(4, 'grass'));
    expect(decor.group.children.length).toBeGreaterThan(0);
  });

  it('cache le décor sous un bâtiment construit', () => {
    const decor = new Decor();
    decor.populate(uniformWorld(2, 'grass'));
    decor.onBuilt(aBuilding('edgeDatacenter', 0, 0));
    const meshes = decor.group.children as THREE.InstancedMesh[];
    const everyInstanceHidden = meshes.every((mesh) =>
      Array.from({ length: mesh.count }, (_, index) =>
        isHidden(mesh, index),
      ).every(Boolean),
    );
    expect(everyInstanceHidden).toBe(true);
  });

  it('ne fait rien à la démolition (le décor ne repousse pas)', () => {
    const decor = new Decor();
    expect(() => decor.onDemolished()).not.toThrow();
  });

  it("ne signale aucune erreur quand il n'y a rien à décorer", () => {
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    new Decor().populate(uniformWorld(3, 'water'));
    expect(consoleError).not.toHaveBeenCalled();
    consoleError.mockRestore();
  });
});

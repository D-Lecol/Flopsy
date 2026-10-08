import * as THREE from 'three';
import { describe, expect, it } from 'vitest';
import { GridCell } from '../../../../../src/game/iso/domain/GridCell.js';
import { at, fixedRandom, isHidden } from '../../testing/fakes.js';
import { DecorBatch } from '../../../../../src/game/iso/world/decor/DecorBatch.js';
import { Spot } from '../../../../../src/game/iso/world/decor/Spot.js';

const spotAt = (column: number, row: number) =>
  new Spot(new GridCell(column, row), 0.4, false, fixedRandom(0.5));
const look = { color: 0x00ff00, scale: 1 };

describe('DecorBatch', () => {
  it('crée un mesh par sorte de décor', () => {
    const batch = new DecorBatch();
    batch.place('tuft', spotAt(0, 0), look);
    batch.place('rock', spotAt(0, 0), look);
    batch.place('tuft', spotAt(1, 0), look);
    const meshes = batch.createMeshes();
    expect(meshes).toHaveLength(2);
    expect(meshes.map((mesh) => mesh.count).sort()).toEqual([1, 2]);
  });

  it('ne crée rien quand rien n’a été posé', () => {
    expect(new DecorBatch().createMeshes()).toEqual([]);
  });

  it('pose le décor au niveau du sol, plus son élévation', () => {
    const batch = new DecorBatch();
    batch.place('crown', spotAt(0, 0), { ...look, lift: 0.3 });
    const mesh = at(batch.createMeshes(), 0);
    const matrix = new THREE.Matrix4();
    mesh.getMatrixAt(0, matrix);
    expect(new THREE.Vector3().setFromMatrixPosition(matrix).y).toBeCloseTo(
      0.7,
    );
  });

  it('cache seulement le décor des cases demandées', () => {
    const batch = new DecorBatch();
    batch.place('tuft', spotAt(0, 0), look);
    batch.place('tuft', spotAt(1, 0), look);
    const mesh = at(batch.createMeshes(), 0);
    batch.hide([new GridCell(0, 0)]);
    expect(isHidden(mesh, 0)).toBe(true);
    expect(isHidden(mesh, 1)).toBe(false);
  });
});

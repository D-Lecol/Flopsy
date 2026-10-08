import * as THREE from 'three';
import { describe, expect, it } from 'vitest';
import { MAP_SIZE } from '../../../../src/game/iso/config.js';
import { Footprint } from '../../../../src/game/iso/domain/Footprint.js';
import { GridCell } from '../../../../src/game/iso/domain/GridCell.js';
import {
  cellAt,
  cellCenter,
  cellFromWorld,
  footprintCenter,
  toGrid,
  toWorld,
  worldFromCell,
} from '../../../../src/game/iso/world/coordinates.js';

const half = MAP_SIZE / 2;

describe('coordinates', () => {
  it('place le coin de la grille à -moitié de la carte dans le monde', () => {
    expect(worldFromCell(0)).toBe(-half);
  });

  it('fait correspondre le milieu de la grille au centre du monde', () => {
    expect(worldFromCell(half)).toBe(0);
  });

  it('fait des allers-retours sans perte', () => {
    expect(cellFromWorld(worldFromCell(7.25))).toBe(7.25);
    expect(toGrid(toWorld({ column: 3, row: 9 }))).toEqual({
      column: 3,
      row: 9,
    });
  });

  it('pose les points du monde au niveau du sol', () => {
    expect(toWorld({ column: 1, row: 2 }).y).toBe(0);
  });

  it("trouve le centre d'une case et d'une empreinte", () => {
    expect(cellCenter(new GridCell(half, half))).toEqual(
      new THREE.Vector3(0.5, 0, 0.5),
    );
    expect(footprintCenter(new Footprint(half, half, 2, 4))).toEqual(
      new THREE.Vector3(1, 0, 2),
    );
  });

  it('trouve la case sous une position du monde', () => {
    expect(cellAt(new THREE.Vector3(0.2, 3, 0.9))).toEqual(
      new GridCell(half, half),
    );
  });
});

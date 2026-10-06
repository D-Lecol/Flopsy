import { describe, expect, it } from 'vitest';
import { GridCell } from '../../domain/GridCell.js';
import { fixedRandom } from '../../testing/fakes.js';
import { FULL_TURN } from '../../util/math.js';
import { Spot } from './Spot.js';

const spotWith = (...values: number[]) =>
  new Spot(new GridCell(4, 7), 0.4, false, fixedRandom(...values));

describe('Spot', () => {
  it('réussit un tirage quand le hasard est sous la probabilité', () => {
    expect(spotWith(0.1).chance(0.2)).toBe(true);
    expect(spotWith(0.3).chance(0.2)).toBe(false);
  });

  it('choisit une option selon le hasard', () => {
    expect(spotWith(0).pick(['a', 'b', 'c'])).toBe('a');
    expect(spotWith(0.99).pick(['a', 'b', 'c'])).toBe('c');
  });

  it('tire un nombre entre deux bornes', () => {
    expect(spotWith(0).between(2, 6)).toBe(2);
    expect(spotWith(0.5).between(2, 6)).toBe(4);
  });

  it('tire une orientation sur un tour complet', () => {
    expect(spotWith(0.5).randomTurn()).toBeCloseTo(FULL_TURN / 2);
  });

  it('tire un point dans la case sans toucher ses bords', () => {
    const nearCorner = spotWith(0).randomPoint();
    const nearOppositeCorner = spotWith(0.999).randomPoint();
    expect(nearCorner.column).toBeCloseTo(4.1);
    expect(nearCorner.row).toBeCloseTo(7.1);
    expect(nearOppositeCorner.column).toBeLessThan(5);
  });
});

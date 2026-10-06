import { describe, expect, it } from 'vitest';
import { Rotation } from './Rotation.js';

describe('Rotation', () => {
  it('revient au départ après quatre quarts de tour', () => {
    const fullCircle = Rotation.NONE.next().next().next().next();
    expect(fullCircle.equals(Rotation.NONE)).toBe(true);
  });

  it('convertit les quarts de tour en radians', () => {
    expect(Rotation.ofQuarterTurns(1).radians()).toBeCloseTo(Math.PI / 2);
    expect(Rotation.ofQuarterTurns(2).radians()).toBeCloseTo(Math.PI);
  });

  it('ramène les valeurs hors limites entre 0 et 3', () => {
    expect(Rotation.ofQuarterTurns(5).equals(Rotation.ofQuarterTurns(1))).toBe(true);
    expect(Rotation.ofQuarterTurns(-1).equals(Rotation.ofQuarterTurns(3))).toBe(true);
  });

  it('échange largeur et profondeur à 90° et 270°', () => {
    const size = { width: 3, depth: 2 };
    expect(Rotation.ofQuarterTurns(1).apply(size)).toEqual({ width: 2, depth: 3 });
    expect(Rotation.ofQuarterTurns(3).apply(size)).toEqual({ width: 2, depth: 3 });
  });

  it('garde la taille à 0° et 180°', () => {
    const size = { width: 3, depth: 2 };
    expect(Rotation.NONE.apply(size)).toEqual(size);
    expect(Rotation.ofQuarterTurns(2).apply(size)).toEqual(size);
  });
});

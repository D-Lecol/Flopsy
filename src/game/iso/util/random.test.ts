import { describe, expect, it } from 'vitest';
import { randomForCell, seededRandom, smoothNoise } from './random.js';

describe('seededRandom', () => {
  it('donne la même suite pour la même graine', () => {
    const first = seededRandom(7);
    const second = seededRandom(7);
    expect([first(), first(), first()]).toEqual([second(), second(), second()]);
  });

  it('donne des suites différentes pour des graines différentes', () => {
    expect(seededRandom(1)()).not.toBe(seededRandom(2)());
  });

  it('reste entre 0 et 1', () => {
    const random = seededRandom(3);
    const values = Array.from({ length: 500 }, random);
    expect(values.every((value) => value >= 0 && value < 1)).toBe(true);
  });
});

describe('randomForCell', () => {
  it('donne toujours la même valeur pour la même case', () => {
    expect(randomForCell(4, 9, 2)).toBe(randomForCell(4, 9, 2));
  });

  it('donne des valeurs différentes pour des cases voisines', () => {
    expect(randomForCell(4, 9)).not.toBe(randomForCell(5, 9));
  });
});

describe('smoothNoise', () => {
  it('vaut exactement la valeur du coin sur un point entier', () => {
    expect(smoothNoise(3, 5, 1)).toBeCloseTo(randomForCell(3, 5, 1));
  });

  it('reste entre 0 et 1', () => {
    const samples = Array.from({ length: 200 }, (_, n) => smoothNoise(n * 0.37, n * 0.21));
    expect(samples.every((value) => value >= 0 && value <= 1)).toBe(true);
  });

  it('varie peu entre deux points très proches', () => {
    expect(Math.abs(smoothNoise(2.5, 2.5) - smoothNoise(2.51, 2.5))).toBeLessThan(0.05);
  });
});

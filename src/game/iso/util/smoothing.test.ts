import { describe, expect, it } from 'vitest';
import { catchUpRatio, easeOutCubic } from './smoothing.js';

describe('catchUpRatio', () => {
  it("vaut 0 quand aucun temps n'est passé", () => expect(catchUpRatio(12, 0)).toBe(0));
  it('approche 1 avec beaucoup de temps', () => expect(catchUpRatio(12, 10)).toBeCloseTo(1));
  it('rattrape plus vite avec une réactivité plus grande', () => {
    expect(catchUpRatio(20, 0.1)).toBeGreaterThan(catchUpRatio(5, 0.1));
  });
  it('donne le même résultat en une grande étape ou en deux petites', () => {
    const remainingAfterTwoSteps = (1 - catchUpRatio(12, 0.05)) ** 2;
    expect(1 - catchUpRatio(12, 0.1)).toBeCloseTo(remainingAfterTwoSteps);
  });
});

describe('easeOutCubic', () => {
  it('part de 0 et arrive à 1', () => {
    expect(easeOutCubic(0)).toBe(0);
    expect(easeOutCubic(1)).toBe(1);
  });
  it('a déjà fait plus de la moitié du chemin à mi-parcours', () => {
    expect(easeOutCubic(0.5)).toBeGreaterThan(0.5);
  });
});

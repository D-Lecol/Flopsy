import { describe, expect, it } from 'vitest';
import { COMPUTE_DEMAND_PFLOPS, RARE_EARTHS_AT_START_TONNES } from '../config.js';
import { publicAdhesion, statsFrom } from './Stats.js';

describe('publicAdhesion', () => {
  it('vaut 80 % quand rien ne manque', () => {
    expect(publicAdhesion({ powerMw: 0, computePflops: 0 })).toBe(80);
  });

  it("baisse quand l'énergie manque", () => {
    expect(publicAdhesion({ powerMw: 100, computePflops: 0 })).toBe(70);
  });

  it('baisse quand le calcul manque', () => {
    expect(publicAdhesion({ powerMw: 0, computePflops: 500 })).toBe(70);
  });

  it('ne descend jamais sous 0', () => {
    expect(publicAdhesion({ powerMw: 10_000, computePflops: 0 })).toBe(0);
  });
});

describe('statsFrom', () => {
  it("calcule le déficit d'énergie", () => {
    const stats = statsFrom({ computePflops: 0, powerProducedMw: 100, powerNeededMw: 250 }, 500);
    expect(stats.powerDeficitMw).toBe(150);
  });

  it("n'a pas de déficit quand la production suffit", () => {
    const stats = statsFrom({ computePflops: 0, powerProducedMw: 300, powerNeededMw: 250 }, 500);
    expect(stats.powerDeficitMw).toBe(0);
  });

  it('reprend la demande, le stock et le stock de départ', () => {
    const stats = statsFrom({ computePflops: 0, powerProducedMw: 0, powerNeededMw: 0 }, 500);
    expect(stats).toMatchObject({
      computeDemandPflops: COMPUTE_DEMAND_PFLOPS,
      rareEarthTonnes: 500,
      rareEarthTonnesAtStart: RARE_EARTHS_AT_START_TONNES,
    });
  });
});

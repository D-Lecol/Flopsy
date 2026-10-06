import { COMPUTE_DEMAND_PFLOPS, RARE_EARTHS_AT_START_TONNES } from '../config.js';
import { clamp } from '../util/math.js';
import type { Totals } from './PlacedBuildings.js';

/** Ce qu'affichent les jauges. */
export interface Stats extends Totals {
  computeDemandPflops: number;
  powerDeficitMw: number;
  rareEarthTonnes: number;
  rareEarthTonnesAtStart: number;
  adhesionPercent: number;
}

/** Formule provisoire (point ouvert n°8 du cahier des charges). */
const ADHESION = { atStart: 80, lostPerMissingMw: 0.1, lostPerMissingPflops: 0.02 };

export function publicAdhesion(missing: { powerMw: number; computePflops: number }): number {
  const lost =
    missing.powerMw * ADHESION.lostPerMissingMw +
    missing.computePflops * ADHESION.lostPerMissingPflops;
  return Math.round(clamp(ADHESION.atStart - lost, 0, 100));
}

export function statsFrom(totals: Totals, rareEarthTonnes: number): Stats {
  const powerDeficitMw = Math.max(0, totals.powerNeededMw - totals.powerProducedMw);
  const missingPflops = Math.max(0, COMPUTE_DEMAND_PFLOPS - totals.computePflops);
  return {
    ...totals,
    computeDemandPflops: COMPUTE_DEMAND_PFLOPS,
    powerDeficitMw,
    rareEarthTonnes,
    rareEarthTonnesAtStart: RARE_EARTHS_AT_START_TONNES,
    adhesionPercent: publicAdhesion({ powerMw: powerDeficitMw, computePflops: missingPflops }),
  };
}

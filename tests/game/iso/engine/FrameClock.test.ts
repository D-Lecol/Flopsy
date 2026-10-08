import { describe, expect, it } from 'vitest';
import { FrameClock } from '../../../../src/game/iso/engine/FrameClock.js';

describe('FrameClock', () => {
  it('compte zéro seconde à la première image', () => {
    expect(new FrameClock().tick(1000).seconds).toBe(0);
  });

  it('mesure le temps écoulé depuis l’image précédente', () => {
    const clock = new FrameClock();
    clock.tick(1000);
    expect(clock.tick(1016).seconds).toBeCloseTo(0.016);
  });

  it('plafonne la durée après une longue pause', () => {
    const clock = new FrameClock();
    clock.tick(0);
    expect(clock.tick(10_000).seconds).toBe(0.05);
  });

  it("transmet l'heure de l'image", () => {
    expect(new FrameClock().tick(1234).nowMs).toBe(1234);
  });
});

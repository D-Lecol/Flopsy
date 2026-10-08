import { describe, expect, it } from 'vitest';
import {
  normalized,
  STILL,
} from '../../../../src/game/iso/controls/MoveDirection.js';

describe('normalized', () => {
  it('laisse une direction simple telle quelle', () => {
    expect(normalized({ right: 1, forward: 0 })).toEqual({
      right: 1,
      forward: 0,
    });
  });

  it('ramène une diagonale à une longueur de 1', () => {
    const { right, forward } = normalized({ right: 1, forward: 1 });
    expect(Math.hypot(right, forward)).toBeCloseTo(1);
  });

  it('reste immobile sans direction', () => {
    expect(normalized({ right: 0, forward: 0 })).toEqual(STILL);
  });
});

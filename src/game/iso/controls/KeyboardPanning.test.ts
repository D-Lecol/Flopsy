import { describe, expect, it, vi } from 'vitest';
import { frame } from '../testing/fakes.js';
import { KeyboardPanning } from './KeyboardPanning.js';

describe('KeyboardPanning', () => {
  it('déplace la cible dans la direction des touches, selon le temps écoulé', () => {
    const direction = { right: 1, forward: 0 };
    const target = { move: vi.fn() };
    new KeyboardPanning({ moveDirection: () => direction }, target).update(frame(0.016));
    expect(target.move).toHaveBeenCalledWith(direction, 0.016);
  });
});

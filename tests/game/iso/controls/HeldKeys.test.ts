import { describe, expect, it } from 'vitest';
import { HeldKeys } from '../../../../src/game/iso/controls/HeldKeys.js';

describe('HeldKeys', () => {
  it('sait si une des touches est enfoncée', () => {
    const keys = new HeldKeys();
    keys.press('z');
    expect(keys.isAnyHeld(['z', 'arrowup'])).toBe(true);
    expect(keys.isAnyHeld(['s'])).toBe(false);
  });

  it('oublie une touche relâchée', () => {
    const keys = new HeldKeys();
    keys.press('z');
    keys.release('z');
    expect(keys.isAnyHeld(['z'])).toBe(false);
  });

  it('peut tout relâcher d’un coup', () => {
    const keys = new HeldKeys();
    keys.press('z');
    keys.press('d');
    keys.releaseAll();
    expect(keys.isAnyHeld(['z', 'd'])).toBe(false);
  });
});

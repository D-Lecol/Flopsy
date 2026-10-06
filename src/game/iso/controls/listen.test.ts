import { describe, expect, it, vi } from 'vitest';
import { listen } from './listen.js';

describe('listen', () => {
  it("appelle le gestionnaire quand l'événement survient", () => {
    const target = new EventTarget();
    const handler = vi.fn();
    listen(target, 'ping', handler);
    target.dispatchEvent(new Event('ping'));
    expect(handler).toHaveBeenCalledOnce();
  });

  it("retire l'écouteur avec la fonction renvoyée", () => {
    const target = new EventTarget();
    const handler = vi.fn();
    listen(target, 'ping', handler)();
    target.dispatchEvent(new Event('ping'));
    expect(handler).not.toHaveBeenCalled();
  });
});

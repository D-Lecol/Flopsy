import { describe, expect, it, vi } from 'vitest';
import { Emitter } from './Emitter.js';

interface Events {
  ping: number;
  pong: string;
}

describe('Emitter', () => {
  it("transmet le contenu aux abonnés de l'événement", () => {
    const emitter = new Emitter<Events>();
    const handler = vi.fn();
    emitter.on('ping', handler);
    emitter.emit('ping', 42);
    expect(handler).toHaveBeenCalledWith(42);
  });

  it("ne prévient pas les abonnés d'un autre événement", () => {
    const emitter = new Emitter<Events>();
    const handler = vi.fn();
    emitter.on('pong', handler);
    emitter.emit('ping', 1);
    expect(handler).not.toHaveBeenCalled();
  });

  it('prévient tous les abonnés', () => {
    const emitter = new Emitter<Events>();
    const first = vi.fn();
    const second = vi.fn();
    emitter.on('ping', first);
    emitter.on('ping', second);
    emitter.emit('ping', 1);
    expect(first).toHaveBeenCalledOnce();
    expect(second).toHaveBeenCalledOnce();
  });

  it('cesse de prévenir après le désabonnement', () => {
    const emitter = new Emitter<Events>();
    const handler = vi.fn();
    const unsubscribe = emitter.on('ping', handler);
    unsubscribe();
    emitter.emit('ping', 1);
    expect(handler).not.toHaveBeenCalled();
  });
});

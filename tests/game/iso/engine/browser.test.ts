import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  AnimationFrameLoop,
  ElementResizeWatcher,
  ElementViewport,
} from '../../../../src/game/iso/engine/browser.js';

afterEach(() => vi.unstubAllGlobals());

describe('AnimationFrameLoop', () => {
  it("appelle la fonction à chaque image, jusqu'à l'arrêt", () => {
    const pending: FrameRequestCallback[] = [];
    vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) =>
      pending.push(callback),
    );
    vi.stubGlobal('cancelAnimationFrame', vi.fn());
    const onFrame = vi.fn();
    const loop = new AnimationFrameLoop();
    loop.start(onFrame);
    pending.shift()!(16);
    pending.shift()!(32);
    expect(onFrame.mock.calls).toEqual([[16], [32]]);
    loop.stop();
    expect(cancelAnimationFrame).toHaveBeenCalled();
  });
});

describe('ElementResizeWatcher', () => {
  it("prévient quand l'élément change de taille, et se déconnecte à l'arrêt", () => {
    const disconnect = vi.fn();
    let notify = () => {};
    vi.stubGlobal(
      'ResizeObserver',
      class {
        constructor(callback: () => void) {
          notify = callback;
        }
        observe() {}
        disconnect = disconnect;
      },
    );
    const onResize = vi.fn();
    const watcher = new ElementResizeWatcher();
    watcher.watch(document.createElement('div'), onResize);
    notify();
    watcher.stop();
    expect(onResize).toHaveBeenCalledOnce();
    expect(disconnect).toHaveBeenCalledOnce();
  });
});

describe('ElementViewport', () => {
  it("donne la taille affichée de l'élément", () => {
    const element = document.createElement('div');
    Object.defineProperty(element, 'clientWidth', { value: 640 });
    Object.defineProperty(element, 'clientHeight', { value: 480 });
    const viewport = new ElementViewport(element);
    expect([viewport.width(), viewport.height()]).toEqual([640, 480]);
  });
});

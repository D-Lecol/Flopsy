import type { FrameLoop, Renderer, ResizeWatcher, Viewport } from '../contracts.js';
import { createWebGLRenderer } from '../render/stage.js';

/** Ce dont le moteur a besoin du navigateur. Remplaçable par des faux dans les tests. */
export interface EnginePlatform {
  createRenderer(host: HTMLElement): Renderer;
  readonly frameLoop: FrameLoop;
  readonly resizeWatcher: ResizeWatcher;
  readonly keyboardTarget: EventTarget;
}

export class AnimationFrameLoop implements FrameLoop {
  private frameId: number | null = null;

  start(onFrame: (nowMs: number) => void): void {
    const loop = (nowMs: number) => {
      onFrame(nowMs);
      this.frameId = requestAnimationFrame(loop);
    };
    this.frameId = requestAnimationFrame(loop);
  }

  stop(): void {
    if (this.frameId !== null) cancelAnimationFrame(this.frameId);
    this.frameId = null;
  }
}

export class ElementResizeWatcher implements ResizeWatcher {
  private observer: ResizeObserver | null = null;

  watch(element: HTMLElement, onResize: () => void): void {
    this.observer = new ResizeObserver(onResize);
    this.observer.observe(element);
  }

  stop(): void {
    this.observer?.disconnect();
    this.observer = null;
  }
}

export class ElementViewport implements Viewport {
  constructor(private readonly element: HTMLElement) {}

  width(): number {
    return this.element.clientWidth;
  }

  height(): number {
    return this.element.clientHeight;
  }
}

export function browserPlatform(): EnginePlatform {
  return {
    createRenderer: createWebGLRenderer,
    frameLoop: new AnimationFrameLoop(),
    resizeWatcher: new ElementResizeWatcher(),
    keyboardTarget: window,
  };
}

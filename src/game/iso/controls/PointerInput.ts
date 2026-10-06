import type { Disposable } from '../contracts.js';
import type { Pointer } from '../tools/Tool.js';
import { DragGesture } from './DragGesture.js';
import { listen, type StopListening } from './listen.js';

export interface PointerActions {
  onPointerMove(pointer: Pointer): void;
  onClick(pointer: Pointer): void;
  onDrag(dx: number, dy: number): void;
  onZoom(factor: number): void;
}

const WHEEL_ZOOM_SPEED = 0.001;

/** Souris et tactile : survol, clic, glissement, molette. */
export class PointerInput implements Disposable {
  private readonly stopListening: StopListening[];
  private drag: DragGesture | null = null;

  constructor(
    private readonly surface: HTMLElement,
    private readonly actions: PointerActions,
  ) {
    this.stopListening = [
      listen<PointerEvent>(surface, 'pointerdown', (event) => this.press(event)),
      listen<PointerEvent>(surface, 'pointermove', (event) => this.move(event)),
      listen<PointerEvent>(surface, 'pointerup', (event) => this.release(event)),
      listen<WheelEvent>(surface, 'wheel', (event) => this.zoom(event), { passive: false }),
    ];
  }

  dispose(): void {
    this.stopListening.forEach((stop) => stop());
  }

  private press(event: PointerEvent): void {
    this.drag = new DragGesture(pointerOf(event));
    this.surface.setPointerCapture?.(event.pointerId);
  }

  private move(event: PointerEvent): void {
    if (!this.drag) return this.actions.onPointerMove(pointerOf(event));
    const delta = this.drag.moveTo(pointerOf(event));
    if (delta) this.actions.onDrag(delta.dx, delta.dy);
  }

  private release(event: PointerEvent): void {
    if (this.drag?.isClick()) this.actions.onClick(pointerOf(event));
    this.drag = null;
  }

  private zoom(event: WheelEvent): void {
    event.preventDefault();
    this.actions.onZoom(Math.exp(-event.deltaY * WHEEL_ZOOM_SPEED));
  }
}

function pointerOf(event: PointerEvent): Pointer {
  return { x: event.clientX, y: event.clientY };
}

import type { Pointer } from '../tools/Tool.js';

const MIN_DRAG_DISTANCE_PX = 5; // en dessous, c'est un simple clic

export interface DragDelta {
  dx: number;
  dy: number;
}

/** Suit un appui : clic, ou glissement ? */
export class DragGesture {
  private last: Pointer;
  private hasMoved = false;

  constructor(private readonly start: Pointer) {
    this.last = start;
  }

  isClick(): boolean {
    return !this.hasMoved;
  }

  /** Déplacement depuis le dernier point, ou null tant que ça reste un clic. */
  moveTo(pointer: Pointer): DragDelta | null {
    const delta = { dx: pointer.x - this.last.x, dy: pointer.y - this.last.y };
    this.last = pointer;
    const distanceFromStart = Math.hypot(pointer.x - this.start.x, pointer.y - this.start.y);
    this.hasMoved ||= distanceFromStart > MIN_DRAG_DISTANCE_PX;
    return this.hasMoved ? delta : null;
  }
}

import type { FrameTime, FrameUpdatable } from '../contracts.js';
import type { MoveDirection, MoveDirectionSource } from './MoveDirection.js';

export interface Movable {
  move(direction: MoveDirection, seconds: number): void;
}

/** À chaque image, déplace la caméra dans la direction des touches enfoncées. */
export class KeyboardPanning implements FrameUpdatable {
  constructor(
    private readonly source: MoveDirectionSource,
    private readonly target: Movable,
  ) {}

  update(frame: FrameTime): void {
    this.target.move(this.source.moveDirection(), frame.seconds);
  }
}

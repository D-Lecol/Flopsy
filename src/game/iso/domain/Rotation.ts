import type { Size } from '../config.js';
import { QUARTER_TURN } from '../util/math.js';

/** Orientation d'un bâtiment, par quarts de tour (0 à 3). */
export class Rotation {
  static readonly NONE = new Rotation(0);

  private constructor(private readonly quarterTurns: number) {}

  static ofQuarterTurns(quarterTurns: number): Rotation {
    return new Rotation(((quarterTurns % 4) + 4) % 4);
  }

  next(): Rotation {
    return Rotation.ofQuarterTurns(this.quarterTurns + 1);
  }

  radians(): number {
    return this.quarterTurns * QUARTER_TURN;
  }

  /** À 90° ou 270°, largeur et profondeur s'échangent. */
  apply(size: Size): Size {
    const isSideways = this.quarterTurns % 2 === 1;
    return isSideways ? { width: size.depth, depth: size.width } : size;
  }

  equals(other: Rotation): boolean {
    return this.quarterTurns === other.quarterTurns;
  }
}

import type { CellPoint, GridCell } from '../../domain/GridCell.js';
import { FULL_TURN } from '../../util/math.js';
import { pick, type NonEmpty, type Random } from '../../util/random.js';

const CELL_MARGIN = 0.1; // le décor ne touche pas le bord de sa case

/** Une case à décorer, avec des tirages aléatoires lisibles. */
export class Spot {
  constructor(
    readonly cell: GridCell,
    readonly groundHeight: number,
    readonly isNearEdge: boolean,
    private readonly random: Random,
  ) {}

  chance(probability: number): boolean {
    return this.random() < probability;
  }

  pick<T>(options: NonEmpty<T>): T {
    return pick(this.random, options);
  }

  between(min: number, max: number): number {
    return min + this.random() * (max - min);
  }

  randomTurn(): number {
    return this.between(0, FULL_TURN);
  }

  /** Un point au hasard dans la case, avec une petite marge au bord. */
  randomPoint(): CellPoint {
    return {
      column: this.cell.column + this.between(CELL_MARGIN, 1 - CELL_MARGIN),
      row: this.cell.row + this.between(CELL_MARGIN, 1 - CELL_MARGIN),
    };
  }
}

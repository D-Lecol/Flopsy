import type { Size } from '../config.js';
import { clamp, range } from '../util/math.js';
import { GridCell, type CellPoint } from './GridCell.js';

/** Un rectangle de cases : coin (column, row), largeur et profondeur. */
export class Footprint {
  constructor(
    readonly column: number,
    readonly row: number,
    readonly width: number,
    readonly depth: number,
  ) {}

  static at(corner: GridCell, size: Size): Footprint {
    return new Footprint(corner.column, corner.row, size.width, size.depth);
  }

  static single(cell: GridCell): Footprint {
    return Footprint.at(cell, { width: 1, depth: 1 });
  }

  /** Centré sous un point, sans dépasser d'une carte de `mapSize` cases. */
  static centeredOn(point: CellPoint, size: Size, mapSize: number): Footprint {
    const column = Math.round(point.column - size.width / 2);
    const row = Math.round(point.row - size.depth / 2);
    return new Footprint(
      clamp(column, 0, mapSize - size.width),
      clamp(row, 0, mapSize - size.depth),
      size.width,
      size.depth,
    );
  }

  corner(): GridCell {
    return new GridCell(this.column, this.row);
  }

  cells(): GridCell[] {
    return range(this.width).flatMap((dx) =>
      range(this.depth).map((dz) => new GridCell(this.column + dx, this.row + dz)),
    );
  }

  contains(cell: GridCell): boolean {
    const insideColumns = cell.column >= this.column && cell.column < this.column + this.width;
    const insideRows = cell.row >= this.row && cell.row < this.row + this.depth;
    return insideColumns && insideRows;
  }

  grownBy(margin: number): Footprint {
    const extra = margin * 2;
    return new Footprint(
      this.column - margin,
      this.row - margin,
      this.width + extra,
      this.depth + extra,
    );
  }

  center(): CellPoint {
    return { column: this.column + this.width / 2, row: this.row + this.depth / 2 };
  }
}

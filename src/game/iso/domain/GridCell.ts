/** Un point de la grille, décimales autorisées (3,5 = milieu de la case 3). */
export interface CellPoint {
  column: number;
  row: number;
}

/** Une case entière de la grille. */
export class GridCell {
  constructor(
    readonly column: number,
    readonly row: number,
  ) {}

  /** La case qui contient ce point. */
  static under(point: CellPoint): GridCell {
    return new GridCell(Math.floor(point.column), Math.floor(point.row));
  }

  key(): string {
    return `${this.column},${this.row}`;
  }

  equals(other: GridCell): boolean {
    return this.column === other.column && this.row === other.row;
  }

  center(): CellPoint {
    return { column: this.column + 0.5, row: this.row + 0.5 };
  }
}

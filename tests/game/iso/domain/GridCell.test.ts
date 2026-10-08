import { describe, expect, it } from 'vitest';
import { GridCell } from '../../../../src/game/iso/domain/GridCell.js';

describe('GridCell', () => {
  it('trouve la case qui contient un point à décimales', () => {
    expect(GridCell.under({ column: 3.7, row: 0.2 })).toEqual(
      new GridCell(3, 0),
    );
  });

  it('a une clé unique par case', () => {
    expect(new GridCell(3, 4).key()).toBe('3,4');
    expect(new GridCell(3, 4).key()).not.toBe(new GridCell(4, 3).key());
  });

  it('est égale à une autre case aux mêmes coordonnées', () => {
    expect(new GridCell(1, 2).equals(new GridCell(1, 2))).toBe(true);
    expect(new GridCell(1, 2).equals(new GridCell(2, 1))).toBe(false);
  });

  it('a son centre au milieu de la case', () => {
    expect(new GridCell(2, 5).center()).toEqual({ column: 2.5, row: 5.5 });
  });
});

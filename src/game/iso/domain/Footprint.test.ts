import { describe, expect, it } from 'vitest';
import { Footprint } from './Footprint.js';
import { GridCell } from './GridCell.js';

describe('Footprint', () => {
  it('liste toutes ses cases', () => {
    const cells = new Footprint(2, 3, 2, 1).cells();
    expect(cells).toEqual([new GridCell(2, 3), new GridCell(3, 3)]);
  });

  it('a autant de cases que largeur × profondeur', () => {
    expect(new Footprint(0, 0, 3, 2).cells()).toHaveLength(6);
  });

  it('contient ses cases et pas celles d’à côté', () => {
    const footprint = new Footprint(2, 2, 2, 2);
    expect(footprint.contains(new GridCell(3, 3))).toBe(true);
    expect(footprint.contains(new GridCell(4, 3))).toBe(false);
    expect(footprint.contains(new GridCell(1, 2))).toBe(false);
  });

  it("s'agrandit d'une marge de chaque côté", () => {
    expect(new Footprint(5, 5, 2, 3).grownBy(1)).toEqual(new Footprint(4, 4, 4, 5));
  });

  it('a son centre au milieu du rectangle', () => {
    expect(new Footprint(2, 4, 3, 2).center()).toEqual({ column: 3.5, row: 5 });
  });

  it('a pour coin sa première case', () => {
    expect(new Footprint(2, 4, 3, 2).corner()).toEqual(new GridCell(2, 4));
  });

  it('se crée à partir d’une case unique', () => {
    expect(Footprint.single(new GridCell(7, 1))).toEqual(new Footprint(7, 1, 1, 1));
  });

  describe('centeredOn', () => {
    it('se centre sous le point visé', () => {
      const footprint = Footprint.centeredOn({ column: 10, row: 10 }, { width: 2, depth: 2 }, 24);
      expect(footprint.center()).toEqual({ column: 10, row: 10 });
    });

    it('ne dépasse pas du bord gauche ou haut de la carte', () => {
      const footprint = Footprint.centeredOn({ column: 0, row: 0 }, { width: 3, depth: 3 }, 24);
      expect([footprint.column, footprint.row]).toEqual([0, 0]);
    });

    it('ne dépasse pas du bord droit ou bas de la carte', () => {
      const footprint = Footprint.centeredOn({ column: 24, row: 24 }, { width: 3, depth: 2 }, 24);
      expect([footprint.column, footprint.row]).toEqual([21, 22]);
    });
  });
});

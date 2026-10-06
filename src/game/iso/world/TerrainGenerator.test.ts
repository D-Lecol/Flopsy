import { describe, expect, it } from 'vitest';
import { MAP_SIZE } from '../config.js';
import { Footprint } from '../domain/Footprint.js';
import { GridCell } from '../domain/GridCell.js';
import {
  defaultTerrainGenerator,
  lakeRule,
  mapEdgeRule,
  startingZoneRule,
  TerrainGenerator,
  type TerrainRule,
} from './TerrainGenerator.js';

const always = (terrain: TerrainRule['terrain']): TerrainRule => ({
  terrain,
  appliesTo: () => true,
});
const never = (terrain: TerrainRule['terrain']): TerrainRule => ({
  terrain,
  appliesTo: () => false,
});

describe('TerrainGenerator', () => {
  it('applique la première règle qui correspond', () => {
    const generator = new TerrainGenerator(
      [never('water'), always('grass'), always('rock')],
      'paving',
    );
    expect(generator.terrainAt(new GridCell(0, 0))).toBe('grass');
  });

  it("utilise le terrain par défaut quand aucune règle ne s'applique", () => {
    const generator = new TerrainGenerator([never('water')], 'paving');
    expect(generator.terrainAt(new GridCell(0, 0))).toBe('paving');
  });
});

describe('les règles par défaut', () => {
  it('rendent constructibles les zones de départ et une marge autour', () => {
    const rule = startingZoneRule([new Footprint(5, 5, 2, 2)]);
    expect(rule.appliesTo(new GridCell(5, 5))).toBe(true);
    expect(rule.appliesTo(new GridCell(4, 7))).toBe(true);
    expect(rule.appliesTo(new GridCell(9, 9))).toBe(false);
  });

  it('mettent de l’eau au centre du lac et pas loin de lui', () => {
    expect(lakeRule.appliesTo(new GridCell(5, 18))).toBe(true);
    expect(lakeRule.appliesTo(new GridCell(18, 5))).toBe(false);
  });

  it("mettent de l'herbe sur les bords de la carte", () => {
    expect(mapEdgeRule.appliesTo(new GridCell(0, 10))).toBe(true);
    expect(mapEdgeRule.appliesTo(new GridCell(MAP_SIZE - 1, 10))).toBe(true);
    expect(mapEdgeRule.appliesTo(new GridCell(10, 10))).toBe(false);
  });

  it('font passer les zones de départ avant le lac', () => {
    const generator = defaultTerrainGenerator([new Footprint(5, 18, 1, 1)]);
    expect(generator.terrainAt(new GridCell(5, 18))).toBe('paving');
  });
});

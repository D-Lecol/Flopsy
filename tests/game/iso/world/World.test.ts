import { describe, expect, it } from 'vitest';
import { TERRAIN } from '../../../../src/game/iso/config.js';
import { Footprint } from '../../../../src/game/iso/domain/Footprint.js';
import { GridCell } from '../../../../src/game/iso/domain/GridCell.js';
import { aBuilding, uniformWorld } from '../testing/fakes.js';
import { TerrainGenerator } from '../../../../src/game/iso/world/TerrainGenerator.js';
import { World } from '../../../../src/game/iso/world/World.js';

function worldWithWaterAt(water: GridCell): World {
  const rule = {
    terrain: 'water' as const,
    appliesTo: (cell: GridCell) => cell.equals(water),
  };
  return new World(6, new TerrainGenerator([rule], 'paving'));
}

describe('World', () => {
  it('connaît le terrain de chaque case', () => {
    const world = worldWithWaterAt(new GridCell(1, 1));
    expect(world.terrainAt(new GridCell(1, 1))).toBe('water');
    expect(world.terrainAt(new GridCell(2, 1))).toBe('paving');
  });

  it('parcourt toutes les cases une fois', () => {
    const visited: string[] = [];
    uniformWorld(3).forEachCell((cell) => visited.push(cell.key()));
    expect(visited).toHaveLength(9);
    expect(new Set(visited).size).toBe(9);
  });

  it('sait si une case est dans la carte', () => {
    const world = uniformWorld(4);
    expect(world.contains(new GridCell(3, 0))).toBe(true);
    expect(world.contains(new GridCell(4, 0))).toBe(false);
    expect(world.contains(new GridCell(0, -1))).toBe(false);
  });

  it('donne la hauteur du sol selon le terrain', () => {
    const world = worldWithWaterAt(new GridCell(1, 1));
    expect(world.groundHeightAt(new GridCell(1, 1))).toBe(TERRAIN.water.height);
  });

  it('prend la case la plus haute sous une empreinte', () => {
    const world = worldWithWaterAt(new GridCell(1, 1));
    expect(world.groundHeightUnder(new Footprint(1, 1, 2, 1))).toBe(
      TERRAIN.paving.height,
    );
  });

  describe('canBuildOn', () => {
    it('accepte un terrain libre et constructible', () => {
      expect(uniformWorld(6).canBuildOn(new Footprint(0, 0, 2, 2))).toBe(true);
    });

    it("refuse l'eau", () => {
      expect(
        worldWithWaterAt(new GridCell(1, 1)).canBuildOn(
          new Footprint(0, 0, 2, 2),
        ),
      ).toBe(false);
    });

    it('refuse une empreinte qui dépasse de la carte', () => {
      expect(uniformWorld(6).canBuildOn(new Footprint(5, 5, 2, 2))).toBe(false);
    });

    it('refuse une case déjà occupée', () => {
      const world = uniformWorld(6);
      world.onBuilt(aBuilding('edgeDatacenter', 1, 1));
      expect(world.canBuildOn(new Footprint(2, 2, 2, 2))).toBe(false);
    });
  });

  it("note l'occupant de chaque case d'un bâtiment construit", () => {
    const world = uniformWorld(6);
    const building = aBuilding('edgeDatacenter', 1, 1);
    world.onBuilt(building);
    expect(world.occupantAt(new GridCell(2, 2))).toBe(building.id);
    expect(world.isOccupied(new GridCell(3, 3))).toBe(false);
  });

  it('libère les cases après une démolition', () => {
    const world = uniformWorld(6);
    const building = aBuilding('edgeDatacenter', 1, 1);
    world.onBuilt(building);
    world.onDemolished(building);
    expect(world.isOccupied(new GridCell(1, 1))).toBe(false);
  });

  it('affiche le sol et le socle de l’île', () => {
    expect(uniformWorld(3).group.children.length).toBeGreaterThanOrEqual(3);
  });
});

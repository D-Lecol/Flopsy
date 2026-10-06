import { describe, expect, it } from 'vitest';
import { BUILDINGS } from '../config.js';
import { GridCell } from './GridCell.js';
import { PlacedBuildings } from './PlacedBuildings.js';
import { Rotation } from './Rotation.js';

const origin = new GridCell(0, 0);

describe('PlacedBuildings', () => {
  it('donne un identifiant différent à chaque bâtiment', () => {
    const buildings = new PlacedBuildings();
    const first = buildings.create('edgeDatacenter', origin, Rotation.NONE);
    const second = buildings.create('edgeDatacenter', origin, Rotation.NONE);
    expect(first.id).not.toBe(second.id);
  });

  it("calcule l'empreinte à partir du coin et de la taille du type", () => {
    const building = new PlacedBuildings().create(
      'modularDatacenter',
      new GridCell(4, 5),
      Rotation.NONE,
    );
    expect(building.footprint).toMatchObject({ column: 4, row: 5, width: 3, depth: 2 });
  });

  it("tient compte de la rotation dans l'empreinte", () => {
    const building = new PlacedBuildings().create(
      'modularDatacenter',
      origin,
      Rotation.ofQuarterTurns(1),
    );
    expect(building.footprint).toMatchObject({ width: 2, depth: 3 });
  });

  it('retrouve un bâtiment par son identifiant', () => {
    const buildings = new PlacedBuildings();
    const building = buildings.create('smrPlant', origin, Rotation.NONE);
    expect(buildings.find(building.id)).toBe(building);
  });

  it('retire un bâtiment et le renvoie', () => {
    const buildings = new PlacedBuildings();
    const building = buildings.create('smrPlant', origin, Rotation.NONE);
    expect(buildings.remove(building.id)).toBe(building);
    expect(buildings.all()).toHaveLength(0);
  });

  it('ne renvoie rien en retirant un identifiant inconnu', () => {
    expect(new PlacedBuildings().remove(999)).toBeUndefined();
  });

  it('additionne calcul, production et consommation', () => {
    const buildings = new PlacedBuildings();
    buildings.create('edgeDatacenter', origin, Rotation.NONE);
    buildings.create('smrPlant', origin, Rotation.NONE);
    expect(buildings.totals()).toEqual({
      computePflops: BUILDINGS.edgeDatacenter.computePflops,
      powerProducedMw: BUILDINGS.smrPlant.powerMw,
      powerNeededMw: -BUILDINGS.edgeDatacenter.powerMw,
    });
  });

  it('a des totaux nuls quand elle est vide', () => {
    expect(new PlacedBuildings().totals()).toEqual({
      computePflops: 0,
      powerProducedMw: 0,
      powerNeededMw: 0,
    });
  });
});

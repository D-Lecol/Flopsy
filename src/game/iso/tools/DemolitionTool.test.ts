import { describe, expect, it, vi } from 'vitest';
import { Footprint } from '../domain/Footprint.js';
import type { DemolitionSite } from '../domain/GameState.js';
import type { PlacedBuilding } from '../domain/PlacedBuilding.js';
import { aBuilding, RecordingGhost, uniformWorld } from '../testing/fakes.js';
import { DemolitionTool } from './DemolitionTool.js';

function setup(...buildings: PlacedBuilding[]) {
  const world = uniformWorld(10);
  buildings.forEach((building) => world.onBuilt(building));
  const site: DemolitionSite = {
    buildingWithId: (id) => buildings.find((building) => building.id === id),
    demolish: vi.fn(),
  };
  return { site, tool: new DemolitionTool(world, site) };
}

describe('DemolitionTool', () => {
  it('entoure tout le bâtiment visé en orange', () => {
    const plant = aBuilding('smrPlant', 2, 2);
    const ghost = new RecordingGhost();
    setup(plant).tool.aimAt({ column: 3.5, row: 3.5 }).preview(ghost);
    expect(ghost.calls).toEqual(['marker:demolish']);
    expect(ghost.lastFootprint).toBe(plant.footprint);
  });

  it('démolit le bâtiment visé', () => {
    const plant = aBuilding('smrPlant', 2, 2);
    const { tool, site } = setup(plant);
    tool.aimAt({ column: 2.2, row: 4.9 }).apply();
    expect(site.demolish).toHaveBeenCalledWith(plant.id);
  });

  it('protège les bâtiments non démolissables, comme la ville', () => {
    const city = aBuilding('city', 0, 0);
    const ghost = new RecordingGhost();
    const { tool, site } = setup(city);
    const aim = tool.aimAt({ column: 1, row: 1 });
    aim.preview(ghost);
    aim.apply();
    expect(ghost.lastColor).toBe('blocked');
    expect(site.demolish).not.toHaveBeenCalled();
  });

  it('marque en rouge une case vide, sans rien démolir', () => {
    const ghost = new RecordingGhost();
    const { tool, site } = setup();
    const aim = tool.aimAt({ column: 5.5, row: 5.5 });
    aim.preview(ghost);
    aim.apply();
    expect(ghost.lastColor).toBe('blocked');
    expect(ghost.lastFootprint).toEqual(new Footprint(5, 5, 1, 1));
    expect(site.demolish).not.toHaveBeenCalled();
  });

  it("cache l'aperçu hors de la carte", () => {
    const ghost = new RecordingGhost();
    setup().tool.aimAt({ column: -3, row: 2 }).preview(ghost);
    expect(ghost.calls).toEqual(['hide']);
  });
});

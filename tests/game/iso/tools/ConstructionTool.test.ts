import { describe, expect, it, vi } from 'vitest';
import { Footprint } from '../../../../src/game/iso/domain/Footprint.js';
import type { ConstructionSite } from '../../../../src/game/iso/domain/GameState.js';
import { GridCell } from '../../../../src/game/iso/domain/GridCell.js';
import { Rotation } from '../../../../src/game/iso/domain/Rotation.js';
import { aBuilding, RecordingGhost } from '../testing/fakes.js';
import type { BuildableArea } from '../../../../src/game/iso/world/World.js';
import { ConstructionTool } from '../../../../src/game/iso/tools/ConstructionTool.js';

function setup({ buildable = true, affordable = true } = {}) {
  const area: BuildableArea = {
    canBuildOn: () => buildable,
    groundHeightUnder: () => 0.4,
    groundHeightAt: () => 0.4,
  };
  const site: ConstructionSite = {
    canAfford: () => affordable,
    construct: vi.fn(() => aBuilding()),
    refuse: vi.fn(),
  };
  return {
    site,
    tool: new ConstructionTool('modularDatacenter', area, site, 24),
  };
}

const cursor = { column: 10, row: 10 };

describe('ConstructionTool', () => {
  it('centre l’empreinte sous le curseur', () => {
    const ghost = new RecordingGhost();
    setup().tool.aimAt(cursor, Rotation.NONE).preview(ghost);
    expect(ghost.lastFootprint).toEqual(new Footprint(9, 9, 3, 2));
  });

  it("tourne l'empreinte avec le bâtiment", () => {
    const ghost = new RecordingGhost();
    setup().tool.aimAt(cursor, Rotation.ofQuarterTurns(1)).preview(ghost);
    expect(ghost.lastFootprint).toMatchObject({ width: 2, depth: 3 });
  });

  it('montre un aperçu autorisé quand on peut construire et payer', () => {
    const ghost = new RecordingGhost();
    setup().tool.aimAt(cursor, Rotation.NONE).preview(ghost);
    expect(ghost.calls).toEqual(['building:modularDatacenter']);
    expect(ghost.lastAllowed).toBe(true);
  });

  it('montre un aperçu bloqué sur un terrain occupé', () => {
    const ghost = new RecordingGhost();
    setup({ buildable: false })
      .tool.aimAt(cursor, Rotation.NONE)
      .preview(ghost);
    expect(ghost.lastAllowed).toBe(false);
  });

  it('construit au coin de l’empreinte avec la rotation choisie', () => {
    const { tool, site } = setup();
    const rotation = Rotation.ofQuarterTurns(1);
    tool.aimAt(cursor, rotation).apply();
    expect(site.construct).toHaveBeenCalledWith(
      'modularDatacenter',
      new GridCell(9, 9),
      rotation,
    );
  });

  it('refuse faute de terres rares', () => {
    const { tool, site } = setup({ affordable: false });
    tool.aimAt(cursor, Rotation.NONE).apply();
    expect(site.construct).not.toHaveBeenCalled();
    expect(site.refuse).toHaveBeenCalledWith(
      'modularDatacenter',
      expect.any(Footprint),
      'not-enough-rare-earths',
    );
  });

  it('refuse sur un terrain bloqué', () => {
    const { tool, site } = setup({ buildable: false });
    tool.aimAt(cursor, Rotation.NONE).apply();
    expect(site.refuse).toHaveBeenCalledWith(
      'modularDatacenter',
      expect.any(Footprint),
      'blocked',
    );
  });
});

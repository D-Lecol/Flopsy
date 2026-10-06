import { describe, expect, it, vi } from 'vitest';
import type { CellPoint } from '../domain/GridCell.js';
import { Rotation } from '../domain/Rotation.js';
import { RecordingGhost } from '../testing/fakes.js';
import { PlacementController } from './PlacementController.js';
import type { Aim, CellPicker, Tool, ToolId } from './Tool.js';
import { ToolBox } from './ToolBox.js';

function setup(picked: CellPoint | null = { column: 4, row: 4 }) {
  const aim: Aim = { preview: vi.fn(), apply: vi.fn() };
  const tool: Tool = { aimAt: vi.fn(() => aim) };
  const picker: CellPicker = { cellUnder: () => picked };
  const ghost = new RecordingGhost();
  const onToolChange = vi.fn();
  const tools = new ToolBox(new Map<ToolId, Tool>([['smrPlant', tool]]));
  const controller = new PlacementController(picker, ghost, tools, onToolChange);
  return { aim, tool, ghost, onToolChange, controller };
}

describe('PlacementController', () => {
  it("cache l'aperçu tant qu'aucun outil n'est choisi", () => {
    const { controller, ghost } = setup();
    controller.pointAt({ x: 0, y: 0 });
    controller.update();
    expect(ghost.calls).toEqual(['hide']);
  });

  it("cache l'aperçu tant que le curseur n'a pas bougé", () => {
    const { controller, ghost } = setup();
    controller.selectTool('smrPlant');
    controller.update();
    expect(ghost.calls).toEqual(['hide']);
  });

  it('prévient quand l’outil change', () => {
    const { controller, onToolChange } = setup();
    controller.selectTool('smrPlant');
    controller.selectTool(null);
    expect(onToolChange.mock.calls).toEqual([['smrPlant'], [null]]);
  });

  it("montre l'aperçu de l'outil sous le curseur", () => {
    const { controller, ghost, aim, tool } = setup();
    controller.selectTool('smrPlant');
    controller.pointAt({ x: 10, y: 10 });
    controller.update();
    expect(tool.aimAt).toHaveBeenCalledWith({ column: 4, row: 4 }, Rotation.NONE);
    expect(aim.preview).toHaveBeenCalledWith(ghost);
  });

  it('applique la visée à la confirmation', () => {
    const { controller, aim } = setup();
    controller.selectTool('smrPlant');
    controller.pointAt({ x: 10, y: 10 });
    controller.confirm();
    expect(aim.apply).toHaveBeenCalledOnce();
  });

  it('ne fait rien à la confirmation sans outil', () => {
    const { controller, aim } = setup();
    controller.pointAt({ x: 10, y: 10 });
    controller.confirm();
    expect(aim.apply).not.toHaveBeenCalled();
  });

  it("transmet la rotation choisie à l'outil", () => {
    const { controller, tool } = setup();
    controller.selectTool('smrPlant');
    controller.pointAt({ x: 10, y: 10 });
    controller.rotateBuilding();
    controller.update();
    expect(tool.aimAt).toHaveBeenLastCalledWith(expect.anything(), Rotation.ofQuarterTurns(1));
  });

  it("cache l'aperçu quand le curseur ne vise pas le sol", () => {
    const { controller, ghost } = setup(null);
    controller.selectTool('smrPlant');
    controller.pointAt({ x: 10, y: 10 });
    controller.update();
    expect(ghost.calls).toEqual(['hide']);
  });
});

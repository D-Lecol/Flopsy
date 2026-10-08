import { describe, expect, it } from 'vitest';
import { PLAYER_BUILDINGS } from '../../../../src/game/iso/config.js';
import { GameState } from '../../../../src/game/iso/domain/GameState.js';
import { uniformWorld } from '../testing/fakes.js';
import type { Tool } from '../../../../src/game/iso/tools/Tool.js';
import {
  createToolBox,
  ToolBox,
} from '../../../../src/game/iso/tools/ToolBox.js';

describe('ToolBox', () => {
  it('rend l’outil demandé', () => {
    const tool: Tool = { aimAt: () => ({ preview() {}, apply() {} }) };
    expect(new ToolBox(new Map([['demolish', tool]])).get('demolish')).toBe(
      tool,
    );
  });

  it('signale un outil inconnu', () => {
    expect(() => new ToolBox(new Map()).get('smrPlant')).toThrow(
      'Outil inconnu',
    );
  });

  it('contient un outil par bâtiment constructible, plus la démolition', () => {
    const box = createToolBox(uniformWorld(6), new GameState());
    expect(box.ids().sort()).toEqual([...PLAYER_BUILDINGS, 'demolish'].sort());
  });
});

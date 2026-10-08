import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';
import { GameState } from '../../../../src/game/iso/domain/GameState.js';
import { GridCell } from '../../../../src/game/iso/domain/GridCell.js';
import { useGameStats } from '../../../../src/game/iso/react/useGameStats.js';

beforeAll(() => {
  (
    globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
});
afterEach(() => (document.body.innerHTML = ''));

function ComputeGauge({ state }: { state: GameState }) {
  return <span>{useGameStats(state).computePflops}</span>;
}

describe('useGameStats', () => {
  it('affiche les jauges et se met à jour à chaque changement', () => {
    const state = new GameState();
    const container = document.body.appendChild(document.createElement('div'));
    act(() => createRoot(container).render(<ComputeGauge state={state} />));
    expect(container.textContent).toBe('0');
    act(() => {
      state.placeStartingBuilding('edgeDatacenter', new GridCell(0, 0));
    });
    expect(container.textContent).toBe('450');
  });
});

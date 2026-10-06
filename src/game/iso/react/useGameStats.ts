import { useSyncExternalStore } from 'react';
import type { GameState } from '../domain/GameState.js';
import type { Stats } from '../domain/Stats.js';

/** Lit les jauges du jeu et se met à jour à chaque changement. */
export function useGameStats(state: GameState): Stats {
  return useSyncExternalStore(
    (onChange) => state.subscribe(onChange),
    () => state.stats(),
  );
}

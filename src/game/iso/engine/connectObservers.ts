import type { BuildingObserver } from '../contracts.js';
import type { GameEvents } from '../domain/GameState.js';
import type { Emitter } from '../util/Emitter.js';

/**
 * Prévient les observateurs, dans l'ordre de la liste, à chaque construction
 * ou démolition. Renvoie de quoi se désabonner.
 */
export function connectObservers(
  events: Emitter<GameEvents>,
  observers: readonly BuildingObserver[],
): () => void {
  const stopBuilt = events.on('built', ({ building, isStartingBuilding }) =>
    observers.forEach((observer) => observer.onBuilt(building, isStartingBuilding)),
  );
  const stopDemolished = events.on('demolished', ({ building }) =>
    observers.forEach((observer) => observer.onDemolished(building)),
  );
  return () => {
    stopBuilt();
    stopDemolished();
  };
}

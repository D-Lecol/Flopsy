import { describe, expect, it } from 'vitest';
import type { BuildingObserver } from '../contracts.js';
import { GameState } from '../domain/GameState.js';
import { GridCell } from '../domain/GridCell.js';
import { Rotation } from '../domain/Rotation.js';
import { connectObservers } from './connectObservers.js';

function recorder(name: string, log: string[]): BuildingObserver {
  return {
    onBuilt: (_building, isStartingBuilding) => log.push(`${name}:built:${isStartingBuilding}`),
    onDemolished: () => log.push(`${name}:demolished`),
  };
}

describe('connectObservers', () => {
  it('prévient les observateurs dans l’ordre de la liste', () => {
    const state = new GameState();
    const log: string[] = [];
    connectObservers(state.events, [recorder('grille', log), recorder('réseau', log)]);
    state.construct('smrPlant', new GridCell(0, 0), Rotation.NONE);
    expect(log).toEqual(['grille:built:false', 'réseau:built:false']);
  });

  it('transmet les démolitions', () => {
    const state = new GameState();
    const log: string[] = [];
    connectObservers(state.events, [recorder('grille', log)]);
    const plant = state.construct('smrPlant', new GridCell(0, 0), Rotation.NONE);
    state.demolish(plant.id);
    expect(log).toContain('grille:demolished');
  });

  it('signale les bâtiments de départ', () => {
    const state = new GameState();
    const log: string[] = [];
    connectObservers(state.events, [recorder('grille', log)]);
    state.placeStartingBuilding('city', new GridCell(0, 0));
    expect(log).toEqual(['grille:built:true']);
  });

  it('ne prévient plus après déconnexion', () => {
    const state = new GameState();
    const log: string[] = [];
    connectObservers(state.events, [recorder('grille', log)])();
    state.construct('smrPlant', new GridCell(0, 0), Rotation.NONE);
    expect(log).toEqual([]);
  });
});

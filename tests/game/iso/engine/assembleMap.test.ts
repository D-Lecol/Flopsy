import { describe, expect, it } from 'vitest';
import {
  RARE_EARTHS_AT_START_TONNES,
  START_LAYOUT,
} from '../../../../src/game/iso/config.js';
import { GameState } from '../../../../src/game/iso/domain/GameState.js';
import { BuildingLayer } from '../../../../src/game/iso/render/BuildingLayer.js';
import { PowerGrid } from '../../../../src/game/iso/render/PowerGrid.js';
import { BoxCatalog } from '../testing/fakes.js';
import { World } from '../../../../src/game/iso/world/World.js';
import {
  assembleMap,
  placeStartingBuildings,
  startingZones,
} from '../../../../src/game/iso/engine/assembleMap.js';

describe('assembleMap', () => {
  it('fournit toutes les couches à afficher', () => {
    const map = assembleMap(new GameState(), new BoxCatalog());
    expect(map.layers).toHaveLength(5);
    expect(map.layers).toContain(map.world);
    expect(map.layers).toContain(map.ghost);
  });

  it('prévient la grille en premier et le réseau en dernier', () => {
    const { observers } = assembleMap(new GameState(), new BoxCatalog());
    expect(observers[0]).toBeInstanceOf(World);
    expect(observers.at(-1)).toBeInstanceOf(PowerGrid);
  });

  it('anime la couche des bâtiments', () => {
    const { animated } = assembleMap(new GameState(), new BoxCatalog());
    expect(
      animated.some((updatable) => updatable instanceof BuildingLayer),
    ).toBe(true);
  });
});

describe('startingZones', () => {
  it('donne une zone par bâtiment de départ', () => {
    expect(startingZones()).toHaveLength(START_LAYOUT.length);
  });
});

describe('placeStartingBuildings', () => {
  it('pose les bâtiments de départ sans dépenser de terres rares', () => {
    const state = new GameState();
    placeStartingBuildings(state);
    expect(
      state
        .directory()
        .all()
        .map((building) => building.type),
    ).toEqual(START_LAYOUT.map((start) => start.type));
    expect(state.stats().rareEarthTonnes).toBe(RARE_EARTHS_AT_START_TONNES);
  });
});

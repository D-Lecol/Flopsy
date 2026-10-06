import { BUILDINGS, MAP_SIZE, START_LAYOUT } from '../config.js';
import type { BuildingObserver, FrameUpdatable, SceneLayer } from '../contracts.js';
import { Footprint } from '../domain/Footprint.js';
import type { GameState } from '../domain/GameState.js';
import { GridCell } from '../domain/GridCell.js';
import { BuildingLayer } from '../render/BuildingLayer.js';
import { Ghost } from '../render/Ghost.js';
import { BuildingModelCatalog, type ModelCatalog } from '../render/models/ModelCatalog.js';
import { PowerGrid } from '../render/PowerGrid.js';
import { Decor } from '../world/decor/Decor.js';
import { defaultTerrainGenerator } from '../world/TerrainGenerator.js';
import { World } from '../world/World.js';

export interface AssembledMap {
  world: World;
  ghost: Ghost;
  /** À ajouter à la scène. */
  layers: SceneLayer[];
  /** Prévenus dans cet ordre : la grille d'abord, le réseau en dernier. */
  observers: BuildingObserver[];
  /** À faire avancer à chaque image. */
  animated: FrameUpdatable[];
}

/** Fabrique toutes les couches de la carte et indique comment les relier. */
export function assembleMap(
  state: GameState,
  catalog: ModelCatalog = new BuildingModelCatalog(),
): AssembledMap {
  const world = new World(MAP_SIZE, defaultTerrainGenerator(startingZones()));
  const decor = new Decor();
  decor.populate(world);
  const buildings = new BuildingLayer(catalog, world);
  const powerGrid = new PowerGrid(state.directory(), world);
  const ghost = new Ghost(catalog);
  return {
    world,
    ghost,
    layers: [world, decor, powerGrid, buildings, ghost],
    observers: [world, decor, buildings, powerGrid],
    animated: [buildings],
  };
}

export function startingZones(): Footprint[] {
  return START_LAYOUT.map(({ type, column, row }) =>
    Footprint.at(new GridCell(column, row), BUILDINGS[type].size),
  );
}

export function placeStartingBuildings(state: GameState): void {
  START_LAYOUT.forEach(({ type, column, row }) =>
    state.placeStartingBuilding(type, new GridCell(column, row)),
  );
}

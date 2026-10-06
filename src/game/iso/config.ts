/** Données du jeu. À recaler avec les données ouvertes (tâche de calibration). */

export const MAP_SIZE = 24;
export const COMPUTE_DEMAND_PFLOPS = 900;
export const RARE_EARTHS_AT_START_TONNES = 1120;

export type TerrainType = 'grass' | 'paving' | 'rock' | 'water';

export interface TerrainDefinition {
  color: number;
  height: number;
  buildable: boolean;
}

export const TERRAIN: Record<TerrainType, TerrainDefinition> = {
  grass: { color: 0x9bb56a, height: 0.4, buildable: true },
  paving: { color: 0xc98b5a, height: 0.45, buildable: true },
  rock: { color: 0xb87546, height: 0.55, buildable: true },
  water: { color: 0x6fb0cf, height: 0.12, buildable: false },
};

/** Hauteur moyenne du sol, utilisée pour viser une case avec la souris. */
export const AVERAGE_GROUND_HEIGHT = TERRAIN.paving.height;

export type BuildingType = 'edgeDatacenter' | 'modularDatacenter' | 'smrPlant' | 'city';

export interface Size {
  width: number;
  depth: number;
}

export interface BuildingDefinition {
  label: string;
  size: Size;
  rareEarthCost: number;
  /** Positif : produit de l'énergie. Négatif : en consomme. */
  powerMw: number;
  computePflops: number;
  demolishable: boolean;
}

export const BUILDINGS: Record<BuildingType, BuildingDefinition> = {
  edgeDatacenter: {
    label: 'Datacenter Edge T1',
    size: { width: 2, depth: 2 },
    rareEarthCost: 65,
    powerMw: -140,
    computePflops: 450,
    demolishable: true,
  },
  modularDatacenter: {
    label: 'Datacenter Modulaire T2',
    size: { width: 3, depth: 2 },
    rareEarthCost: 140,
    powerMw: -320,
    computePflops: 1100,
    demolishable: true,
  },
  smrPlant: {
    label: 'Centrale SMR Compacte',
    size: { width: 3, depth: 3 },
    rareEarthCost: 220,
    powerMw: 450,
    computePflops: 0,
    demolishable: true,
  },
  city: {
    label: 'Ville',
    size: { width: 6, depth: 5 },
    rareEarthCost: 0,
    powerMw: -140,
    computePflops: 0,
    demolishable: false,
  },
};

/** Le bâtiment auquel toutes les lignes électriques sont reliées. */
export const POWER_HUB: BuildingType = 'city';

export const PLAYER_BUILDINGS: BuildingType[] = ['edgeDatacenter', 'modularDatacenter', 'smrPlant'];

export interface StartingBuilding {
  type: BuildingType;
  column: number;
  row: number;
}

export const START_LAYOUT: StartingBuilding[] = [
  { type: 'city', column: 15, row: 3 },
  { type: 'smrPlant', column: 7, row: 12 },
  { type: 'edgeDatacenter', column: 11, row: 13 },
];

import { MAP_SIZE, type TerrainType } from '../config.js';
import type { Footprint } from '../domain/Footprint.js';
import type { GridCell } from '../domain/GridCell.js';
import { randomForCell, smoothNoise } from '../util/random.js';

/** Une règle de génération : « si la case remplit ma condition, c'est ce terrain ». */
export interface TerrainRule {
  readonly terrain: TerrainType;
  appliesTo(cell: GridCell): boolean;
}

/** Applique la première règle qui correspond, sinon le terrain par défaut. */
export class TerrainGenerator {
  constructor(
    private readonly rules: readonly TerrainRule[],
    private readonly fallback: TerrainType,
  ) {}

  terrainAt(cell: GridCell): TerrainType {
    const rule = this.rules.find((candidate) => candidate.appliesTo(cell));
    return rule?.terrain ?? this.fallback;
  }
}

const LAKE = { column: 5, row: 18, radius: 3, shoreWobble: 1.4, noiseScale: 0.5, seed: 5 };
const MEADOW = { noiseScale: 0.2, threshold: 0.5, seed: 3 };
const ROCK_DEPOSIT = { chance: 0.07, seed: 9 };
const MAP_EDGE_WIDTH = 2;
const STARTING_ZONE_MARGIN = 1;

/** Les zones de départ (ville, centrale…) restent constructibles, avec une marge. */
export function startingZoneRule(zones: Footprint[]): TerrainRule {
  const grownZones = zones.map((zone) => zone.grownBy(STARTING_ZONE_MARGIN));
  return { terrain: 'paving', appliesTo: (cell) => grownZones.some((zone) => zone.contains(cell)) };
}

/** Un lac rond dont la rive est rendue irrégulière par le bruit. */
export const lakeRule: TerrainRule = {
  terrain: 'water',
  appliesTo: ({ column, row }) => {
    const distance = Math.hypot(column - LAKE.column, row - LAKE.row);
    const wobble = smoothNoise(column * LAKE.noiseScale, row * LAKE.noiseScale, LAKE.seed);
    return distance < LAKE.radius + wobble * LAKE.shoreWobble;
  },
};

export const mapEdgeRule: TerrainRule = {
  terrain: 'grass',
  appliesTo: ({ column, row }) => {
    const last = MAP_SIZE - 1 - MAP_EDGE_WIDTH;
    return Math.min(column, row) < MAP_EDGE_WIDTH || Math.max(column, row) > last;
  },
};

export const meadowRule: TerrainRule = {
  terrain: 'grass',
  appliesTo: ({ column, row }) =>
    smoothNoise(column * MEADOW.noiseScale, row * MEADOW.noiseScale, MEADOW.seed) >
    MEADOW.threshold,
};

export const rockDepositRule: TerrainRule = {
  terrain: 'rock',
  appliesTo: ({ column, row }) =>
    randomForCell(column, row, ROCK_DEPOSIT.seed) < ROCK_DEPOSIT.chance,
};

/** Ordre de priorité : zones de départ, lac, bords, prairies, gisements, puis pavé. */
export function defaultTerrainGenerator(startingZones: Footprint[]): TerrainGenerator {
  return new TerrainGenerator(
    [startingZoneRule(startingZones), lakeRule, mapEdgeRule, meadowRule, rockDepositRule],
    'paving',
  );
}

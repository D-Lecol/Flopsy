import type { TerrainType } from '../../config.js';
import type { DecorPlanter } from './DecorBatch.js';
import type { Spot } from './Spot.js';

/** Une façon de décorer un type de terrain. Ajouter un terrain = ajouter un décorateur. */
export interface TerrainDecorator {
  decorate(spot: Spot, planter: DecorPlanter): void;
}

const CHANCE = {
  tree: 0.12,
  treeNearEdge: 0.35,
  flower: 0.18,
  rockOnGrass: 0.03,
  rockOnPaving: 0.05,
};
const TUFTS_PER_CELL = { min: 3, max: 6 };
const CRYSTALS_PER_DEPOSIT = { min: 1, max: 3 };
const TRUNK_HEIGHT = 0.3;

const COLORS = {
  grass: [0x7fae4f, 0x8dbb5a, 0x6c9d46, 0xa3c566],
  foliage: [0x3f8f4f, 0x4f9d4f, 0x2f7f45, 0x5ba85a],
  flowers: [0xf5d442, 0xffffff, 0xf29ac0, 0xd96a4a],
  trunk: 0x6b4a35,
  grassRock: 0x9a9a94,
  pavingRock: 0x9a8f84,
  crystal: 0xe07a2f,
} as const;

function plantTufts(spot: Spot, planter: DecorPlanter): void {
  const count = Math.floor(spot.between(TUFTS_PER_CELL.min, TUFTS_PER_CELL.max));
  for (let tuft = 0; tuft < count; tuft++) {
    planter.place('tuft', spot, { color: spot.pick(COLORS.grass), scale: spot.between(0.7, 1.3) });
  }
}

function plantTree(spot: Spot, planter: DecorPlanter): void {
  const at = spot.randomPoint();
  const scale = spot.between(0.8, 1.4);
  planter.place('trunk', spot, { at, scale, color: COLORS.trunk });
  planter.place('crown', spot, {
    at,
    scale,
    color: spot.pick(COLORS.foliage),
    lift: TRUNK_HEIGHT * scale,
  });
}

export const grassDecorator: TerrainDecorator = {
  decorate(spot, planter) {
    plantTufts(spot, planter);
    if (spot.chance(spot.isNearEdge ? CHANCE.treeNearEdge : CHANCE.tree)) plantTree(spot, planter);
    if (spot.chance(CHANCE.flower)) {
      planter.place('flower', spot, {
        color: spot.pick(COLORS.flowers),
        scale: spot.between(0.8, 1.3),
      });
    }
    if (spot.chance(CHANCE.rockOnGrass)) {
      planter.place('rock', spot, { color: COLORS.grassRock, scale: spot.between(0.8, 1.5) });
    }
  },
};

export const pavingDecorator: TerrainDecorator = {
  decorate(spot, planter) {
    if (!spot.chance(CHANCE.rockOnPaving)) return;
    planter.place('rock', spot, { color: COLORS.pavingRock, scale: spot.between(0.8, 1.5) });
  },
};

/** Les gisements de terres rares sont signalés par des cristaux orange. */
export const rockDepositDecorator: TerrainDecorator = {
  decorate(spot, planter) {
    const count = Math.floor(spot.between(CRYSTALS_PER_DEPOSIT.min, CRYSTALS_PER_DEPOSIT.max));
    for (let crystal = 0; crystal < count; crystal++) {
      planter.place('crystal', spot, { color: COLORS.crystal, scale: spot.between(0.8, 1.4) });
    }
  },
};

export const noDecoration: TerrainDecorator = { decorate() {} };

export const DECORATORS: Record<TerrainType, TerrainDecorator> = {
  grass: grassDecorator,
  paving: pavingDecorator,
  rock: rockDepositDecorator,
  water: noDecoration,
};

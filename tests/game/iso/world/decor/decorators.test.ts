import { describe, expect, it } from 'vitest';
import { GridCell } from '../../../../../src/game/iso/domain/GridCell.js';
import { at, fixedRandom } from '../../testing/fakes.js';
import type {
  DecorKind,
  DecorLook,
  DecorPlanter,
} from '../../../../../src/game/iso/world/decor/DecorBatch.js';
import {
  DECORATORS,
  grassDecorator,
  noDecoration,
  pavingDecorator,
  rockDepositDecorator,
} from '../../../../../src/game/iso/world/decor/decorators.js';
import { Spot } from '../../../../../src/game/iso/world/decor/Spot.js';

class RecordingPlanter implements DecorPlanter {
  readonly kinds: DecorKind[] = [];
  readonly looks: DecorLook[] = [];

  place(kind: DecorKind, _spot: Spot, look: DecorLook): void {
    this.kinds.push(kind);
    this.looks.push(look);
  }

  count(kind: DecorKind): number {
    return this.kinds.filter((placed) => placed === kind).length;
  }
}

const luckySpot = () =>
  new Spot(new GridCell(5, 5), 0.4, false, fixedRandom(0));
const unluckySpot = () =>
  new Spot(new GridCell(5, 5), 0.4, false, fixedRandom(0.99));

describe('grassDecorator', () => {
  it("plante toujours des touffes d'herbe", () => {
    const planter = new RecordingPlanter();
    grassDecorator.decorate(unluckySpot(), planter);
    expect(planter.count('tuft')).toBeGreaterThanOrEqual(3);
  });

  it('peut ajouter un arbre (tronc et couronne), une fleur et un rocher', () => {
    const planter = new RecordingPlanter();
    grassDecorator.decorate(luckySpot(), planter);
    expect(planter.count('trunk')).toBe(1);
    expect(planter.count('crown')).toBe(1);
    expect(planter.count('flower')).toBe(1);
    expect(planter.count('rock')).toBe(1);
  });

  it("pose la couronne de l'arbre au même endroit que le tronc, au-dessus", () => {
    const planter = new RecordingPlanter();
    grassDecorator.decorate(luckySpot(), planter);
    const trunk = at(planter.looks, planter.kinds.indexOf('trunk'));
    const crown = at(planter.looks, planter.kinds.indexOf('crown'));
    expect(crown.at).toEqual(trunk.at);
    expect(crown.lift).toBeGreaterThan(0);
  });

  it("plante plus d'arbres près des bords", () => {
    const planter = new RecordingPlanter();
    const nearEdge = new Spot(new GridCell(0, 0), 0.4, true, fixedRandom(0.2));
    grassDecorator.decorate(nearEdge, planter);
    expect(planter.count('trunk')).toBe(1);
  });
});

describe('pavingDecorator', () => {
  it('pose parfois un rocher', () => {
    const planter = new RecordingPlanter();
    pavingDecorator.decorate(luckySpot(), planter);
    expect(planter.kinds).toEqual(['rock']);
  });

  it('ne pose rien le plus souvent', () => {
    const planter = new RecordingPlanter();
    pavingDecorator.decorate(unluckySpot(), planter);
    expect(planter.kinds).toEqual([]);
  });
});

describe('rockDepositDecorator', () => {
  it('signale le gisement par au moins un cristal', () => {
    const planter = new RecordingPlanter();
    rockDepositDecorator.decorate(luckySpot(), planter);
    expect(planter.count('crystal')).toBeGreaterThanOrEqual(1);
  });
});

describe('DECORATORS', () => {
  it("ne décore pas l'eau", () => {
    expect(DECORATORS.water).toBe(noDecoration);
    const planter = new RecordingPlanter();
    noDecoration.decorate(luckySpot(), planter);
    expect(planter.kinds).toEqual([]);
  });

  it('a un décorateur pour chaque terrain', () => {
    expect(Object.keys(DECORATORS).sort()).toEqual([
      'grass',
      'paving',
      'rock',
      'water',
    ]);
  });
});

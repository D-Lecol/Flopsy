import { describe, expect, it, vi } from 'vitest';
import {
  BUILDINGS,
  RARE_EARTHS_AT_START_TONNES,
} from '../../../../src/game/iso/config.js';
import { Footprint } from '../../../../src/game/iso/domain/Footprint.js';
import { GameState } from '../../../../src/game/iso/domain/GameState.js';
import { GridCell } from '../../../../src/game/iso/domain/GridCell.js';
import { Rotation } from '../../../../src/game/iso/domain/Rotation.js';

const corner = new GridCell(2, 2);

describe('GameState', () => {
  it('commence sans bâtiment, avec tout le stock de terres rares', () => {
    const state = new GameState();
    expect(state.directory().all()).toHaveLength(0);
    expect(state.stats().rareEarthTonnes).toBe(RARE_EARTHS_AT_START_TONNES);
  });

  describe('construct', () => {
    it('paie le coût en terres rares', () => {
      const state = new GameState();
      state.construct('smrPlant', corner, Rotation.NONE);
      expect(state.stats().rareEarthTonnes).toBe(
        RARE_EARTHS_AT_START_TONNES - BUILDINGS.smrPlant.rareEarthCost,
      );
    });

    it('annonce le bâtiment construit par le joueur', () => {
      const state = new GameState();
      const onBuilt = vi.fn();
      state.events.on('built', onBuilt);
      const building = state.construct('smrPlant', corner, Rotation.NONE);
      expect(onBuilt).toHaveBeenCalledWith({
        building,
        isStartingBuilding: false,
      });
    });

    it('met à jour et annonce les jauges', () => {
      const state = new GameState();
      const onChanged = vi.fn();
      state.subscribe(onChanged);
      state.construct('edgeDatacenter', corner, Rotation.NONE);
      expect(onChanged).toHaveBeenCalledOnce();
      expect(state.stats().computePflops).toBe(
        BUILDINGS.edgeDatacenter.computePflops,
      );
    });

    it('refuse de construire sans assez de terres rares', () => {
      const state = new GameState();
      const affordablePlants = Math.floor(
        RARE_EARTHS_AT_START_TONNES / BUILDINGS.smrPlant.rareEarthCost,
      );
      for (let plant = 0; plant < affordablePlants; plant++)
        state.construct('smrPlant', corner, Rotation.NONE);
      expect(state.canAfford('smrPlant')).toBe(false);
      expect(() =>
        state.construct('smrPlant', corner, Rotation.NONE),
      ).toThrow();
    });
  });

  it('place les bâtiments de départ gratuitement et le signale', () => {
    const state = new GameState();
    const onBuilt = vi.fn();
    state.events.on('built', onBuilt);
    state.placeStartingBuilding('city', corner);
    expect(state.stats().rareEarthTonnes).toBe(RARE_EARTHS_AT_START_TONNES);
    expect(onBuilt.mock.lastCall?.[0].isStartingBuilding).toBe(true);
  });

  it('retrouve un bâtiment par son identifiant', () => {
    const state = new GameState();
    const building = state.construct('edgeDatacenter', corner, Rotation.NONE);
    expect(state.buildingWithId(building.id)).toBe(building);
  });

  describe('demolish', () => {
    it('retire le bâtiment et l’annonce', () => {
      const state = new GameState();
      const onDemolished = vi.fn();
      state.events.on('demolished', onDemolished);
      const building = state.construct('edgeDatacenter', corner, Rotation.NONE);
      state.demolish(building.id);
      expect(state.buildingWithId(building.id)).toBeUndefined();
      expect(onDemolished).toHaveBeenCalledWith({ building });
    });

    it('met les jauges à jour', () => {
      const state = new GameState();
      const building = state.construct('edgeDatacenter', corner, Rotation.NONE);
      state.demolish(building.id);
      expect(state.stats().computePflops).toBe(0);
    });

    it('ne fait rien pour un identifiant inconnu', () => {
      const state = new GameState();
      const onDemolished = vi.fn();
      state.events.on('demolished', onDemolished);
      state.demolish(999);
      expect(onDemolished).not.toHaveBeenCalled();
    });
  });

  it('annonce un refus avec sa raison', () => {
    const state = new GameState();
    const onRefused = vi.fn();
    state.events.on('refused', onRefused);
    const footprint = new Footprint(0, 0, 2, 2);
    state.refuse('edgeDatacenter', footprint, 'blocked');
    expect(onRefused).toHaveBeenCalledWith({
      type: 'edgeDatacenter',
      footprint,
      reason: 'blocked',
    });
  });

  it('cesse de prévenir après le désabonnement', () => {
    const state = new GameState();
    const onChanged = vi.fn();
    state.subscribe(onChanged)();
    state.construct('edgeDatacenter', corner, Rotation.NONE);
    expect(onChanged).not.toHaveBeenCalled();
  });

  it('renvoie un nouvel objet de jauges à chaque changement', () => {
    const state = new GameState();
    const before = state.stats();
    state.construct('edgeDatacenter', corner, Rotation.NONE);
    expect(state.stats()).not.toBe(before);
  });
});

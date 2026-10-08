import { describe, expect, it } from 'vitest';
import { TERRAIN } from '../../../../src/game/iso/config.js';
import { Rotation } from '../../../../src/game/iso/domain/Rotation.js';
import {
  aBuilding,
  at,
  BoxCatalog,
  frame,
  uniformWorld,
} from '../testing/fakes.js';
import { footprintCenter } from '../../../../src/game/iso/world/coordinates.js';
import { BuildingLayer } from '../../../../src/game/iso/render/BuildingLayer.js';

const layerOnPaving = () =>
  new BuildingLayer(new BoxCatalog(), uniformWorld(24, 'paving'));

describe('BuildingLayer', () => {
  it("pose le modèle au centre de l'empreinte, sur le sol", () => {
    const layer = layerOnPaving();
    const building = aBuilding('edgeDatacenter', 4, 6);
    layer.onBuilt(building, true);
    const anchor = at(layer.group.children, 0);
    const center = footprintCenter(building.footprint);
    expect([anchor.position.x, anchor.position.y, anchor.position.z]).toEqual([
      center.x,
      TERRAIN.paving.height,
      center.z,
    ]);
  });

  it('fabrique le modèle du bon type', () => {
    const catalog = new BoxCatalog();
    new BuildingLayer(catalog, uniformWorld(24)).onBuilt(
      aBuilding('smrPlant'),
      true,
    );
    expect(catalog.created).toEqual(['smrPlant']);
  });

  it('tourne le modèle selon la rotation du bâtiment', () => {
    const layer = layerOnPaving();
    layer.onBuilt(
      aBuilding('modularDatacenter', 0, 0, Rotation.ofQuarterTurns(1)),
      true,
    );
    expect(at(at(layer.group.children, 0).children, 0).rotation.y).toBeCloseTo(
      Math.PI / 2,
    );
  });

  it("n'anime pas les bâtiments de départ", () => {
    const layer = layerOnPaving();
    layer.onBuilt(aBuilding(), true);
    expect(at(layer.group.children, 0).scale.y).toBe(1);
  });

  it('fait pousser les bâtiments posés par le joueur', () => {
    const layer = layerOnPaving();
    layer.onBuilt(aBuilding(), false);
    const anchor = at(layer.group.children, 0);
    expect(anchor.scale.y).toBeLessThan(1);
    layer.update(frame(1));
    expect(anchor.scale.y).toBe(1);
  });

  it('retire le modèle à la démolition', () => {
    const layer = layerOnPaving();
    const building = aBuilding();
    layer.onBuilt(building, true);
    layer.onDemolished(building);
    expect(layer.group.children).toHaveLength(0);
  });

  it("ignore la démolition d'un bâtiment inconnu", () => {
    expect(() => layerOnPaving().onDemolished(aBuilding())).not.toThrow();
  });
});

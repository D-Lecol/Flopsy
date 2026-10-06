import * as THREE from 'three';
import { describe, expect, it } from 'vitest';
import { MAP_SIZE } from '../config.js';
import { GridCell } from '../domain/GridCell.js';
import { PlacedBuildings } from '../domain/PlacedBuildings.js';
import { Rotation } from '../domain/Rotation.js';
import { uniformWorld } from '../testing/fakes.js';
import { cellAt } from '../world/coordinates.js';
import { evenlySpaced, PowerGrid, routeToHub } from './PowerGrid.js';

function setup() {
  const buildings = new PlacedBuildings();
  const world = uniformWorld(MAP_SIZE);
  const grid = new PowerGrid(buildings, world);
  const add = (type: 'city' | 'smrPlant' | 'edgeDatacenter', column: number, row: number) => {
    const building = buildings.create(type, new GridCell(column, row), Rotation.NONE);
    world.onBuilt(building);
    return building;
  };
  return { buildings, world, grid, add };
}

const wires = (grid: PowerGrid) =>
  grid.group.children.filter((child) => child instanceof THREE.Line);
const pylons = (grid: PowerGrid) =>
  grid.group.children.filter((child) => child instanceof THREE.Mesh);

describe('PowerGrid', () => {
  it('ne dessine rien sans ville', () => {
    const { grid, add } = setup();
    add('smrPlant', 2, 2);
    grid.refresh();
    expect(grid.group.children).toHaveLength(0);
  });

  it('relie chaque bâtiment à la ville par un câble', () => {
    const { grid, add } = setup();
    add('city', 15, 3);
    add('smrPlant', 2, 12);
    add('edgeDatacenter', 8, 16);
    grid.refresh();
    expect(wires(grid)).toHaveLength(2);
  });

  it('plante des pylônes le long des câbles', () => {
    const { grid, add } = setup();
    add('city', 15, 3);
    add('smrPlant', 2, 12);
    grid.refresh();
    expect(pylons(grid).length).toBeGreaterThan(0);
  });

  it('ne plante aucun pylône sur une case occupée', () => {
    const { grid, add, world } = setup();
    add('city', 15, 3);
    add('smrPlant', 2, 12);
    grid.refresh();
    const onOccupiedCell = pylons(grid).some((pylon) => world.isOccupied(cellAt(pylon.position)));
    expect(onOccupiedCell).toBe(false);
  });

  it('redessine tout à chaque construction ou démolition', () => {
    const { grid, add, buildings } = setup();
    add('city', 15, 3);
    const plant = add('smrPlant', 2, 12);
    grid.onBuilt();
    buildings.remove(plant.id);
    grid.onDemolished();
    expect(grid.group.children).toHaveLength(0);
  });
});

describe('routeToHub', () => {
  it("fait un coude à l'aplomb de la ville", () => {
    const route = routeToHub(new THREE.Vector3(-5, 0, 4), new THREE.Vector3(3, 0, -2));
    expect(route[1]).toEqual(new THREE.Vector3(3, 0, 4));
  });
});

describe('evenlySpaced', () => {
  it("répartit les points jusqu'à l'arrivée, sans le départ", () => {
    const points = evenlySpaced(new THREE.Vector3(0, 0, 0), new THREE.Vector3(8, 0, 0), 4);
    expect(points.map((point) => point.x)).toEqual([4, 8]);
  });

  it('donne au moins un point, même sur une courte distance', () => {
    expect(evenlySpaced(new THREE.Vector3(), new THREE.Vector3(1, 0, 0), 4)).toHaveLength(1);
  });
});

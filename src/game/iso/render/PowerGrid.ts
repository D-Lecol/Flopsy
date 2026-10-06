import * as THREE from 'three';
import { POWER_HUB } from '../config.js';
import type { BuildingObserver, SceneLayer } from '../contracts.js';
import type { PlacedBuilding } from '../domain/PlacedBuilding.js';
import type { BuildingDirectory } from '../domain/PlacedBuildings.js';
import { cellAt, footprintCenter } from '../world/coordinates.js';
import type { GroundHeights, OccupancyMap } from '../world/World.js';

const WIRE_HEIGHT = 1.95;
const PYLON_SPACING = 4;
const PYLON = { height: 1.5, radius: 0.07, crossbar: 0.5, thickness: 0.05 };
const PYLON_SHAPE = new THREE.ConeGeometry(PYLON.radius, PYLON.height, 4);
const CROSSBAR_SHAPE = new THREE.BoxGeometry(PYLON.crossbar, PYLON.thickness, PYLON.thickness);
const PYLON_MATERIAL = new THREE.MeshLambertMaterial({ color: 0x6b7684 });
const WIRE_MATERIAL = new THREE.LineBasicMaterial({ color: 0x2b2f36 });

/** Le câble fait un coude : jusqu'à l'aplomb de la ville, puis droit vers elle. */
export function routeToHub(from: THREE.Vector3, hub: THREE.Vector3): THREE.Vector3[] {
  return [from, new THREE.Vector3(hub.x, 0, from.z), hub];
}

type Segment = [start: THREE.Vector3, end: THREE.Vector3];

/** Les tronçons d'un trajet : [A, B, C] donne A→B puis B→C. */
export function segmentsOf(route: THREE.Vector3[]): Segment[] {
  return route.slice(1).map((end, index): Segment => [route[index] ?? end, end]);
}

/** Points régulièrement espacés entre deux extrémités (le départ exclu). */
export function evenlySpaced(
  start: THREE.Vector3,
  end: THREE.Vector3,
  spacing: number,
): THREE.Vector3[] {
  const count = Math.max(1, Math.round(start.distanceTo(end) / spacing));
  return Array.from({ length: count }, (_, step) => start.clone().lerp(end, (step + 1) / count));
}

/** Lignes haute tension entre chaque bâtiment et la ville, avec leurs pylônes. */
export class PowerGrid implements SceneLayer, BuildingObserver {
  readonly group = new THREE.Group();
  private readonly cellsWithPylon = new Set<string>();

  constructor(
    private readonly directory: BuildingDirectory,
    private readonly map: OccupancyMap & GroundHeights,
  ) {}

  onBuilt(): void {
    this.refresh();
  }

  onDemolished(): void {
    this.refresh();
  }

  refresh(): void {
    this.clear();
    const buildings = this.directory.all();
    const hub = buildings.find((building) => building.type === POWER_HUB);
    if (!hub) return;
    buildings
      .filter((building) => building !== hub)
      .forEach((building) => this.connect(building, hub));
  }

  private connect(building: PlacedBuilding, hub: PlacedBuilding): void {
    const route = routeToHub(footprintCenter(building.footprint), footprintCenter(hub.footprint));
    this.group.add(createWire(route));
    segmentsOf(route)
      .flatMap(([start, end]) => evenlySpaced(start, end, PYLON_SPACING))
      .forEach((spot) => this.tryPlacePylon(spot));
  }

  /** Pas de pylône sur un bâtiment, hors de la carte, ni deux sur la même case. */
  private tryPlacePylon(spot: THREE.Vector3): void {
    const cell = cellAt(spot);
    const isFree = this.map.contains(cell) && !this.map.isOccupied(cell);
    if (!isFree || this.cellsWithPylon.has(cell.key())) return;
    this.cellsWithPylon.add(cell.key());
    this.group.add(...createPylon(spot, this.map.groundHeightAt(cell)));
  }

  private clear(): void {
    this.group.children
      .filter((child): child is THREE.Line => child instanceof THREE.Line)
      .forEach((wire) => wire.geometry.dispose());
    this.group.clear();
    this.cellsWithPylon.clear();
  }
}

function createWire(route: THREE.Vector3[]): THREE.Line {
  const points = route.map((point) => point.clone().setY(WIRE_HEIGHT));
  return new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), WIRE_MATERIAL);
}

function createPylon(spot: THREE.Vector3, groundHeight: number): THREE.Mesh[] {
  const mast = new THREE.Mesh(PYLON_SHAPE, PYLON_MATERIAL);
  mast.position.set(spot.x, groundHeight + PYLON.height / 2, spot.z);
  mast.castShadow = true;
  const crossbar = new THREE.Mesh(CROSSBAR_SHAPE, PYLON_MATERIAL);
  crossbar.position.set(spot.x, WIRE_HEIGHT - 0.1, spot.z);
  return [mast, crossbar];
}

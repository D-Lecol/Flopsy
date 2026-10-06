import type * as THREE from 'three';
import { BUILDINGS } from '../../config.js';
import { range } from '../../util/math.js';
import { pick, seededRandom, type NonEmpty, type Random } from '../../util/random.js';
import { BatchBuilder } from '../BatchBuilder.js';

const SEED = 7;
const CITY = BUILDINGS.city.size;
const FACADES: NonEmpty<number> = [0x9ec5d8, 0xe3cfb4, 0xcfd8e2, 0xd9a98a, 0xf0ece4, 0x7fa6bd];
const COLOR = {
  asphalt: 0x6f7683,
  avenue: 0x8b93a0,
  plaza: 0xe6dccb,
  fountain: 0x6fb0cf,
  park: 0x8fbf6a,
  windows: 0x2f4a63,
  roof: 0x5e6b7a,
  trunk: 0x6b4a35,
  foliage: 0x3f8f4f,
  antenna: 0x333333,
};
const BASE_HEIGHT = 0.1; // socle bitumé
const LOT_SIZE = 0.86; // parc ou place, presque toute la case
const TOWER_SIZE = 0.78; // l'écart entre deux immeubles forme la rue
const WINDOW = { band: 0.07, spacing: 0.28 };
const TOWER_HEIGHT = { min: 0.35, extraAtCenter: 2.2, skyscraper: 1.5 };
const PARK = { chance: 0.14, minDistanceFromCenter: 0.55, trees: 2 };

/** Une case de la ville. */
interface Lot {
  x: number;
  z: number;
  isCenter: boolean;
  /** 0 au centre, 1 au milieu d'un bord, environ 1,4 dans un coin. */
  distanceFromCenter: number;
}

/** La ville est UNE seule entité : immeubles hauts au centre, parcs autour, place centrale. */
export function createCity(): THREE.Mesh {
  const random = seededRandom(SEED);
  const city = new BatchBuilder();
  addStreets(city);
  lotsOfCity().forEach((lot) => addLot(city, lot, random));
  return city.build();
}

function lotsOfCity(): Lot[] {
  return range(CITY.width).flatMap((column) => range(CITY.depth).map((row) => lotAt(column, row)));
}

function lotAt(column: number, row: number): Lot {
  const offsetX = (column + 0.5) / CITY.width - 0.5;
  const offsetZ = (row + 0.5) / CITY.depth - 0.5;
  return {
    x: column - CITY.width / 2 + 0.5,
    z: row - CITY.depth / 2 + 0.5,
    isCenter: column === Math.floor(CITY.width / 2) && row === Math.floor(CITY.depth / 2),
    distanceFromCenter: Math.hypot(offsetX, offsetZ) * 2,
  };
}

function addStreets(city: BatchBuilder): void {
  city.box(0, 0, 0, CITY.width - 0.06, BASE_HEIGHT, CITY.depth - 0.06, COLOR.asphalt);
  city.box(0, BASE_HEIGHT, 0, CITY.width - 0.3, 0.02, 0.1, COLOR.avenue);
  city.box(0, BASE_HEIGHT, 0, 0.1, 0.02, CITY.depth - 0.3, COLOR.avenue);
}

function addLot(city: BatchBuilder, lot: Lot, random: Random): void {
  if (lot.isCenter) return addPlaza(city, lot);
  if (isPark(lot, random)) return addPark(city, lot, random);
  addTower(city, lot, random);
}

function isPark(lot: Lot, random: Random): boolean {
  return lot.distanceFromCenter > PARK.minDistanceFromCenter && random() < PARK.chance;
}

function addPlaza(city: BatchBuilder, { x, z }: Lot): void {
  city.box(x, BASE_HEIGHT, z, LOT_SIZE, 0.04, LOT_SIZE, COLOR.plaza);
  city.cyl(x, BASE_HEIGHT + 0.04, z, 0.18, 0.22, 0.12, COLOR.fountain);
}

function addPark(city: BatchBuilder, { x, z }: Lot, random: Random): void {
  city.box(x, BASE_HEIGHT, z, LOT_SIZE, 0.04, LOT_SIZE, COLOR.park);
  range(PARK.trees).forEach(() =>
    addTree(city, x + (random() - 0.5) * 0.45, z + (random() - 0.5) * 0.45),
  );
}

function addTree(city: BatchBuilder, x: number, z: number): void {
  city.cyl(x, BASE_HEIGHT + 0.04, z, 0.03, 0.04, 0.18, COLOR.trunk, 5);
  city.cone(x, BASE_HEIGHT + 0.2, z, 0.17, 0.4, COLOR.foliage);
}

/** Plus on est près du centre, plus l'immeuble est haut, avec un peu de hasard. */
function towerHeight(distanceFromCenter: number, random: Random): number {
  const closenessToCenter = Math.max(0, 1 - distanceFromCenter);
  const luck = 0.5 + random() * 0.8;
  return TOWER_HEIGHT.min + closenessToCenter * TOWER_HEIGHT.extraAtCenter * luck;
}

function addTower(city: BatchBuilder, lot: Lot, random: Random): void {
  const height = towerHeight(lot.distanceFromCenter, random);
  const facade = pick(random, FACADES);
  city.box(lot.x, BASE_HEIGHT, lot.z, TOWER_SIZE, height, TOWER_SIZE, facade);
  addWindowRows(city, lot, height);
  const roofSize = TOWER_SIZE + 0.04;
  city.box(lot.x, BASE_HEIGHT + height, lot.z, roofSize, 0.04, roofSize, COLOR.roof);
  if (height > TOWER_HEIGHT.skyscraper) addSkyscraperTop(city, lot, height, facade);
}

/** Bandes sombres un peu plus larges que l'immeuble, lues comme des fenêtres. */
function addWindowRows(city: BatchBuilder, { x, z }: Lot, height: number): void {
  const size = TOWER_SIZE + 0.02;
  for (let y = WINDOW.spacing; y < height - 0.1; y += WINDOW.spacing) {
    city.box(x, BASE_HEIGHT + y, z, size, WINDOW.band, size, COLOR.windows);
  }
}

function addSkyscraperTop(city: BatchBuilder, { x, z }: Lot, height: number, facade: number): void {
  const roofTop = BASE_HEIGHT + height + 0.04;
  city.box(x, roofTop, z, 0.4, 0.3, 0.4, facade);
  city.cyl(x, roofTop + 0.3, z, 0.01, 0.02, 0.4, COLOR.antenna, 5);
}

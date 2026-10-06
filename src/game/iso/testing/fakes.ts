import * as THREE from 'three';
import { BUILDINGS, type BuildingType, type TerrainType } from '../config.js';
import type { FrameLoop, FrameTime, Renderer, ResizeWatcher } from '../contracts.js';
import { Footprint } from '../domain/Footprint.js';
import { GridCell } from '../domain/GridCell.js';
import type { PlacedBuilding } from '../domain/PlacedBuilding.js';
import { Rotation } from '../domain/Rotation.js';
import type { EnginePlatform } from '../engine/browser.js';
import type { ModelCatalog } from '../render/models/ModelCatalog.js';
import type { GhostView, MarkerColor } from '../tools/Tool.js';
import type { Random } from '../util/random.js';
import { TerrainGenerator } from '../world/TerrainGenerator.js';
import { World } from '../world/World.js';

/** Un « hasard » qui renvoie toujours les mêmes valeurs, en boucle. */
export function fixedRandom(...values: number[]): Random {
  let index = 0;
  return () => values[index++ % values.length] ?? 0;
}

/** L'élément à cet index ; fait échouer le test proprement s'il n'existe pas. */
export function at<T>(items: readonly T[], index: number): T {
  const item = items[index];
  if (item === undefined) throw new Error(`Aucun élément à l'index ${index}`);
  return item;
}

export function frame(seconds: number, nowMs = 0): FrameTime {
  return { seconds, nowMs };
}

/** Un monde où toutes les cases ont le même terrain. */
export function uniformWorld(size: number, terrain: TerrainType = 'paving'): World {
  return new World(size, new TerrainGenerator([], terrain));
}

let nextTestId = 1000;
export function aBuilding(
  type: BuildingType = 'edgeDatacenter',
  column = 0,
  row = 0,
  rotation: Rotation = Rotation.NONE,
): PlacedBuilding {
  const size = rotation.apply(BUILDINGS[type].size);
  return {
    id: nextTestId++,
    type,
    rotation,
    footprint: Footprint.at(new GridCell(column, row), size),
  };
}

/** Catalogue de modèles qui fabrique de simples boîtes et compte les créations. */
export class BoxCatalog implements ModelCatalog {
  readonly created: BuildingType[] = [];

  create(type: BuildingType): THREE.Group {
    this.created.push(type);
    const group = new THREE.Group();
    group.add(new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial()));
    return group;
  }
}

/** Fantôme qui enregistre ce qu'on lui demande d'afficher. */
export class RecordingGhost implements GhostView {
  readonly calls: string[] = [];
  lastFootprint: Footprint | null = null;
  lastAllowed: boolean | null = null;
  lastColor: MarkerColor | null = null;

  showBuilding(
    type: BuildingType,
    _rotation: Rotation,
    footprint: Footprint,
    _height: number,
    allowed: boolean,
  ): void {
    this.calls.push(`building:${type}`);
    this.lastFootprint = footprint;
    this.lastAllowed = allowed;
  }

  showMarkerOnly(footprint: Footprint, _height: number, color: MarkerColor): void {
    this.calls.push(`marker:${color}`);
    this.lastFootprint = footprint;
    this.lastColor = color;
  }

  hide(): void {
    this.calls.push('hide');
  }
}

export class FakeRenderer implements Renderer {
  readonly domElement = document.createElement('canvas');
  renderCount = 0;
  size: [number, number] | null = null;
  disposed = false;

  setPixelRatio(): void {}

  setSize(width: number, height: number): void {
    this.size = [width, height];
  }

  render(): void {
    this.renderCount++;
  }

  dispose(): void {
    this.disposed = true;
  }
}

export class ManualFrameLoop implements FrameLoop {
  private onFrame: ((nowMs: number) => void) | null = null;
  stopped = false;

  start(onFrame: (nowMs: number) => void): void {
    this.onFrame = onFrame;
  }

  stop(): void {
    this.stopped = true;
    this.onFrame = null;
  }

  tick(nowMs: number): void {
    this.onFrame?.(nowMs);
  }
}

export class ManualResizeWatcher implements ResizeWatcher {
  private onResize: (() => void) | null = null;
  stopped = false;

  watch(_element: HTMLElement, onResize: () => void): void {
    this.onResize = onResize;
  }

  stop(): void {
    this.stopped = true;
  }

  trigger(): void {
    this.onResize?.();
  }
}

export class FakePlatform implements EnginePlatform {
  readonly renderer = new FakeRenderer();
  readonly frameLoop = new ManualFrameLoop();
  readonly resizeWatcher = new ManualResizeWatcher();
  readonly keyboardTarget = new EventTarget();

  createRenderer(host: HTMLElement): Renderer {
    host.appendChild(this.renderer.domElement);
    return this.renderer;
  }
}

/** Vrai si l'instance a été « cachée » (matrice d'échelle nulle). */
export function isHidden(mesh: THREE.InstancedMesh, index: number): boolean {
  const matrix = new THREE.Matrix4();
  mesh.getMatrixAt(index, matrix);
  return matrix.determinant() === 0;
}

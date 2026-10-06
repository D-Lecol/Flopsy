import type * as THREE from 'three';
import type { PlacedBuilding } from './domain/PlacedBuilding.js';

/** Tout ce qui s'affiche dans la scène expose son groupe d'objets 3D. */
export interface SceneLayer {
  readonly group: THREE.Object3D;
}

export interface FrameTime {
  readonly seconds: number;
  readonly nowMs: number;
}

/** Tout ce qui doit avancer à chaque image. */
export interface FrameUpdatable {
  update(frame: FrameTime): void;
}

export interface Disposable {
  dispose(): void;
}

/** Ce qui doit réagir quand un bâtiment apparaît ou disparaît. */
export interface BuildingObserver {
  onBuilt(building: PlacedBuilding, isStartingBuilding: boolean): void;
  onDemolished(building: PlacedBuilding): void;
}

export interface Viewport {
  width(): number;
  height(): number;
}

/** Le strict nécessaire de THREE.WebGLRenderer, pour pouvoir le simuler. */
export interface Renderer {
  readonly domElement: HTMLCanvasElement;
  setPixelRatio(ratio: number): void;
  setSize(width: number, height: number, updateStyle?: boolean): void;
  render(scene: THREE.Object3D, camera: THREE.Camera): void;
  dispose(): void;
}

export interface FrameLoop {
  start(onFrame: (nowMs: number) => void): void;
  stop(): void;
}

export interface ResizeWatcher {
  watch(element: HTMLElement, onResize: () => void): void;
  stop(): void;
}

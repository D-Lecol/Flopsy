import * as THREE from 'three';
import { AVERAGE_GROUND_HEIGHT } from '../config.js';
import type { CellPoint } from '../domain/GridCell.js';
import type { CellPicker, Pointer } from '../tools/Tool.js';
import { toGrid } from '../world/coordinates.js';

/** La zone de l'écran occupée par le canvas. */
export interface ScreenArea {
  getBoundingClientRect(): { left: number; top: number; width: number; height: number };
}

/** Trouve le point de la grille sous le curseur. */
export class GroundPicker implements CellPicker {
  private readonly raycaster = new THREE.Raycaster();
  /** Plan horizontal à hauteur du sol, où l'on fait atterrir le rayon du curseur. */
  private readonly groundPlane = new THREE.Plane(
    new THREE.Vector3(0, 1, 0),
    -AVERAGE_GROUND_HEIGHT,
  );

  constructor(
    private readonly screen: ScreenArea,
    private readonly camera: THREE.Camera,
  ) {}

  cellUnder(pointer: Pointer): CellPoint | null {
    this.raycaster.setFromCamera(this.toScreenSpace(pointer), this.camera);
    const hit = this.raycaster.ray.intersectPlane(this.groundPlane, new THREE.Vector3());
    return hit ? toGrid(hit) : null;
  }

  /** Pixels → repère d'écran de Three.js (-1 à 1, l'axe vertical vers le haut). */
  private toScreenSpace(pointer: Pointer): THREE.Vector2 {
    const area = this.screen.getBoundingClientRect();
    const fromLeft = (pointer.x - area.left) / area.width;
    const fromTop = (pointer.y - area.top) / area.height;
    return new THREE.Vector2(fromLeft * 2 - 1, 1 - fromTop * 2);
  }
}

import * as THREE from 'three';
import type { FrameTime, FrameUpdatable, Viewport } from '../contracts.js';
import { clamp, QUARTER_TURN } from '../util/math.js';
import { SmoothedNumber, SmoothedPoint } from '../util/Smoothed.js';
import type { MoveDirection } from './MoveDirection.js';

/** Inclinaison qui donne une vraie vue isométrique (35,26°). */
const ISOMETRIC_TILT = Math.atan(1 / Math.SQRT2);
const DISTANCE_FROM_FOCUS = 60;
const ZOOM_LIMITS = { min: 0.6, max: 3 };
/** Au zoom 1, portion de carte toujours visible, en cases. */
const MIN_VISIBLE = { height: 24, width: 36 };
const RESPONSIVENESS = 12; // plus grand = la caméra suit plus vite
const KEYBOARD_SPEED = 16; // cases par seconde au zoom 1

/**
 * Caméra isométrique qui regarde un point du sol (`focus`) depuis une direction
 * (`bearing`, le cap). Cap et point de mire glissent vers leur objectif.
 */
export class CameraController implements FrameUpdatable {
  readonly camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 300);
  private readonly bearing = new SmoothedNumber(Math.PI / 4, RESPONSIVENESS);
  private readonly focus = new SmoothedPoint(RESPONSIVENESS);
  private zoom = 1;

  constructor(
    private readonly viewport: Viewport,
    private readonly mapSize: number,
  ) {}

  focusPoint(): THREE.Vector3 {
    return this.focus.value();
  }

  /** Glisser à la souris : la carte suit le doigt sans retard. */
  dragByPixels(dragX: number, dragY: number): void {
    this.moveFocus(this.groundMovementForDrag(dragX, dragY));
    this.focus.jumpToGoal();
  }

  /** Clavier : la caméra glisse vers le nouvel objectif. */
  move(direction: MoveDirection, seconds: number): void {
    const distance = (KEYBOARD_SPEED / this.zoom) * seconds;
    this.moveFocus(this.alongGround(direction.right * distance, direction.forward * distance));
  }

  zoomBy(factor: number): void {
    this.zoom = clamp(this.zoom * factor, ZOOM_LIMITS.min, ZOOM_LIMITS.max);
  }

  rotateQuarterTurn(direction: 1 | -1): void {
    this.bearing.shiftGoal(direction * QUARTER_TURN);
  }

  update(frame: FrameTime): void {
    this.bearing.advance(frame.seconds);
    this.focus.advance(frame.seconds);
    this.updateProjection();
    this.placeAroundFocus();
  }

  /** Hauteur de carte visible à l'écran, en cases. */
  private visibleHeight(): number {
    return Math.max(MIN_VISIBLE.height, MIN_VISIBLE.width / this.aspectRatio()) / this.zoom;
  }

  private aspectRatio(): number {
    return this.viewport.width() / Math.max(1, this.viewport.height());
  }

  /** Mouvement au sol : `sideways` vers la droite de l'écran, `ahead` vers le fond. */
  private alongGround(sideways: number, ahead: number): THREE.Vector3 {
    const angle = this.bearing.value();
    const right = new THREE.Vector3(Math.sin(angle), 0, -Math.cos(angle));
    const forward = new THREE.Vector3(-Math.cos(angle), 0, -Math.sin(angle));
    return right.multiplyScalar(sideways).add(forward.multiplyScalar(ahead));
  }

  private groundMovementForDrag(dragX: number, dragY: number): THREE.Vector3 {
    const cellsPerPixel = this.visibleHeight() / Math.max(1, this.viewport.height());
    // Tirer la carte vers la droite revient à déplacer la caméra vers la gauche.
    const sideways = -dragX * cellsPerPixel;
    // Vue inclinée : un pixel vertical couvre plus de sol qu'un pixel horizontal.
    const ahead = (dragY * cellsPerPixel) / Math.sin(ISOMETRIC_TILT);
    return this.alongGround(sideways, ahead);
  }

  private moveFocus(movement: THREE.Vector3): void {
    this.focus.shiftGoal(movement);
    this.focus.keepGoalWithin(this.mapSize / 2);
  }

  private updateProjection(): void {
    const halfHeight = this.visibleHeight() / 2;
    const halfWidth = halfHeight * this.aspectRatio();
    Object.assign(this.camera, {
      left: -halfWidth,
      right: halfWidth,
      top: halfHeight,
      bottom: -halfHeight,
    });
    this.camera.updateProjectionMatrix();
  }

  private placeAroundFocus(): void {
    const focus = this.focus.value();
    const angle = this.bearing.value();
    const groundDistance = Math.cos(ISOMETRIC_TILT) * DISTANCE_FROM_FOCUS;
    const offset = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle)).multiplyScalar(
      groundDistance,
    );
    this.camera.position
      .copy(focus)
      .add(offset)
      .setY(Math.sin(ISOMETRIC_TILT) * DISTANCE_FROM_FOCUS);
    this.camera.lookAt(focus);
  }
}

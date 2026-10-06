import type * as THREE from 'three';
import { easeOutCubic } from '../util/smoothing.js';

const DURATION_SECONDS = 0.25;
const SQUASHED = 0.01; // hauteur de départ

interface PopIn {
  model: THREE.Object3D;
  elapsedSeconds: number;
}

/** Fait « pousser » un bâtiment du sol quand il vient d'être posé. */
export class PopInAnimations {
  private readonly running: PopIn[] = [];

  start(model: THREE.Object3D): void {
    model.scale.y = SQUASHED;
    this.running.push({ model, elapsedSeconds: 0 });
  }

  advance(seconds: number): void {
    [...this.running].forEach((popIn) => this.advanceOne(popIn, seconds));
  }

  count(): number {
    return this.running.length;
  }

  private advanceOne(popIn: PopIn, seconds: number): void {
    popIn.elapsedSeconds += seconds;
    const progress = Math.min(1, popIn.elapsedSeconds / DURATION_SECONDS);
    popIn.model.scale.y = SQUASHED + (1 - SQUASHED) * easeOutCubic(progress);
    if (progress >= 1) this.running.splice(this.running.indexOf(popIn), 1);
  }
}

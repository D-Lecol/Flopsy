import * as THREE from 'three';
import { catchUpRatio } from './smoothing.js';

/** Un nombre qui glisse en douceur vers son objectif. */
export class SmoothedNumber {
  private current: number;
  private goal: number;

  constructor(
    initial: number,
    private readonly responsiveness: number,
  ) {
    this.current = initial;
    this.goal = initial;
  }

  value(): number {
    return this.current;
  }

  shiftGoal(delta: number): void {
    this.goal += delta;
  }

  advance(seconds: number): void {
    const ratio = catchUpRatio(this.responsiveness, seconds);
    this.current += (this.goal - this.current) * ratio;
  }
}

/** Un point du sol qui glisse en douceur vers son objectif. */
export class SmoothedPoint {
  private readonly current = new THREE.Vector3();
  private readonly goal = new THREE.Vector3();

  constructor(private readonly responsiveness: number) {}

  value(): THREE.Vector3 {
    return this.current.clone();
  }

  shiftGoal(delta: THREE.Vector3): void {
    this.goal.add(delta);
  }

  /** Garde l'objectif dans un carré centré sur l'origine. */
  keepGoalWithin(halfSize: number): void {
    this.goal.clampScalar(-halfSize, halfSize);
  }

  jumpToGoal(): void {
    this.current.copy(this.goal);
  }

  advance(seconds: number): void {
    this.current.lerp(this.goal, catchUpRatio(this.responsiveness, seconds));
  }
}

import type { FrameTime } from '../contracts.js';

/** Au-delà, l'onglet était sans doute en pause : on évite un grand saut. */
const MAX_FRAME_SECONDS = 0.05;

/** Transforme l'heure de chaque image en durée écoulée depuis la précédente. */
export class FrameClock {
  private lastMs: number | null = null;

  tick(nowMs: number): FrameTime {
    const elapsedMs = this.lastMs === null ? 0 : nowMs - this.lastMs;
    this.lastMs = nowMs;
    return { nowMs, seconds: Math.min(MAX_FRAME_SECONDS, elapsedMs / 1000) };
  }
}

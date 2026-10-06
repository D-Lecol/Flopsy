export const QUARTER_TURN = Math.PI / 2;
export const FULL_TURN = Math.PI * 2;

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/** [0, 1, 2, …, count - 1] */
export function range(count: number): number[] {
  return Array.from({ length: count }, (_, index) => index);
}

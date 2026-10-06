/** Direction de -1 à 1 sur chaque axe (droite et avant positifs). */
export interface MoveDirection {
  right: number;
  forward: number;
}

export const STILL: MoveDirection = { right: 0, forward: 0 };

export interface MoveDirectionSource {
  moveDirection(): MoveDirection;
}

/** Ramène la direction à une longueur de 1 : les diagonales ne vont pas plus vite. */
export function normalized(direction: MoveDirection): MoveDirection {
  const length = Math.hypot(direction.right, direction.forward);
  if (length === 0) return STILL;
  return { right: direction.right / length, forward: direction.forward / length };
}

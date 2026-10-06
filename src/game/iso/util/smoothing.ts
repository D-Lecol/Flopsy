/**
 * Part de la distance restante parcourue pendant `seconds`.
 * Plus `responsiveness` est grand, plus on rattrape vite l'objectif.
 * Indépendant du nombre d'images par seconde.
 */
export function catchUpRatio(responsiveness: number, seconds: number): number {
  return 1 - Math.exp(-responsiveness * seconds);
}

/** Courbe de 0 à 1 qui démarre vite et finit doucement. */
export function easeOutCubic(progress: number): number {
  return 1 - Math.pow(1 - progress, 3);
}

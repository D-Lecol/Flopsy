/** Fonction qui renvoie un nombre entre 0 (inclus) et 1 (exclu). */
export type Random = () => number;

/** Générateur déterministe : la même graine donne la même suite. */
export function seededRandom(seed: number): Random {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let mixed = state;
    mixed = Math.imul(mixed ^ (mixed >>> 15), mixed | 1);
    mixed ^= mixed + Math.imul(mixed ^ (mixed >>> 7), mixed | 61);
    return ((mixed ^ (mixed >>> 14)) >>> 0) / 4294967296;
  };
}

/** Nombre entre 0 et 1 propre à une case : toujours le même pour elle. */
export function randomForCell(column: number, row: number, seed = 1): number {
  const columnPart = Math.imul(column + 1013, 73856093);
  const rowPart = Math.imul(row + 7919, 19349663);
  return seededRandom(columnPart ^ rowPart ^ seed)();
}

/** Passe de 0 à 1 en courbe en S plutôt qu'en ligne droite. */
function smoothStep(t: number): number {
  return t * t * (3 - 2 * t);
}

function mix(from: number, to: number, amount: number): number {
  return from + (to - from) * amount;
}

/**
 * Bruit doux entre 0 et 1 : des valeurs aléatoires fixes aux coins d'une
 * grille, mélangées progressivement entre les coins. Deux points proches ont
 * des valeurs proches, d'où des zones naturelles (prairies, rives de lac).
 */
export function smoothNoise(x: number, z: number, seed = 1): number {
  const left = Math.floor(x);
  const top = Math.floor(z);
  const corner = (dx: number, dz: number) => randomForCell(left + dx, top + dz, seed);
  const towardsRight = smoothStep(x - left);
  const topEdge = mix(corner(0, 0), corner(1, 0), towardsRight);
  const bottomEdge = mix(corner(0, 1), corner(1, 1), towardsRight);
  return mix(topEdge, bottomEdge, smoothStep(z - top));
}

/** Un tableau qui contient au moins un élément. */
export type NonEmpty<T> = readonly [T, ...T[]];

/** Choisit un élément au hasard. */
export function pick<T>(random: Random, options: NonEmpty<T>): T {
  return options[Math.floor(random() * options.length)] ?? options[0];
}

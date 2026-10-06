import { describe, expect, it } from 'vitest';
import { clamp, range } from './math.js';

describe('clamp', () => {
  it('laisse passer une valeur dans les bornes', () => expect(clamp(5, 0, 10)).toBe(5));
  it('ramène une valeur trop petite au minimum', () => expect(clamp(-3, 0, 10)).toBe(0));
  it('ramène une valeur trop grande au maximum', () => expect(clamp(42, 0, 10)).toBe(10));
});

describe('range', () => {
  it('énumère de 0 à count - 1', () => expect(range(4)).toEqual([0, 1, 2, 3]));
  it('est vide pour 0', () => expect(range(0)).toEqual([]));
});

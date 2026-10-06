import { describe, expect, it } from 'vitest';
import { RareEarthStock } from './RareEarthStock.js';

describe('RareEarthStock', () => {
  it('peut payer un coût inférieur ou égal au stock', () => {
    const stock = new RareEarthStock(100);
    expect(stock.canPay(100)).toBe(true);
    expect(stock.canPay(101)).toBe(false);
  });

  it('diminue quand on paie', () => {
    const stock = new RareEarthStock(100);
    stock.pay(30);
    expect(stock.remaining()).toBe(70);
  });

  it('refuse de payer plus que le stock', () => {
    const stock = new RareEarthStock(10);
    expect(() => stock.pay(11)).toThrow();
    expect(stock.remaining()).toBe(10);
  });
});

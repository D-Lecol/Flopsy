import * as THREE from 'three';
import { describe, expect, it } from 'vitest';
import { SmoothedNumber, SmoothedPoint } from './Smoothed.js';

describe('SmoothedNumber', () => {
  it('commence à sa valeur initiale', () => {
    expect(new SmoothedNumber(3, 10).value()).toBe(3);
  });

  it("ne bouge pas tant qu'on ne le fait pas avancer", () => {
    const number = new SmoothedNumber(0, 10);
    number.shiftGoal(5);
    expect(number.value()).toBe(0);
  });

  it("se rapproche de l'objectif sans le dépasser", () => {
    const number = new SmoothedNumber(0, 10);
    number.shiftGoal(5);
    number.advance(0.05);
    expect(number.value()).toBeGreaterThan(0);
    expect(number.value()).toBeLessThan(5);
  });

  it("finit par atteindre l'objectif", () => {
    const number = new SmoothedNumber(0, 10);
    number.shiftGoal(5);
    number.advance(10);
    expect(number.value()).toBeCloseTo(5);
  });
});

describe('SmoothedPoint', () => {
  it("glisse vers l'objectif en avançant", () => {
    const point = new SmoothedPoint(10);
    point.shiftGoal(new THREE.Vector3(4, 0, 0));
    point.advance(0.05);
    expect(point.value().x).toBeGreaterThan(0);
    expect(point.value().x).toBeLessThan(4);
  });

  it("saute directement à l'objectif sur demande", () => {
    const point = new SmoothedPoint(10);
    point.shiftGoal(new THREE.Vector3(4, 0, -2));
    point.jumpToGoal();
    expect(point.value()).toEqual(new THREE.Vector3(4, 0, -2));
  });

  it("garde l'objectif dans un carré donné", () => {
    const point = new SmoothedPoint(10);
    point.shiftGoal(new THREE.Vector3(50, 0, -50));
    point.keepGoalWithin(12);
    point.jumpToGoal();
    expect(point.value()).toEqual(new THREE.Vector3(12, 0, -12));
  });

  it('renvoie une copie, que l’appelant ne peut pas modifier', () => {
    const point = new SmoothedPoint(10);
    point.value().set(9, 9, 9);
    expect(point.value()).toEqual(new THREE.Vector3());
  });
});

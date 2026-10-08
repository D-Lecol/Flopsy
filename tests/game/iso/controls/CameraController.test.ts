import { describe, expect, it } from 'vitest';
import { frame } from '../testing/fakes.js';
import { CameraController } from '../../../../src/game/iso/controls/CameraController.js';

const viewport = { width: () => 800, height: () => 600 };
const newCamera = () => new CameraController(viewport, 24);

describe('CameraController', () => {
  it('regarde le centre de la carte au départ', () => {
    expect(newCamera().focusPoint().toArray()).toEqual([0, 0, 0]);
  });

  it('suit immédiatement un glissement de souris', () => {
    const camera = newCamera();
    camera.dragByPixels(100, 0);
    expect(camera.focusPoint().length()).toBeGreaterThan(0);
  });

  it('glisse doucement quand on se déplace au clavier', () => {
    const camera = newCamera();
    camera.move({ right: 1, forward: 0 }, 0.25);
    camera.update(frame(0.016));
    const afterOneFrame = camera.focusPoint().length();
    camera.update(frame(1));
    const afterOneSecond = camera.focusPoint().length();
    expect(afterOneFrame).toBeGreaterThan(0);
    expect(afterOneFrame).toBeLessThan(afterOneSecond);
  });

  it('ne sort jamais de la carte', () => {
    const camera = newCamera();
    camera.dragByPixels(100_000, 100_000);
    const focus = camera.focusPoint();
    expect(Math.abs(focus.x)).toBeLessThanOrEqual(12);
    expect(Math.abs(focus.z)).toBeLessThanOrEqual(12);
  });

  it('montre moins de carte quand on zoome', () => {
    const camera = newCamera();
    camera.update(frame(0));
    const before = camera.camera.top;
    camera.zoomBy(2);
    camera.update(frame(0));
    expect(camera.camera.top).toBeCloseTo(before / 2);
  });

  it('limite le zoom', () => {
    const camera = newCamera();
    camera.zoomBy(1000);
    camera.update(frame(0));
    const atMaximum = camera.camera.top;
    camera.zoomBy(10);
    camera.update(frame(0));
    expect(camera.camera.top).toBe(atMaximum);
  });

  it("respecte les proportions de l'écran", () => {
    const camera = newCamera();
    camera.update(frame(0));
    expect(camera.camera.right / camera.camera.top).toBeCloseTo(800 / 600);
  });

  it("pivote d'un quart de tour autour du point de mire", () => {
    const camera = newCamera();
    camera.update(frame(0));
    expect(camera.camera.position.x).toBeGreaterThan(0);
    camera.rotateQuarterTurn(1);
    camera.update(frame(5));
    expect(camera.camera.position.x).toBeLessThan(0);
    expect(camera.camera.position.z).toBeGreaterThan(0);
  });

  it('se place au-dessus du sol', () => {
    const camera = newCamera();
    camera.update(frame(0));
    expect(camera.camera.position.y).toBeGreaterThan(0);
  });
});

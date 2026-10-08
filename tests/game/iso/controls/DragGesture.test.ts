import { describe, expect, it } from 'vitest';
import { DragGesture } from '../../../../src/game/iso/controls/DragGesture.js';

describe('DragGesture', () => {
  it("reste un clic tant qu'on bouge à peine", () => {
    const gesture = new DragGesture({ x: 100, y: 100 });
    expect(gesture.moveTo({ x: 102, y: 101 })).toBeNull();
    expect(gesture.isClick()).toBe(true);
  });

  it('devient un glissement au-delà de quelques pixels', () => {
    const gesture = new DragGesture({ x: 100, y: 100 });
    expect(gesture.moveTo({ x: 110, y: 100 })).toEqual({ dx: 10, dy: 0 });
    expect(gesture.isClick()).toBe(false);
  });

  it('donne le déplacement depuis le point précédent', () => {
    const gesture = new DragGesture({ x: 0, y: 0 });
    gesture.moveTo({ x: 20, y: 0 });
    expect(gesture.moveTo({ x: 25, y: 3 })).toEqual({ dx: 5, dy: 3 });
  });

  it("reste un glissement même si l'on revient au point de départ", () => {
    const gesture = new DragGesture({ x: 0, y: 0 });
    gesture.moveTo({ x: 20, y: 0 });
    gesture.moveTo({ x: 0, y: 0 });
    expect(gesture.isClick()).toBe(false);
  });
});

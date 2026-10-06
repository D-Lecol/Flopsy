import { describe, expect, it, vi } from 'vitest';
import { PointerInput, type PointerActions } from './PointerInput.js';

function setup() {
  const surface = document.createElement('div');
  const actions: PointerActions = {
    onPointerMove: vi.fn(),
    onClick: vi.fn(),
    onDrag: vi.fn(),
    onZoom: vi.fn(),
  };
  const input = new PointerInput(surface, actions);
  const fire = (type: string, x: number, y: number) =>
    surface.dispatchEvent(new PointerEvent(type, { clientX: x, clientY: y, pointerId: 1 }));
  return { surface, actions, input, fire };
}

describe('PointerInput', () => {
  it('signale le survol quand aucun bouton n’est appuyé', () => {
    const { actions, fire } = setup();
    fire('pointermove', 10, 20);
    expect(actions.onPointerMove).toHaveBeenCalledWith({ x: 10, y: 20 });
  });

  it('signale un clic quand on appuie et relâche sans bouger', () => {
    const { actions, fire } = setup();
    fire('pointerdown', 50, 50);
    fire('pointerup', 50, 50);
    expect(actions.onClick).toHaveBeenCalledWith({ x: 50, y: 50 });
  });

  it('signale un glissement, et pas de clic, quand on bouge en appuyant', () => {
    const { actions, fire } = setup();
    fire('pointerdown', 50, 50);
    fire('pointermove', 80, 50);
    fire('pointerup', 80, 50);
    expect(actions.onDrag).toHaveBeenCalledWith(30, 0);
    expect(actions.onClick).not.toHaveBeenCalled();
  });

  it('zoome avec la molette, en avant quand on la pousse', () => {
    const { actions, surface } = setup();
    surface.dispatchEvent(new WheelEvent('wheel', { deltaY: -100, cancelable: true }));
    expect(vi.mocked(actions.onZoom).mock.lastCall?.[0]).toBeGreaterThan(1);
  });

  it("n'écoute plus rien après dispose", () => {
    const { actions, fire, input } = setup();
    input.dispose();
    fire('pointermove', 10, 20);
    expect(actions.onPointerMove).not.toHaveBeenCalled();
  });
});

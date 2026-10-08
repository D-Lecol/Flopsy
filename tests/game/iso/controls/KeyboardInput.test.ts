import { describe, expect, it, vi } from 'vitest';
import {
  KeyboardInput,
  type ShortcutActions,
} from '../../../../src/game/iso/controls/KeyboardInput.js';

function setup() {
  const target = document.createElement('div');
  document.body.appendChild(target);
  const actions: ShortcutActions = {
    onRotateView: vi.fn(),
    onRotateBuilding: vi.fn(),
    onCancel: vi.fn(),
    onConfirm: vi.fn(),
  };
  const input = new KeyboardInput(actions, target);
  const press = (key: string, options: KeyboardEventInit = {}) =>
    target.dispatchEvent(
      new KeyboardEvent('keydown', {
        key,
        bubbles: true,
        cancelable: true,
        ...options,
      }),
    );
  const release = (key: string) =>
    target.dispatchEvent(new KeyboardEvent('keyup', { key }));
  return { target, actions, input, press, release };
}

describe('KeyboardInput', () => {
  it.each([
    ['a', 'onRotateView'],
    ['e', 'onRotateView'],
    ['r', 'onRotateBuilding'],
    ['Escape', 'onCancel'],
    [' ', 'onConfirm'],
  ] as const)('déclenche une action pour la touche « %s »', (key, action) => {
    const { actions, press } = setup();
    press(key);
    expect(actions[action]).toHaveBeenCalledOnce();
  });

  it('pivote la vue dans les deux sens', () => {
    const { actions, press } = setup();
    press('a');
    press('e');
    expect(actions.onRotateView).toHaveBeenNthCalledWith(1, -1);
    expect(actions.onRotateView).toHaveBeenNthCalledWith(2, 1);
  });

  it('ignore les raccourcis avec Ctrl, Cmd ou Alt', () => {
    const { actions, press } = setup();
    press('r', { ctrlKey: true });
    expect(actions.onRotateBuilding).not.toHaveBeenCalled();
  });

  it('ignore les touches tapées dans un champ de texte', () => {
    const { actions, target } = setup();
    const field = document.createElement('input');
    target.appendChild(field);
    field.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'r', bubbles: true }),
    );
    expect(actions.onRotateBuilding).not.toHaveBeenCalled();
  });

  it("ne bouge pas quand aucune touche de déplacement n'est enfoncée", () => {
    expect(setup().input.moveDirection()).toEqual({ right: 0, forward: 0 });
  });

  it('avance avec Z et recule avec S', () => {
    const { input, press, release } = setup();
    press('z');
    expect(input.moveDirection()).toEqual({ right: 0, forward: 1 });
    release('z');
    press('s');
    expect(input.moveDirection()).toEqual({ right: 0, forward: -1 });
  });

  it('va à gauche avec Q et à droite avec les flèches', () => {
    const { input, press, release } = setup();
    press('q');
    expect(input.moveDirection().right).toBe(-1);
    release('q');
    press('ArrowRight');
    expect(input.moveDirection().right).toBe(1);
  });

  it('ne va pas plus vite en diagonale', () => {
    const { input, press } = setup();
    press('z');
    press('d');
    const { right, forward } = input.moveDirection();
    expect(Math.hypot(right, forward)).toBeCloseTo(1);
  });

  it("s'arrête quand la fenêtre perd le focus", () => {
    const { input, press, target } = setup();
    press('z');
    target.dispatchEvent(new Event('blur'));
    expect(input.moveDirection()).toEqual({ right: 0, forward: 0 });
  });

  it("n'écoute plus rien après dispose", () => {
    const { actions, input, press } = setup();
    input.dispose();
    press('r');
    expect(actions.onRotateBuilding).not.toHaveBeenCalled();
  });
});

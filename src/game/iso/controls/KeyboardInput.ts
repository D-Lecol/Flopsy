import type { Disposable } from '../contracts.js';
import { HeldKeys } from './HeldKeys.js';
import { listen, type StopListening } from './listen.js';
import { normalized, type MoveDirection, type MoveDirectionSource } from './MoveDirection.js';

export interface ShortcutActions {
  onRotateView(direction: 1 | -1): void;
  onRotateBuilding(): void;
  onCancel(): void;
  onConfirm(): void;
}

const MOVE_KEYS = {
  left: ['q', 'arrowleft'],
  right: ['d', 'arrowright'],
  forward: ['z', 'arrowup'],
  backward: ['s', 'arrowdown'],
};

/** Clavier : raccourcis ponctuels, et touches maintenues pour déplacer la vue. */
export class KeyboardInput implements Disposable, MoveDirectionSource {
  private readonly heldKeys = new HeldKeys();
  private readonly stopListening: StopListening[];

  constructor(
    private readonly actions: ShortcutActions,
    target: EventTarget = window,
  ) {
    this.stopListening = [
      listen<KeyboardEvent>(target, 'keydown', (event) => this.press(event)),
      listen<KeyboardEvent>(target, 'keyup', (event) => this.heldKeys.release(keyOf(event))),
      // Sans ça, quitter l'onglet touche enfoncée ferait glisser la caméra sans fin.
      listen(target, 'blur', () => this.heldKeys.releaseAll()),
    ];
  }

  dispose(): void {
    this.stopListening.forEach((stop) => stop());
  }

  moveDirection(): MoveDirection {
    return normalized({
      right: this.axis(MOVE_KEYS.left, MOVE_KEYS.right),
      forward: this.axis(MOVE_KEYS.backward, MOVE_KEYS.forward),
    });
  }

  private axis(negativeKeys: string[], positiveKeys: string[]): number {
    return (
      Number(this.heldKeys.isAnyHeld(positiveKeys)) - Number(this.heldKeys.isAnyHeld(negativeKeys))
    );
  }

  private press(event: KeyboardEvent): void {
    if (isTypingInAField(event.target) || hasModifier(event)) return;
    this.heldKeys.press(keyOf(event));
    const shortcut = this.shortcuts()[keyOf(event)];
    if (!shortcut) return;
    event.preventDefault();
    shortcut();
  }

  /** Un appui = une action. */
  private shortcuts(): Record<string, () => void> {
    return {
      a: () => this.actions.onRotateView(-1),
      e: () => this.actions.onRotateView(1),
      r: () => this.actions.onRotateBuilding(),
      escape: () => this.actions.onCancel(),
      ' ': () => this.actions.onConfirm(),
    };
  }
}

function keyOf(event: KeyboardEvent): string {
  return event.key.toLowerCase();
}

function isTypingInAField(target: EventTarget | null): boolean {
  const tagName = (target as HTMLElement | null)?.tagName ?? '';
  return ['INPUT', 'TEXTAREA', 'SELECT'].includes(tagName);
}

/** Ctrl+R, Cmd+E… ne doivent pas déclencher nos raccourcis. */
function hasModifier(event: KeyboardEvent): boolean {
  return event.ctrlKey || event.metaKey || event.altKey;
}

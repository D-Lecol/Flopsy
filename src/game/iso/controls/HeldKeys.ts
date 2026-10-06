/** Se souvient des touches enfoncées (en minuscules). */
export class HeldKeys {
  private readonly pressed = new Set<string>();

  press(key: string): void {
    this.pressed.add(key);
  }

  release(key: string): void {
    this.pressed.delete(key);
  }

  releaseAll(): void {
    this.pressed.clear();
  }

  isAnyHeld(keys: readonly string[]): boolean {
    return keys.some((key) => this.pressed.has(key));
  }
}

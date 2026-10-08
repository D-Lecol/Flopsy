import { describe, expect, it, vi } from 'vitest';
import { START_LAYOUT } from '../../../../src/game/iso/config.js';
import { GameState } from '../../../../src/game/iso/domain/GameState.js';
import { at, FakePlatform } from '../testing/fakes.js';
import { IsoMapEngine } from '../../../../src/game/iso/engine/IsoMapEngine.js';

function setup() {
  const host = document.createElement('div');
  Object.defineProperty(host, 'clientWidth', { value: 800 });
  Object.defineProperty(host, 'clientHeight', { value: 600 });
  const platform = new FakePlatform();
  const state = new GameState();
  const engine = new IsoMapEngine(host, state, platform);
  const press = (key: string) =>
    platform.keyboardTarget.dispatchEvent(
      new KeyboardEvent('keydown', { key }),
    );
  return { host, platform, state, engine, press };
}

describe('IsoMapEngine', () => {
  it("ajoute le canvas dans l'élément hôte", () => {
    const { host, platform } = setup();
    expect(host.contains(platform.renderer.domElement)).toBe(true);
  });

  it('pose les bâtiments de départ', () => {
    expect(setup().state.directory().all()).toHaveLength(START_LAYOUT.length);
  });

  it("adapte le rendu à la taille de l'hôte, au départ et à chaque redimensionnement", () => {
    const { platform } = setup();
    expect(platform.renderer.size).toEqual([800, 600]);
    platform.renderer.size = null;
    platform.resizeWatcher.trigger();
    expect(platform.renderer.size).toEqual([800, 600]);
  });

  it('dessine la scène à chaque image', () => {
    const { platform } = setup();
    platform.frameLoop.tick(0);
    platform.frameLoop.tick(16);
    expect(platform.renderer.renderCount).toBe(2);
  });

  it("annonce l'outil choisi", () => {
    const { engine } = setup();
    const onToolChange = vi.fn();
    engine.events.on('toolChange', onToolChange);
    engine.setTool('smrPlant');
    expect(onToolChange).toHaveBeenCalledWith('smrPlant');
  });

  it("désélectionne l'outil avec Échap", () => {
    const { engine, press } = setup();
    const onToolChange = vi.fn();
    engine.setTool('smrPlant');
    engine.events.on('toolChange', onToolChange);
    press('Escape');
    expect(onToolChange).toHaveBeenCalledWith(null);
  });

  it('accepte zoom et rotation de la vue sans erreur', () => {
    const { engine, platform } = setup();
    engine.zoomBy(2);
    engine.rotateView(1);
    expect(() => platform.frameLoop.tick(16)).not.toThrow();
  });

  describe('dispose', () => {
    it('arrête la boucle et la surveillance de taille', () => {
      const { engine, platform } = setup();
      engine.dispose();
      expect(platform.frameLoop.stopped).toBe(true);
      expect(platform.resizeWatcher.stopped).toBe(true);
    });

    it('libère le rendu et retire le canvas', () => {
      const { engine, host, platform } = setup();
      engine.dispose();
      expect(platform.renderer.disposed).toBe(true);
      expect(host.contains(platform.renderer.domElement)).toBe(false);
    });

    it("n'écoute plus le clavier", () => {
      const { engine, press } = setup();
      engine.setTool('smrPlant');
      engine.dispose();
      const onToolChange = vi.fn();
      engine.events.on('toolChange', onToolChange);
      press('Escape');
      expect(onToolChange).not.toHaveBeenCalled();
    });

    it('ne réagit plus aux constructions', () => {
      const { engine, state } = setup();
      engine.dispose();
      expect(() =>
        state.demolish(at(state.directory().all(), 1).id),
      ).not.toThrow();
    });
  });
});

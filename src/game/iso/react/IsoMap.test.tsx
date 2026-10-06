import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { GameState } from '../domain/GameState.js';
import type { MapEngine } from '../engine/IsoMapEngine.js';
import type { ToolId } from '../tools/Tool.js';
import { IsoMap, type EngineFactory } from './IsoMap.js';

beforeAll(() => {
  (globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
});

function setup() {
  const engine: MapEngine = { setTool: vi.fn(), dispose: vi.fn() };
  const createEngine = vi.fn<EngineFactory>(() => engine);
  const state = new GameState();
  const root: Root = createRoot(document.body.appendChild(document.createElement('div')));
  const render = (tool: ToolId | null) =>
    act(() => root.render(<IsoMap state={state} tool={tool} createEngine={createEngine} />));
  return { engine, createEngine, state, root, render };
}

describe('IsoMap', () => {
  it('crée le moteur dans son élément, avec l’état du jeu', () => {
    const { createEngine, state, render } = setup();
    render(null);
    expect(createEngine).toHaveBeenCalledOnce();
    expect(createEngine.mock.lastCall?.[0]).toBeInstanceOf(HTMLDivElement);
    expect(createEngine.mock.lastCall?.[1]).toBe(state);
  });

  it("transmet l'outil choisi au moteur, et ses changements", () => {
    const { engine, render } = setup();
    render('smrPlant');
    render('demolish');
    expect(engine.setTool).toHaveBeenNthCalledWith(1, 'smrPlant');
    expect(engine.setTool).toHaveBeenLastCalledWith('demolish');
  });

  it("ne recrée pas le moteur quand seul l'outil change", () => {
    const { createEngine, render } = setup();
    render('smrPlant');
    render('demolish');
    expect(createEngine).toHaveBeenCalledOnce();
  });

  it('libère le moteur au démontage', () => {
    const { engine, root, render } = setup();
    render(null);
    act(() => root.unmount());
    expect(engine.dispose).toHaveBeenCalledOnce();
  });
});

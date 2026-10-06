import { useEffect, useRef } from 'react';
import type { GameState } from '../domain/GameState.js';
import { IsoMapEngine, type MapEngine } from '../engine/IsoMapEngine.js';
import type { ToolId } from '../tools/Tool.js';

export type EngineFactory = (host: HTMLElement, state: GameState) => MapEngine;

const createIsoMapEngine: EngineFactory = (host, state) =>
  new IsoMapEngine(host, state);

interface Props {
  state: GameState;
  tool: ToolId | null;
  onEngine?: (engine: MapEngine | null) => void;
  /** Remplaçable dans les tests. */
  createEngine?: EngineFactory;
}

/** Adaptateur React : monte le moteur dans un div et lui transmet l'outil choisi. */
export function IsoMap({
  state,
  tool,
  onEngine,
  createEngine = createIsoMapEngine,
}: Readonly<Props>) {
  const host = useRef<HTMLDivElement>(null);
  const engine = useRef<MapEngine | null>(null);

  useEffect(() => {
    if (!host.current) return;
    const created = createEngine(host.current, state);
    engine.current = created;
    onEngine?.(created);
    return () => {
      created.dispose();
      engine.current = null;
      onEngine?.(null);
    };
  }, [state, createEngine, onEngine]);

  useEffect(() => {
    engine.current?.setTool(tool);
  }, [tool]);

  return (
    <div
      ref={host}
      style={{ position: 'relative', width: '100%', height: '100%' }}
    />
  );
}

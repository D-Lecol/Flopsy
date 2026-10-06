import { useState } from 'react';
import { GameState, IsoMap, type ToolId } from '../iso/index.js';

interface GameMapProps {
  tool?: ToolId | null;
}

export default function GameMap({ tool = 'edgeDatacenter' }: GameMapProps) {
  const [state] = useState(() => new GameState());
  return <IsoMap state={state} tool={tool} />;
}

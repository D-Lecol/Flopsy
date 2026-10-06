import { PLAYER_BUILDINGS } from '../config.js';
import type { ConstructionSite, DemolitionSite } from '../domain/GameState.js';
import type { BuildableArea, OccupancyMap } from '../world/World.js';
import { ConstructionTool } from './ConstructionTool.js';
import { DemolitionTool } from './DemolitionTool.js';
import type { Tool, ToolId } from './Tool.js';

/** Les outils disponibles, rangés par identifiant. */
export class ToolBox {
  constructor(private readonly tools: ReadonlyMap<ToolId, Tool>) {}

  get(id: ToolId): Tool {
    const tool = this.tools.get(id);
    if (!tool) throw new Error(`Outil inconnu : ${id}`);
    return tool;
  }

  ids(): ToolId[] {
    return [...this.tools.keys()];
  }
}

export function createToolBox(
  map: BuildableArea & OccupancyMap,
  site: ConstructionSite & DemolitionSite,
): ToolBox {
  const tools = new Map<ToolId, Tool>(
    PLAYER_BUILDINGS.map((type) => [type, new ConstructionTool(type, map, site)]),
  );
  tools.set('demolish', new DemolitionTool(map, site));
  return new ToolBox(tools);
}

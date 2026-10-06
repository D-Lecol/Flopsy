import { BUILDINGS } from '../config.js';
import { Footprint } from '../domain/Footprint.js';
import type { DemolitionSite } from '../domain/GameState.js';
import { GridCell, type CellPoint } from '../domain/GridCell.js';
import type { PlacedBuilding } from '../domain/PlacedBuilding.js';
import type { GroundHeights, OccupancyMap } from '../world/World.js';
import type { Aim, GhostView, Tool } from './Tool.js';

/** Démolit le bâtiment sous le curseur, s'il est démolissable. */
export class DemolitionTool implements Tool {
  constructor(
    private readonly map: OccupancyMap & GroundHeights,
    private readonly site: DemolitionSite,
  ) {}

  aimAt(cursor: CellPoint): Aim {
    const cell = GridCell.under(cursor);
    const occupantId = this.map.contains(cell) ? this.map.occupantAt(cell) : null;
    const target = occupantId === null ? undefined : this.site.buildingWithId(occupantId);
    return new DemolitionAim(cell, target, this.map, this.site);
  }
}

class DemolitionAim implements Aim {
  constructor(
    private readonly cell: GridCell,
    private readonly target: PlacedBuilding | undefined,
    private readonly map: OccupancyMap & GroundHeights,
    private readonly site: DemolitionSite,
  ) {}

  preview(ghost: GhostView): void {
    if (!this.map.contains(this.cell)) return ghost.hide();
    const footprint = this.target?.footprint ?? Footprint.single(this.cell);
    const color = this.demolishable() ? 'demolish' : 'blocked';
    ghost.showMarkerOnly(footprint, this.map.groundHeightUnder(footprint), color);
  }

  apply(): void {
    const target = this.demolishable();
    if (target) this.site.demolish(target.id);
  }

  /** Le bâtiment visé, seulement s'il peut être démoli. */
  private demolishable(): PlacedBuilding | undefined {
    return this.target && BUILDINGS[this.target.type].demolishable ? this.target : undefined;
  }
}

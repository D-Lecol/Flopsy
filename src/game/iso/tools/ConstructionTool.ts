import { BUILDINGS, MAP_SIZE, type BuildingType } from '../config.js';
import { Footprint } from '../domain/Footprint.js';
import type { ConstructionSite } from '../domain/GameState.js';
import type { CellPoint } from '../domain/GridCell.js';
import type { Rotation } from '../domain/Rotation.js';
import type { BuildableArea } from '../world/World.js';
import type { Aim, GhostView, Tool } from './Tool.js';

/** Pose un type de bâtiment, centré sous le curseur. */
export class ConstructionTool implements Tool {
  constructor(
    private readonly type: BuildingType,
    private readonly area: BuildableArea,
    private readonly site: ConstructionSite,
    private readonly mapSize = MAP_SIZE,
  ) {}

  aimAt(cursor: CellPoint, rotation: Rotation): Aim {
    const size = rotation.apply(BUILDINGS[this.type].size);
    const footprint = Footprint.centeredOn(cursor, size, this.mapSize);
    return new ConstructionAim(this.type, footprint, rotation, this.area, this.site);
  }
}

class ConstructionAim implements Aim {
  constructor(
    private readonly type: BuildingType,
    private readonly footprint: Footprint,
    private readonly rotation: Rotation,
    private readonly area: BuildableArea,
    private readonly site: ConstructionSite,
  ) {}

  preview(ghost: GhostView): void {
    const groundHeight = this.area.groundHeightUnder(this.footprint);
    ghost.showBuilding(this.type, this.rotation, this.footprint, groundHeight, this.isAllowed());
  }

  apply(): void {
    if (!this.site.canAfford(this.type)) return this.refuse('not-enough-rare-earths');
    if (!this.area.canBuildOn(this.footprint)) return this.refuse('blocked');
    this.site.construct(this.type, this.footprint.corner(), this.rotation);
  }

  private isAllowed(): boolean {
    return this.site.canAfford(this.type) && this.area.canBuildOn(this.footprint);
  }

  private refuse(reason: 'not-enough-rare-earths' | 'blocked'): void {
    this.site.refuse(this.type, this.footprint, reason);
  }
}

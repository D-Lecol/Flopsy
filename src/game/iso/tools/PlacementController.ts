import type { FrameUpdatable } from '../contracts.js';
import type { CellPoint } from '../domain/GridCell.js';
import { Rotation } from '../domain/Rotation.js';
import type { Aim, CellPicker, GhostView, Pointer, Tool, ToolId } from './Tool.js';
import type { ToolBox } from './ToolBox.js';

/** Garde l'outil choisi et la rotation, montre l'aperçu, applique au clic. */
export class PlacementController implements FrameUpdatable {
  private activeTool: Tool | null = null;
  private rotation = Rotation.NONE;
  private pointer: Pointer | null = null;

  constructor(
    private readonly picker: CellPicker,
    private readonly ghost: GhostView,
    private readonly tools: ToolBox,
    private readonly onToolChange: (id: ToolId | null) => void = () => {},
  ) {}

  selectTool(id: ToolId | null): void {
    this.activeTool = id === null ? null : this.tools.get(id);
    this.onToolChange(id);
  }

  rotateBuilding(): void {
    this.rotation = this.rotation.next();
  }

  pointAt(pointer: Pointer): void {
    this.pointer = pointer;
  }

  /** À chaque image : l'aperçu suit aussi quand la caméra bouge sous le curseur. */
  update(): void {
    const aim = this.currentAim();
    if (!aim) return this.ghost.hide();
    aim.preview(this.ghost);
  }

  confirm(): void {
    this.currentAim()?.apply();
    this.update();
  }

  private currentAim(): Aim | null {
    const cursor = this.cursor();
    if (!cursor || !this.activeTool) return null;
    return this.activeTool.aimAt(cursor, this.rotation);
  }

  private cursor(): CellPoint | null {
    return this.pointer ? this.picker.cellUnder(this.pointer) : null;
  }
}

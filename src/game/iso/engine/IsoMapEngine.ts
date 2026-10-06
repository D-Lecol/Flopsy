import * as THREE from 'three';
import { MAP_SIZE } from '../config.js';
import type { Disposable, FrameUpdatable, Renderer } from '../contracts.js';
import { CameraController } from '../controls/CameraController.js';
import { GroundPicker } from '../controls/GroundPicker.js';
import {
  KeyboardInput,
  type ShortcutActions,
} from '../controls/KeyboardInput.js';
import { KeyboardPanning } from '../controls/KeyboardPanning.js';
import { type PointerActions, PointerInput } from '../controls/PointerInput.js';
import type { GameState } from '../domain/GameState.js';
import { createLights } from '../render/stage.js';
import { PlacementController } from '../tools/PlacementController.js';
import type { ToolId } from '../tools/Tool.js';
import { createToolBox } from '../tools/ToolBox.js';
import { Emitter } from '../util/Emitter.js';
import { assembleMap, placeStartingBuildings } from './assembleMap.js';
import {
  browserPlatform,
  ElementViewport,
  type EnginePlatform,
} from './browser.js';
import { connectObservers } from './connectObservers.js';
import { FrameClock } from './FrameClock.js';

export interface EngineEvents {
  toolChange: ToolId | null;
}

/** Ce que l'interface (React ou autre) peut demander au moteur. */
export interface MapEngine extends Disposable {
  setTool(id: ToolId | null): void;
  rotateView(direction: 1 | -1): void;
  zoomBy(factor: number): void;
}

const MAX_PIXEL_RATIO = 2;

/** Assemble la scène, relie les entrées et fait tourner la boucle d'affichage. */
export class IsoMapEngine implements MapEngine {
  readonly events = new Emitter<EngineEvents>();
  private readonly scene = new THREE.Scene();
  private readonly clock = new FrameClock();
  private readonly renderer: Renderer;
  private readonly camera: CameraController;
  private readonly placement: PlacementController;
  private readonly updatables: FrameUpdatable[];
  private readonly disposables: Disposable[];

  constructor(
    private readonly host: HTMLElement,
    state: GameState,
    private readonly platform: EnginePlatform = browserPlatform(),
  ) {
    this.renderer = platform.createRenderer(host);
    this.camera = new CameraController(new ElementViewport(host), MAP_SIZE);
    const map = assembleMap(state);
    this.scene.add(
      ...createLights(),
      ...map.layers.map((layer) => layer.group),
    );
    const stopObserving = connectObservers(state.events, map.observers);
    placeStartingBuildings(state);

    const picker = new GroundPicker(
      this.renderer.domElement,
      this.camera.camera,
    );
    const tools = createToolBox(map.world, state);
    this.placement = new PlacementController(picker, map.ghost, tools, (id) =>
      this.events.emit('toolChange', id),
    );
    const keyboard = new KeyboardInput(
      this.shortcutActions(),
      platform.keyboardTarget,
    );
    const pointer = new PointerInput(
      this.renderer.domElement,
      this.pointerActions(),
    );

    this.updatables = [
      new KeyboardPanning(keyboard, this.camera),
      this.camera,
      this.placement,
      ...map.animated,
    ];
    this.disposables = [pointer, keyboard, { dispose: stopObserving }];
    this.start();
  }

  setTool(id: ToolId | null): void {
    this.placement.selectTool(id);
  }

  rotateView(direction: 1 | -1): void {
    this.camera.rotateQuarterTurn(direction);
  }

  zoomBy(factor: number): void {
    this.camera.zoomBy(factor);
  }

  dispose(): void {
    this.platform.frameLoop.stop();
    this.platform.resizeWatcher.stop();
    this.disposables.forEach((disposable) => disposable.dispose());
    this.renderer.dispose();
    this.renderer.domElement.remove();
  }

  private start(): void {
    this.platform.resizeWatcher.watch(this.host, () => this.resizeCanvas());
    this.resizeCanvas();
    this.platform.frameLoop.start((nowMs) => this.renderFrame(nowMs));
  }

  private renderFrame(nowMs: number): void {
    const frame = this.clock.tick(nowMs);
    this.updatables.forEach((updatable) => updatable.update(frame));
    this.renderer.render(this.scene, this.camera.camera);
  }

  private resizeCanvas(): void {
    this.renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, MAX_PIXEL_RATIO),
    );
    this.renderer.setSize(this.host.clientWidth, this.host.clientHeight, false);
  }

  private pointerActions(): PointerActions {
    return {
      onPointerMove: (pointer) => this.placement.pointAt(pointer),
      onClick: (pointer) => {
        this.placement.pointAt(pointer);
        this.placement.confirm();
      },
      onDrag: (dx, dy) => this.camera.dragByPixels(dx, dy),
      onZoom: (factor) => this.camera.zoomBy(factor),
    };
  }

  private shortcutActions(): ShortcutActions {
    return {
      onRotateView: (direction) => this.camera.rotateQuarterTurn(direction),
      onRotateBuilding: () => this.placement.rotateBuilding(),
      onCancel: () => this.placement.selectTool(null),
      onConfirm: () => this.placement.confirm(),
    };
  }
}

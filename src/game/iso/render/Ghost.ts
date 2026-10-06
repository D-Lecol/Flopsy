import * as THREE from 'three';
import type { BuildingType } from '../config.js';
import type { SceneLayer } from '../contracts.js';
import type { Footprint } from '../domain/Footprint.js';
import type { Rotation } from '../domain/Rotation.js';
import type { GhostView, MarkerColor } from '../tools/Tool.js';
import { footprintCenter } from '../world/coordinates.js';
import type { ModelCatalog } from './models/ModelCatalog.js';

export const MARKER_COLORS: Record<MarkerColor, number> = {
  allowed: 0x22c55e,
  blocked: 0xef4444,
  demolish: 0xf59e0b,
};
const MODEL_TINT = { allowed: 0xb8ffcc, blocked: 0xffa0a0 };
const MARKER_LIFT = 0.03; // évite que le marqueur clignote dans le sol

/** Aperçu translucide du bâtiment avant la pose, et zone colorée sous lui. */
export class Ghost implements GhostView, SceneLayer {
  readonly group = new THREE.Group();
  private readonly models = new Map<BuildingType, THREE.Group>();
  private readonly modelMaterial = new THREE.MeshLambertMaterial({
    vertexColors: true,
    transparent: true,
    opacity: 0.6,
    depthWrite: false,
  });
  private readonly marker = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1).rotateX(-Math.PI / 2),
    new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.45, depthWrite: false }),
  );

  constructor(private readonly catalog: ModelCatalog) {
    this.group.add(this.marker);
    this.hide();
  }

  showBuilding(
    type: BuildingType,
    rotation: Rotation,
    footprint: Footprint,
    groundHeight: number,
    allowed: boolean,
  ): void {
    const model = this.showOnly(this.modelFor(type));
    this.modelMaterial.color.setHex(allowed ? MODEL_TINT.allowed : MODEL_TINT.blocked);
    model.position.copy(footprintCenter(footprint).setY(groundHeight));
    model.rotation.y = rotation.radians();
    this.moveMarker(footprint, groundHeight, allowed ? 'allowed' : 'blocked');
  }

  showMarkerOnly(footprint: Footprint, groundHeight: number, color: MarkerColor): void {
    this.showOnly(null);
    this.moveMarker(footprint, groundHeight, color);
  }

  hide(): void {
    this.group.visible = false;
  }

  /** Rend visible le groupe et ce modèle-là seulement (ou aucun modèle). */
  private showOnly<T extends THREE.Group | null>(model: T): T {
    this.group.visible = true;
    this.models.forEach((candidate) => (candidate.visible = candidate === model));
    return model;
  }

  private moveMarker(footprint: Footprint, groundHeight: number, color: MarkerColor): void {
    this.marker.scale.set(footprint.width, 1, footprint.depth);
    this.marker.position.copy(footprintCenter(footprint).setY(groundHeight + MARKER_LIFT));
    (this.marker.material as THREE.MeshBasicMaterial).color.setHex(MARKER_COLORS[color]);
  }

  /** Fabriqué une seule fois par type, puis réutilisé. */
  private modelFor(type: BuildingType): THREE.Group {
    const existing = this.models.get(type);
    if (existing) return existing;
    const model = this.catalog.create(type);
    model.traverse((object) => this.makeTranslucent(object));
    this.models.set(type, model);
    this.group.add(model);
    return model;
  }

  private makeTranslucent(object: THREE.Object3D): void {
    if (!(object instanceof THREE.Mesh)) return;
    object.material = this.modelMaterial;
    object.castShadow = false;
  }
}

import * as THREE from 'three';
import type { CellPoint, GridCell } from '../../domain/GridCell.js';
import { toWorld } from '../coordinates.js';
import type { Spot } from './Spot.js';

export type DecorKind = 'trunk' | 'crown' | 'tuft' | 'flower' | 'rock' | 'crystal';

export interface DecorLook {
  color: number;
  scale: number;
  /** Hauteur au-dessus du sol (ex. : la couronne d'un arbre sur son tronc). */
  lift?: number;
  /** Position imposée ; sinon un point au hasard dans la case. */
  at?: CellPoint;
}

/** Ce dont un décorateur a besoin pour poser un élément. */
export interface DecorPlanter {
  place(kind: DecorKind, spot: Spot, look: DecorLook): void;
}

/** Forme de chaque décor, base à l'origine. */
const SHAPES: Record<DecorKind, () => THREE.BufferGeometry> = {
  trunk: () => new THREE.CylinderGeometry(0.04, 0.06, 0.35, 5).translate(0, 0.175, 0),
  crown: () => new THREE.ConeGeometry(0.28, 0.7, 6).translate(0, 0.35, 0),
  tuft: () => new THREE.ConeGeometry(0.05, 0.22, 3).translate(0, 0.11, 0),
  flower: () => new THREE.IcosahedronGeometry(0.05, 0).translate(0, 0.1, 0),
  rock: () => new THREE.DodecahedronGeometry(0.12, 0).translate(0, 0.06, 0),
  crystal: () => new THREE.OctahedronGeometry(0.14).scale(1, 1.7, 1).translate(0, 0.2, 0),
};
const SMALL_KINDS: DecorKind[] = ['tuft', 'flower']; // trop petits pour projeter une ombre
const CRYSTAL_GLOW = 0x5a2200;
const HIDDEN = new THREE.Matrix4().makeScale(0, 0, 0);

interface DecorInstance {
  kind: DecorKind;
  matrix: THREE.Matrix4;
  color: THREE.Color;
  cellKey: string;
}

interface InstanceSlot {
  mesh: THREE.InstancedMesh;
  index: number;
}

/** Collecte les éléments de décor, puis les regroupe en un InstancedMesh par sorte. */
export class DecorBatch implements DecorPlanter {
  private readonly instances: DecorInstance[] = [];
  private readonly slotsByCell = new Map<string, InstanceSlot[]>();

  place(kind: DecorKind, spot: Spot, look: DecorLook): void {
    const position = toWorld(look.at ?? spot.randomPoint()).setY(
      spot.groundHeight + (look.lift ?? 0),
    );
    const turn = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, spot.randomTurn(), 0));
    const matrix = new THREE.Matrix4().compose(
      position,
      turn,
      new THREE.Vector3().setScalar(look.scale),
    );
    this.instances.push({
      kind,
      matrix,
      color: new THREE.Color(look.color),
      cellKey: spot.cell.key(),
    });
  }

  createMeshes(): THREE.InstancedMesh[] {
    const kinds = [...new Set(this.instances.map((instance) => instance.kind))];
    return kinds.map((kind) => this.createMeshFor(kind));
  }

  /** Fait disparaître le décor de ces cases (ex. : sous un bâtiment). */
  hide(cells: GridCell[]): void {
    const slots = cells.flatMap((cell) => this.slotsByCell.get(cell.key()) ?? []);
    slots.forEach(({ mesh, index }) => mesh.setMatrixAt(index, HIDDEN));
    new Set(slots.map((slot) => slot.mesh)).forEach(
      (mesh) => (mesh.instanceMatrix.needsUpdate = true),
    );
  }

  private createMeshFor(kind: DecorKind): THREE.InstancedMesh {
    const ofThisKind = this.instances.filter((instance) => instance.kind === kind);
    const material = new THREE.MeshLambertMaterial(
      kind === 'crystal' ? { emissive: CRYSTAL_GLOW } : {},
    );
    const mesh = new THREE.InstancedMesh(SHAPES[kind](), material, ofThisKind.length);
    mesh.castShadow = !SMALL_KINDS.includes(kind);
    ofThisKind.forEach((instance, index) => this.store(mesh, instance, index));
    return mesh;
  }

  private store(mesh: THREE.InstancedMesh, instance: DecorInstance, index: number): void {
    mesh.setMatrixAt(index, instance.matrix);
    mesh.setColorAt(index, instance.color);
    const slots = this.slotsByCell.get(instance.cellKey) ?? [];
    slots.push({ mesh, index });
    this.slotsByCell.set(instance.cellKey, slots);
  }
}

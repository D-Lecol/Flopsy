import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

const SHARED_MATERIAL = new THREE.MeshLambertMaterial({ vertexColors: true });
const DEFAULT_SEGMENTS = { cylinder: 14, cone: 6, sphereWidth: 10, sphereHeight: 8, domeWidth: 14 };

/**
 * Assemble des formes simples colorées en UN SEUL mesh (une seule draw call).
 * Dans toutes les méthodes, `y` est le BAS de la forme, en coordonnées locales.
 */
export class BatchBuilder {
  private shapes: THREE.BufferGeometry[] = [];

  box(
    x: number,
    y: number,
    z: number,
    width: number,
    height: number,
    depth: number,
    color: number,
  ): this {
    return this.add(
      new THREE.BoxGeometry(width, height, depth),
      new THREE.Vector3(x, y + height / 2, z),
      color,
    );
  }

  cyl(
    x: number,
    y: number,
    z: number,
    topRadius: number,
    bottomRadius: number,
    height: number,
    color: number,
    segments = DEFAULT_SEGMENTS.cylinder,
  ): this {
    const shape = new THREE.CylinderGeometry(topRadius, bottomRadius, height, segments);
    return this.add(shape, new THREE.Vector3(x, y + height / 2, z), color);
  }

  cone(
    x: number,
    y: number,
    z: number,
    radius: number,
    height: number,
    color: number,
    segments = DEFAULT_SEGMENTS.cone,
  ): this {
    return this.add(
      new THREE.ConeGeometry(radius, height, segments),
      new THREE.Vector3(x, y + height / 2, z),
      color,
    );
  }

  /** Demi-sphère posée sur sa base. */
  dome(x: number, y: number, z: number, radius: number, color: number): this {
    const halfSphere = new THREE.SphereGeometry(
      radius,
      DEFAULT_SEGMENTS.domeWidth,
      DEFAULT_SEGMENTS.sphereHeight,
      0,
      Math.PI * 2,
      0,
      Math.PI / 2,
    );
    return this.add(halfSphere, new THREE.Vector3(x, y, z), color);
  }

  sphere(x: number, y: number, z: number, radius: number, color: number): this {
    const shape = new THREE.SphereGeometry(
      radius,
      DEFAULT_SEGMENTS.sphereWidth,
      DEFAULT_SEGMENTS.sphereHeight,
    );
    return this.add(shape, new THREE.Vector3(x, y + radius, z), color);
  }

  build(): THREE.Mesh {
    const merged = mergeGeometries(this.shapes, false);
    this.shapes.forEach((shape) => shape.dispose());
    this.shapes = [];
    const mesh = new THREE.Mesh(merged, SHARED_MATERIAL);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
  }

  private add(shape: THREE.BufferGeometry, center: THREE.Vector3, color: number): this {
    shape.translate(center.x, center.y, center.z);
    paint(shape, new THREE.Color(color));
    this.shapes.push(shape);
    return this;
  }
}

/** Donne la même couleur à tous les sommets de la forme. */
function paint(shape: THREE.BufferGeometry, color: THREE.Color): void {
  const vertexCount = shape.getAttribute('position').count;
  const colors = new Float32Array(vertexCount * 3);
  for (let vertex = 0; vertex < vertexCount; vertex++) color.toArray(colors, vertex * 3);
  shape.setAttribute('color', new THREE.BufferAttribute(colors, 3));
}

import * as THREE from 'three';
import type { Renderer } from '../contracts.js';

const SHADOW = { mapSize: 2048, halfExtent: 22, near: 1, far: 100 };
const CANVAS_STYLE = {
  position: 'absolute',
  inset: '0',
  width: '100%',
  height: '100%',
  display: 'block',
  touchAction: 'none',
  cursor: 'crosshair',
};

/** Le rendu WebGL, ajouté dans `host`. Fond transparent : le dégradé CSS se voit derrière. */
export function createWebGLRenderer(host: HTMLElement): Renderer {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  Object.assign(renderer.domElement.style, CANVAS_STYLE);
  host.appendChild(renderer.domElement);
  return renderer;
}

/** Lumière du ciel (douce, de partout) et soleil (directionnel, avec ombres). */
export function createLights(): THREE.Light[] {
  const sky = new THREE.HemisphereLight(0xfff4e6, 0x8a6a50, 1.6);
  const sun = new THREE.DirectionalLight(0xffe2b8, 2.4);
  sun.position.set(-18, 30, 12);
  sun.castShadow = true;
  sun.shadow.mapSize.set(SHADOW.mapSize, SHADOW.mapSize);
  const { halfExtent, near, far } = SHADOW;
  Object.assign(sun.shadow.camera, {
    left: -halfExtent,
    right: halfExtent,
    top: halfExtent,
    bottom: -halfExtent,
    near,
    far,
  });
  return [sky, sun];
}

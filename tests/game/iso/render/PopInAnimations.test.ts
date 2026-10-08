import * as THREE from 'three';
import { describe, expect, it } from 'vitest';
import { PopInAnimations } from '../../../../src/game/iso/render/PopInAnimations.js';

describe('PopInAnimations', () => {
  it('écrase le modèle au départ', () => {
    const model = new THREE.Object3D();
    new PopInAnimations().start(model);
    expect(model.scale.y).toBeLessThan(0.05);
  });

  it('fait grandir le modèle au fil du temps', () => {
    const model = new THREE.Object3D();
    const animations = new PopInAnimations();
    animations.start(model);
    animations.advance(0.1);
    expect(model.scale.y).toBeGreaterThan(0.05);
    expect(model.scale.y).toBeLessThan(1);
  });

  it("termine à taille normale et s'arrête", () => {
    const model = new THREE.Object3D();
    const animations = new PopInAnimations();
    animations.start(model);
    animations.advance(1);
    expect(model.scale.y).toBe(1);
    expect(animations.count()).toBe(0);
  });

  it('anime plusieurs modèles indépendamment', () => {
    const animations = new PopInAnimations();
    animations.start(new THREE.Object3D());
    animations.advance(0.1);
    animations.start(new THREE.Object3D());
    animations.advance(0.2);
    expect(animations.count()).toBe(1);
  });
});

import * as THREE from 'three';
import { describe, expect, it } from 'vitest';
import { createLights } from '../../../../src/game/iso/render/stage.js';

describe('createLights', () => {
  it('éclaire avec le ciel et le soleil', () => {
    const lights = createLights();
    expect(lights.some((light) => light instanceof THREE.HemisphereLight)).toBe(
      true,
    );
    expect(
      lights.some((light) => light instanceof THREE.DirectionalLight),
    ).toBe(true);
  });

  it('fait projeter des ombres au soleil', () => {
    const sun = createLights().find(
      (light) => light instanceof THREE.DirectionalLight,
    );
    expect(sun?.castShadow).toBe(true);
  });
});

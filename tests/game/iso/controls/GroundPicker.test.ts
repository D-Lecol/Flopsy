import { describe, expect, it } from 'vitest';
import { AVERAGE_GROUND_HEIGHT } from '../../../../src/game/iso/config.js';
import { frame } from '../testing/fakes.js';
import { CameraController } from '../../../../src/game/iso/controls/CameraController.js';
import { GroundPicker } from '../../../../src/game/iso/controls/GroundPicker.js';

function pickerLookingAtMapCenter() {
  const controller = new CameraController(
    { width: () => 800, height: () => 600 },
    24,
  );
  controller.update(frame(0));
  controller.camera.updateMatrixWorld();
  const screen = {
    getBoundingClientRect: () => ({ left: 0, top: 0, width: 800, height: 600 }),
  };
  return new GroundPicker(screen, controller.camera);
}

describe('GroundPicker', () => {
  it("trouve le centre de la carte sous le centre de l'écran", () => {
    const point = pickerLookingAtMapCenter().cellUnder({ x: 400, y: 300 });
    // Le sol visé est un peu au-dessus de y = 0 : on tombe légèrement vers la caméra.
    const shiftTowardsCamera = AVERAGE_GROUND_HEIGHT;
    expect(point?.column).toBeCloseTo(12 + shiftTowardsCamera, 1);
    expect(point?.row).toBeCloseTo(12 + shiftTowardsCamera, 1);
  });

  it("vise plus à droite quand le curseur va à droite de l'écran", () => {
    const picker = pickerLookingAtMapCenter();
    const center = picker.cellUnder({ x: 400, y: 300 })!;
    const right = picker.cellUnder({ x: 600, y: 300 })!;
    expect(right.column - center.column).toBeGreaterThan(0);
    expect(right.row - center.row).toBeLessThan(0);
  });
});

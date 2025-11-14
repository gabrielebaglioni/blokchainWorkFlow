/**
 * ============================================================================
 * ILLUMINAZIONE DELLA SCENA
 * ============================================================================
 */

import * as THREE from "three"

/**
 * Aggiunge la luce alla scena
 * @param {THREE.Scene} scene - La scena Three.js
 */
export function setLightInScene(scene) {
  const sun = new THREE.DirectionalLight(0xffffff, 1.7)
  sun.position.set(4, 4, 4)
  scene.add(sun)
}


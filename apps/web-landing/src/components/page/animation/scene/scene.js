/**
 * ============================================================================
 * INIZIALIZZAZIONE SCENA
 * ============================================================================
 * 
 * Responsabilità: Creare e configurare la scena 3D base
 */

import * as THREE from "three"

/**
 * Inizializza la scena 3D
 * @returns {THREE.Scene} - La scena creata
 */
export function initScene() {
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x111111)
  return scene
}


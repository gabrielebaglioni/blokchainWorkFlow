/**
 * ============================================================================
 * INIZIALIZZAZIONE CAMERA
 * ============================================================================
 * 
 * Responsabilità: Creare e configurare la camera 3D
 */

import * as THREE from "three"

/**
 * Inizializza la camera (punto di vista sulla scena)
 * @param {number} width - Larghezza del viewport
 * @param {number} height - Altezza del viewport
 * @returns {THREE.PerspectiveCamera} - La camera creata
 */
export function initCamera(width, height) {
  const camera = new THREE.PerspectiveCamera(
    50,                    // FOV (campo visivo)
    width / height,        // Aspect ratio
    0.5,                   // Near plane
    1000                   // Far plane
  )
  
  camera.position.set(0, 4, 16)  // Camera più alta per prospettiva verso l'alto
  camera.lookAt(0, 1, 0)  // Guarda leggermente più in alto
  
  return camera
}


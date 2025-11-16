/**
 * ============================================================================
 * INIZIALIZZAZIONE CONTROLLI
 * ============================================================================
 * 
 * Responsabilità: Creare e configurare i controlli di navigazione (OrbitControls)
 */

import { OrbitControls } from "../threeJsAssets/OrbitControls.js"
import { isMobileDevice } from "../utils/device.js"

/**
 * Inizializza i controlli per permettere all'utente di guardare intorno nella scena
 * @param {THREE.PerspectiveCamera} camera - La camera da controllare
 * @returns {OrbitControls} - I controlli creati
 */
export function initControls(camera) {
  const controls = new OrbitControls(camera, document.body)
  controls.listenToKeyEvents(window)
  
  // Imposta il target leggermente più in alto per prospettiva migliore
  controls.target.set(0, 1, 0)
  
  if (isMobileDevice()) {
    controls.enableDamping = true
    controls.dampingFactor = 0.05
  }
  
  controls.enableZoom = false
  controls.enablePan = false
  controls.screenSpacePanning = false
  controls.minDistance = 10
  controls.maxDistance = 100
  // Permetti un po' più di movimento verticale per evitare che il lato destro si alzi durante la rotazione
  controls.maxPolarAngle = Math.PI * 0.55  // Permette di guardare leggermente più in alto
  controls.minPolarAngle = Math.PI * 0.45  // Permette di guardare leggermente più in basso
  controls.autoRotate = true
  controls.autoRotateSpeed = screen.width >= 500 ? 0.06 : 0.12
  controls.update()
  
  return controls
}


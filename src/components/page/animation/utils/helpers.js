/**
 * ============================================================================
 * FUNZIONI HELPER
 * ============================================================================
 */

import { setDocumentHeight } from "./device.js"

/**
 * Verifica se siamo sulla homepage
 * @param {string} url - L'URL della pagina corrente
 * @returns {boolean} - true se siamo sulla homepage
 */
export function isHomePage(url) {
  return url === "/"
}

/**
 * Ridimensiona la scena quando l'utente ridimensiona la finestra
 * @param {THREE.PerspectiveCamera} camera - La camera
 * @param {THREE.WebGLRenderer} renderer - Il renderer
 * @param {EffectComposer} composer - Il compositore
 * @returns {Function} - Funzione per aggiornare le dimensioni
 */
export function createResizeHandler(camera, renderer, composer) {
  return () => {
    const width = window.innerWidth
    const height = window.innerHeight
    
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    
    composer.setSize(width, height)
    renderer.setSize(width, height)
  }
}

/**
 * Aggiunge tutti gli event listener necessari alla pagina
 * @param {Function} resizeHandler - Handler per il resize
 * @returns {Function} - Funzione per rimuovere gli event listener
 */
export function addEventListeners(resizeHandler) {
  window.addEventListener("resize", resizeHandler, false)
  window.addEventListener("resize", setDocumentHeight)
  
  return () => {
    window.removeEventListener("resize", resizeHandler)
    window.removeEventListener("resize", setDocumentHeight)
  }
}

/**
 * Modifica gli elementi in base al dispositivo (mobile/desktop)
 */
export function modifyElementsAccordingToDevice() {
  setDocumentHeight()
}


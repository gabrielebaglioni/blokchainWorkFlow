/**
 * ============================================================================
 * INIZIALIZZAZIONE RENDERER
 * ============================================================================
 * 
 * Responsabilità: Creare e configurare il renderer WebGL
 */

import { renderer as globalRenderer } from "../loaders/globalLoaders.js"

/**
 * Inizializza il renderer (disegna la scena sul canvas)
 * @param {HTMLElement} container - Container HTML dove inserire il canvas
 * @param {number} width - Larghezza del viewport
 * @param {number} height - Altezza del viewport
 * @returns {Function} - Funzione per rimuovere il renderer
 */
export function initRenderer(container, width, height) {
  globalRenderer.setSize(width, height)
  globalRenderer.setPixelRatio(window.devicePixelRatio)
  globalRenderer.setClearColor(0xffffff)
  globalRenderer.clear()
  
  container.appendChild(globalRenderer.domElement)
  globalRenderer.domElement.style["pointer-events"] = "none"
  
  return () => {
    container.removeChild(globalRenderer.domElement)
  }
}


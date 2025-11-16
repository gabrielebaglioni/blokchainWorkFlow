/**
 * ============================================================================
 * INIZIALIZZAZIONE POST-PROCESSING
 * ============================================================================
 * 
 * Responsabilità: Creare e configurare gli effetti post-processing
 */

import { RenderPass } from "../threeJsAssets/RenderPass.js"
import { EffectComposer } from "../threeJsAssets/EffectComposer.js"

/**
 * Inizializza gli effetti post-processing
 * @param {THREE.WebGLRenderer} renderer - Il renderer
 * @param {THREE.Scene} scene - La scena
 * @param {THREE.PerspectiveCamera} camera - La camera
 * @returns {EffectComposer} - Il compositore creato
 */
export function initPostProcessingEffects(renderer, scene, camera) {
  const composer = new EffectComposer(renderer)
  composer.addPass(new RenderPass(scene, camera))
  return composer
}


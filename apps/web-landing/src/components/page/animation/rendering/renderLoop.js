/**
 * ============================================================================
 * LOOP DI ANIMAZIONE
 * ============================================================================
 * 
 * Gestisce il loop principale di rendering e animazione
 */

import { ROTATION_SPEED, FINAL_STOP_POINT, FILE_TYPE } from "../constants/sceneConfig.js"
import { isHomePage } from "../utils/helpers.js"

/**
 * Crea il loop di animazione
 * @param {Object} config - Configurazione del loop
 * @param {THREE.Points} finalPoints - Sistema di particelle principale
 * @param {OrbitControls} controls - Controlli della camera
 * @param {EffectComposer} composer - Compositore per post-processing
 * @param {THREE.Clock} clock - Clock per il tempo
 * @param {THREE.ShaderMaterial} firefliesMaterial - Materiale delle fireflies (opzionale)
 * @param {string} url - URL della pagina corrente
 * @returns {Function} - Funzione per avviare il loop
 */
export function createRenderLoop(config) {
  const {
    finalPoints,
    controls,
    composer,
    clock,
    firefliesMaterial,
    url,
  } = config
  
  let deltaY = 0
  const homePage = isHomePage(url)
  let animationFrameId = null
  
  /**
   * Loop principale di animazione
   */
  function animate() {
    // Mantieni il target leggermente più in alto per prospettiva migliore
    if (controls) {
      controls.target.set(0, 1, 0)
    }
    
    // Rotazione dell'oggetto principale
    if (finalPoints && config.activateParticleRotation !== false) {
      if (FILE_TYPE === "glb" || FILE_TYPE === "obj") {
        finalPoints.rotation.z += ROTATION_SPEED
      }
      controls.update()
    }
    
    // Rotazione di altri oggetti (se presenti)
    if (config.group) {
      config.group.rotation.y += ROTATION_SPEED
    }
    
    if (config.ethLogoFirefliesMesh) {
      config.ethLogoFirefliesMesh.rotation.y += ROTATION_SPEED
    }
    
    /**
     * Animazione basata sullo scroll
     */
    const contentVisible = document.body.classList.contains("content-scrolled")
    
    if (contentVisible) {
      if (homePage && finalPoints) {
        let morphValue = finalPoints.morphTargetInfluences[0]
        deltaY = 0.0000024
        
        if (morphValue <= FINAL_STOP_POINT) {
          finalPoints.morphTargetInfluences[0] += deltaY
        }
      }
    } else {
      if (homePage && finalPoints) {
        const currentMorphTargetInfluence = finalPoints.morphTargetInfluences[0]
        
        if (currentMorphTargetInfluence > 0.001) {
          deltaY = -0.000005
        } else {
          deltaY = -0.00001
        }
        
        let morphTarget = finalPoints.morphTargetInfluences[0]
        let finalValue = morphTarget - deltaY
        
        if (finalValue >= 0) {
          finalPoints.morphTargetInfluences[0] += deltaY
          
          if (finalPoints.morphTargetInfluences[0] <= 0) {
            finalValue = 0
            finalPoints.morphTargetInfluences[0] = 0
          }
        }
        
        if (finalPoints.morphTargetInfluences[0] < 0) {
          finalValue = 0
          finalPoints.morphTargetInfluences[0] = 0
        }
      }
    }
    
    /**
     * Aggiornamento delle fireflies
     */
    if (clock && firefliesMaterial) {
      const elapsedTime = clock.getElapsedTime()
      firefliesMaterial.uniforms.uTime.value = elapsedTime
    }
    
    /**
     * Rendering finale
     */
    animationFrameId = window.requestAnimationFrame(animate)
    composer.render()
  }
  
  // Avvia il loop
  animate()
  
  // Ritorna funzione di cleanup
  return () => {
    if (animationFrameId !== null) {
      window.cancelAnimationFrame(animationFrameId)
    }
  }
}


/**
 * ============================================================================
 * FUNZIONE PRINCIPALE: Animate
 * ============================================================================
 * 
 * Questa è la funzione principale che crea e gestisce tutta la scena 3D.
 * Viene chiamata ogni volta che l'utente naviga a una nuova pagina.
 */

import * as THREE from "three"
import { ROTATION_SPEED, DEFAULT_PARTICLE_COLOR } from "../constants/sceneConfig.js"
import { createMinecraftHouse } from "../particleObjects/minecraftScene.js"
import { createSparseParticleMesh } from "../particleObjects/sparseParticleMesh.js"
import { createEquirectangularBackground } from "../visualEffects/background.js"
import { createFireflies } from "../visualEffects/fireflies.js"
import { initScene } from "../scene/scene.js"
import { initCamera } from "../scene/camera.js"
import { initRenderer } from "../scene/renderer.js"
import { initControls } from "../scene/controls.js"
import { initPostProcessingEffects } from "../scene/postProcessing.js"
import { renderWebPImages } from "../utils/webpDetection.js"
import { setLightInScene } from "../scene/lighting.js"
import { createRenderLoop } from "../rendering/renderLoop.js"
import {
  isHomePage,
  createResizeHandler,
  addEventListeners,
  modifyElementsAccordingToDevice,
} from "../utils/helpers.js"
import { renderer } from "../loaders/globalLoaders.js"

/**
 * Funzione principale che inizializza e gestisce la scena 3D
 * @param {string} url - L'URL della pagina corrente
 * @returns {Function} - Funzione di cleanup per rimuovere la scena
 */
export function Animate(url) {
  // Variabili principali della scena
  let scene
  let camera
  let composer
  let controls
  let finalPoints
  let fireflies = null
  let firefliesMaterial = null
  let backgroundMesh = null
  let clock = new THREE.Clock()
  
  // Configurazione
  const color = DEFAULT_PARTICLE_COLOR
  const mouseIntensity = 0.01
  const activateParticleRotation = true
  const backgroundPaintingIsDisplayed = true
  const firefliesActivated = false
  const statsAdded = false
  
  // Dimensioni della finestra
  let innerWidth = window.innerWidth
  let innerHeight = window.innerHeight
  
  // Container HTML
  const container = document.getElementById("canvas")
  if (!container) {
    console.error("Container #canvas not found")
    return () => {}
  }
  
  /**
   * Funzione principale di inizializzazione
   */
  function begin() {
    // Variabili che devono essere accessibili dopo begin()
    let localCamera
    let localComposer
    // 1. Inizializza la scena
    scene = initScene()
    
    // 2. Crea e posiziona la camera
    localCamera = initCamera(innerWidth, innerHeight)
    camera = localCamera
    scene.add(camera)
    
    // 3. Inizializza il renderer
    const disposeRendererElement = initRenderer(container, innerWidth, innerHeight)
    
    // 4. Inizializza gli effetti post-processing
    localComposer = initPostProcessingEffects(renderer, scene, camera)
    composer = localComposer
    
    // 5. Inizializza i controlli
    controls = initControls(camera)
    
    // 6. Aggiunge la luce alla scena
    setLightInScene(scene)
    
    // 7. Rileva il supporto WebP
    renderWebPImages()
    
    // 8. Aggiunge l'oggetto principale
    const homePage = isHomePage(url)
    if (homePage) {
      finalPoints = createMinecraftHouse(scene, {
        particleSize: 0.155,
      })
    } else {
      finalPoints = createSparseParticleMesh(scene, {
        particleSize: 0.9,
      })
    }
    
    // 9. Se il background è abilitato, crea lo skybox
    if (backgroundPaintingIsDisplayed) {
      backgroundMesh = createEquirectangularBackground(scene, url)
    }
    
    // 10. Se le lucciole sono abilitate, aggiungile
    if (firefliesActivated) {
      const firefliesResult = createFireflies(scene, {
        color,
        mouseIntensity,
      })
      fireflies = firefliesResult.points
      firefliesMaterial = firefliesResult.material
    }
    
    // 11. Avvia il loop di animazione
    const cleanupAnimation = createRenderLoop({
      finalPoints,
      controls,
      composer,
      clock,
      firefliesMaterial,
      url,
      activateParticleRotation,
      group: undefined,
      ethLogoFirefliesMesh: undefined,
    })
    
    // Crea handler per resize dopo che camera e composer sono stati inizializzati
    const localResizeHandler = createResizeHandler(localCamera, renderer, localComposer)
    
    // Ritorna sia la funzione di cleanup che il resize handler
    return {
      cleanup: () => {
        disposeRendererElement()
        controls.dispose()
        cleanupAnimation()
        
        // Rimuovi gli oggetti dalla scena
        if (finalPoints) {
          scene.remove(finalPoints)
          finalPoints.geometry.dispose()
          finalPoints.material.dispose()
        }
        if (fireflies) {
          scene.remove(fireflies)
          fireflies.geometry.dispose()
          fireflies.material.dispose()
        }
        if (backgroundMesh) {
          scene.remove(backgroundMesh)
          backgroundMesh.geometry.dispose()
          backgroundMesh.material.dispose()
          if (backgroundMesh.material.map) {
            backgroundMesh.material.map.dispose()
          }
          backgroundMesh = null
        }
        
        // Pulisci completamente la scena
        while (scene.children.length > 0) {
          scene.remove(scene.children[0])
        }
      },
      resizeHandler: localResizeHandler,
    }
  }
  
  // Avvia l'inizializzazione
  const { cleanup: cleanUpAfterThreejs, resizeHandler } = begin()
  
  // Aggiunge gli event listener
  const clearAllListeners = addEventListeners(resizeHandler)
  
  // Modifica gli elementi in base al dispositivo
  modifyElementsAccordingToDevice()
  
  /**
   * Funzione di cleanup per prevenire memory leak
   */
  return () => {
    clearAllListeners()
    cleanUpAfterThreejs()
  }
}


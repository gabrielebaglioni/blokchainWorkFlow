/**
 * ============================================================================
 * SETUP DELLA SCENA
 * ============================================================================
 * 
 * Funzioni per inizializzare scena, camera, renderer, controlli e post-processing
 */

import * as THREE from "three"
import { OrbitControls } from "../assets/OrbitControls.js"
import { RenderPass } from "../assets/RenderPass.js"
import { EffectComposer } from "../assets/EffectComposer.js"
import { renderer as globalRenderer } from "../loaders/globalLoaders.js"
import { isMobileDevice } from "../utils/device.js"
import { testWebP } from "../utils/webp.js"

/**
 * Inizializza la scena 3D
 * @returns {THREE.Scene} - La scena creata
 */
export function initScene() {
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x111111)
  return scene
}

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
  
  camera.position.set(0, 2, 16)
  camera.lookAt(0, 0, 0)
  
  return camera
}

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

/**
 * Inizializza i controlli per permettere all'utente di guardare intorno nella scena
 * @param {THREE.PerspectiveCamera} camera - La camera da controllare
 * @returns {OrbitControls} - I controlli creati
 */
export function initControls(camera) {
  const controls = new OrbitControls(camera, document.body)
  controls.listenToKeyEvents(window)
  
  if (isMobileDevice()) {
    controls.enableDamping = true
    controls.dampingFactor = 0.05
  }
  
  controls.enableZoom = false
  controls.enablePan = false
  controls.screenSpacePanning = false
  controls.minDistance = 10
  controls.maxDistance = 100
  controls.maxPolarAngle = Math.PI * 0.5
  controls.minPolarAngle = Math.PI * 0.5
  controls.autoRotate = true
  controls.autoRotateSpeed = screen.width >= 500 ? 0.06 : 0.12
  controls.update()
  
  return controls
}

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

/**
 * Rileva il supporto WebP e aggiunge classi CSS
 */
export function renderWebPImages() {
  const mainMenuContainer = document.getElementById(
    "main--menu--internal--container"
  )
  
  if (mainMenuContainer) {
    if (testWebP()) {
      mainMenuContainer.classList.add("webp--supported")
    } else {
      mainMenuContainer.classList.add("webp--not--supported")
    }
  }
}


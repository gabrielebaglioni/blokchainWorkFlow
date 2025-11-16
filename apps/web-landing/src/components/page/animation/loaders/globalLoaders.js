/**
 * ============================================================================
 * LOADER E RENDERER GLOBALI
 * ============================================================================
 * 
 * Questi oggetti sono globali per motivi di performance e caching.
 * Vengono creati una sola volta e riutilizzati per tutte le scene.
 */

import * as THREE from "three"
import * as GLTFLoader from "../threeJsAssets/GLTFLoader.js"

// Verifica se siamo in un ambiente browser (non durante il server-side rendering)
const isClient = typeof window !== "undefined"

// Cache di tutte le texture caricate (per evitare di ricaricarle)
export const textures = {}

// Modello 3D principale caricato (il logo/oggetto centrale)
export let mainObjectModel = null

// Texture a punti usata per le particelle
export let dotTexture = null

// Abilita la cache di Three.js per migliorare le performance
THREE.Cache.enabled = true

// Renderer WebGL: disegna la scena 3D sul canvas HTML
// - antialias: true = smoothing dei bordi per renderli più lisci
// - preserveDrawingBuffer: true = mantiene il buffer dopo il rendering
// - alpha: true = supporta la trasparenza
export let renderer = isClient
  ? new THREE.WebGLRenderer({
      antialias: true,
      preserveDrawingBuffer: true,
      alpha: true,
    })
  : null

// Manager per gestire il caricamento di tutti gli asset
export const loadingManager = isClient ? new THREE.LoadingManager() : null

// Loader per le texture di background
export const backgroundLoader = isClient
  ? new THREE.TextureLoader(loadingManager)
  : null

// Loader per la texture a punti
export const dotLoader = isClient ? new THREE.TextureLoader(loadingManager) : null

// Loader per i modelli 3D in formato GLTF/GLB
export const glbLoader = isClient ? new GLTFLoader.GLTFLoader() : null

/**
 * Imposta il modello 3D principale
 */
export function setMainObjectModel(model) {
  mainObjectModel = model
}

/**
 * Imposta la texture a punti
 */
export function setDotTexture(texture) {
  dotTexture = texture
}


/**
 * ============================================================================
 * CARICAMENTO DI TUTTI GLI ASSETS
 * ============================================================================
 * 
 * Carica tutti gli asset necessari per la scena 3D:
 * 1. Texture di background (cambia in base alla pagina)
 * 2. Texture a punti per le particelle
 * 3. Modello 3D principale (logo/oggetto centrale)
 */

import * as THREE from "three"
import { loadAndCacheTexture } from "./textureLoader.js"
import { dotLoader, glbLoader, setDotTexture, setMainObjectModel, dotTexture, mainObjectModel } from "./globalLoaders.js"

/**
 * Normalizza l'URL rimuovendo hash e query string
 * @param {string} url - L'URL da normalizzare
 * @returns {string} - L'URL normalizzato
 */
function normalizeUrl(url) {
  return url.split('#')[0].split('?')[0]
}

/**
 * Carica tutti gli asset necessari per la scena 3D
 * 
 * @param {string} url - L'URL della pagina corrente
 * @returns {Promise} - Promise che si risolve quando tutti gli asset sono caricati
 */
export function loadAssets(url) {
  // Normalizza l'URL per rimuovere hash e query string
  const normalizedUrl = normalizeUrl(url)
  
  const assetLoaders = [
    // 1. Carica la texture di background per questa pagina
    loadAndCacheTexture(normalizedUrl),
    
    // 2. Crea la texture a punti quadrata (usata per le particelle)
    // Se è già caricata, usa quella in cache
    new Promise((resolve) => {
      if (dotTexture) {
        resolve()
      } else if (typeof window !== 'undefined') {
        // Crea una texture quadrata programmaticamente
        const size = 64
        const canvas = document.createElement('canvas')
        canvas.width = size
        canvas.height = size
        const context = canvas.getContext('2d')
        
        // Sfondo trasparente
        context.clearRect(0, 0, size, size)
        
        // Disegna un quadrato bianco al centro
        const squareSize = size * 0.6
        const offset = (size - squareSize) / 2
        context.fillStyle = 'white'
        context.fillRect(offset, offset, squareSize, squareSize)
        
        // Crea la texture da canvas
        const texture = new THREE.CanvasTexture(canvas)
        texture.needsUpdate = true
        setDotTexture(texture)
        resolve()
      } else {
        // Server-side rendering: risolvi senza texture
        resolve()
      }
    }),
    
    // 3. Carica il modello 3D principale (logo/oggetto centrale)
    // Se è già caricato, usa quello in cache
    new Promise((resolve) => {
      if (mainObjectModel) {
        resolve()
      } else {
        glbLoader.load("assets/ether.glb", function (object) {
          setMainObjectModel(object)
          resolve()
        })
      }
    }),
  ]

  // Attendi che tutti gli asset siano caricati prima di continuare
  return Promise.all(assetLoaders)
}


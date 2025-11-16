/**
 * ============================================================================
 * EFFETTO FIREFLIES (LUCIOLE)
 * ============================================================================
 * 
 * Crea e renderizza le particelle "fireflies" (lucciole) nella scena
 * Usa shader personalizzati per effetti avanzati
 */

import * as THREE from "three"
import firefliesVertexShader from "../shaders/firefliesVertexShader.glsl"
import firefliesFragmentShader from "../shaders/firefliesFragmentShader.glsl"
import { rgbToPercentage } from "../utils/colors.js"

/**
 * Crea e renderizza le particelle "fireflies" (lucciole) nella scena
 * 
 * @param {THREE.Scene} scene - La scena Three.js
 * @param {Object} config - Configurazione (color, mouseIntensity, etc.)
 * @returns {Object} - Oggetto con geometry, material e points
 */
export function createFireflies(scene, config = {}) {
  const firefliesCount = config.count || 1000
  const color = config.color || [137, 188, 222]
  const mouseIntensity = config.mouseIntensity || 0.5
  
  // Crea una nuova geometria per le lucciole
  const firefliesGeometry = new THREE.BufferGeometry()
  
  // Array per le posizioni (ogni lucciola ha 3 coordinate: x, y, z)
  const positionArray = new Float32Array(firefliesCount * 3)
  
  // Array per le scale (dimensione) di ogni lucciola
  const scaleArray = new Float32Array(firefliesCount)

  // Genera posizioni casuali per ogni lucciola
  for (let i = 0; i < firefliesCount; i++) {
    // Crea una posizione casuale
    new THREE.Vector3(
      (Math.random() - 0.5) * 10,      // X
      Math.random() * 1.5 * 2,         // Y
      (Math.random() - 0.5) * 500       // Z (spread più ampio)
    ).toArray(positionArray, i * 3)
    
    // Imposta la scala iniziale di ogni lucciola
    scaleArray[i] = 5
  }

  // Aggiunge gli attributi alla geometria
  firefliesGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positionArray, 3)
  )

  firefliesGeometry.setAttribute(
    "aScale",
    new THREE.BufferAttribute(scaleArray, 1)
  )

  // Crea il materiale shader per le lucciole
  const firefliesMaterial = new THREE.ShaderMaterial({
    vertexShader: firefliesVertexShader,
    fragmentShader: firefliesFragmentShader,
    transparent: true,
    uniforms: {
      uTime: { value: 0 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      uSize: { value: 100 },
      color: {
        type: "v3",
        value: new THREE.Vector3(...rgbToPercentage(color)),
      },
      mouseIntensity: {
        type: "f",
        value: mouseIntensity,
      },
    },
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  })

  // Crea il sistema di particelle finale
  const fireflies = new THREE.Points(firefliesGeometry, firefliesMaterial)
  fireflies.position.set(0, 0, 0)
  
  // Aggiunge le lucciole alla scena
  scene.add(fireflies)
  
  return {
    geometry: firefliesGeometry,
    material: firefliesMaterial,
    points: fireflies,
  }
}


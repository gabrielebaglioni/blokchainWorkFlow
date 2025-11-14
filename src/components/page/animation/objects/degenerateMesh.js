/**
 * ============================================================================
 * MESH DEGENERATO (PARTICELLE SPARSE)
 * ============================================================================
 * 
 * Crea un sistema di particelle sparse per le pagine diverse dalla homepage
 */

import * as THREE from "three"
import { mainObjectModel, dotTexture } from "../loaders/globalLoaders.js"

/**
 * Carica un mesh "degenerato" (particelle sparse)
 * Usato sulle pagine diverse dalla homepage
 * 
 * @param {THREE.Scene} scene - La scena Three.js
 * @param {Object} config - Configurazione (particleSize, etc.)
 * @returns {THREE.Points} - Il sistema di particelle creato
 */
export function createDegenerateParticleMesh(scene, config = {}) {
  const object = mainObjectModel
  const particleSize = config.particleSize || 0.9
  
  const mesh = object.scene.children[0]
  const geometry = mesh.geometry
  const positionAttribute = geometry.attributes.position
  let count = 48000
  let newPositions = []
  let scaleArray = new Float32Array(count)
  
  for (let i = 0; i < positionAttribute.count; i++) {
    let distance = 4
    let theta = THREE.MathUtils.randFloatSpread(360)
    let phi = THREE.MathUtils.randFloatSpread(360)
    
    newPositions.push(
      Math.ceil(Math.random() * 50 * distance) * Math.sin(theta) * Math.cos(phi),
      Math.ceil(Math.random() * 50 * distance) * Math.sin(theta) * Math.sin(phi),
      Math.ceil(Math.random() * 50 * distance) * Math.cos(theta)
    )
    
    scaleArray[i] = Math.random() * 100
  }
  
  const bufferGeometry = new THREE.BufferGeometry()
  bufferGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(newPositions, 3)
  )
  
  bufferGeometry.setAttribute(
    "aScale",
    new THREE.BufferAttribute(scaleArray, 3)
  )
  
  const material = new THREE.PointsMaterial({
    color: new THREE.Color(10, 10, 10),
    size: particleSize,
    transparent: true,
    map: dotTexture,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    toneMapped: false,
  })
  
  const points = new THREE.Points(bufferGeometry, material)
  points.scale.x = points.scale.y = points.scale.z = 2
  points.rotation.x = Math.PI / 2
  
  scene.add(points)
  
  return points
}


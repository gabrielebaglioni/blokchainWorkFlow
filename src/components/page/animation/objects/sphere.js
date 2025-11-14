/**
 * ============================================================================
 * OGGETTO SFERA COLORATA
 * ============================================================================
 * 
 * Crea una sfera colorata con particelle distribuite uniformemente
 * Mantiene la stessa densità di particelle del modello originale
 */

import * as THREE from "three"
import { mainObjectModel, dotTexture } from "../loaders/globalLoaders.js"

/**
 * Carica e renderizza l'oggetto 3D principale sulla homepage
 * Crea una sfera colorata mantenendo la stessa densità di particelle del modello originale
 * 
 * @param {THREE.Scene} scene - La scena Three.js
 * @param {Object} config - Configurazione (particleSize, etc.)
 * @returns {THREE.Points} - Il sistema di particelle creato
 */
export function createColoredSphere(scene, config = {}) {
  const object = mainObjectModel
  const particleSize = config.particleSize || 0.155
  
  // Estrae la mesh e la geometria dal modello caricato per ottenere il numero di particelle
  let mesh = object.scene.children[0]
  let originalGeometry = mesh.geometry
  const particleCount = originalGeometry.attributes.position.count
  
  // Calcola la distanza media tra le particelle nel modello originale
  // per mantenere la stessa densità nella sfera
  const positions = originalGeometry.attributes.position.array
  let totalDistance = 0
  let distanceCount = 0
  
  // Calcola distanze tra particelle vicine (campione)
  const sampleSize = Math.min(1000, particleCount)
  for (let i = 0; i < sampleSize; i++) {
    const idx1 = Math.floor(Math.random() * particleCount) * 3
    const idx2 = Math.floor(Math.random() * particleCount) * 3
    
    const dx = positions[idx1] - positions[idx2]
    const dy = positions[idx1 + 1] - positions[idx2 + 1]
    const dz = positions[idx1 + 2] - positions[idx2 + 2]
    const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)
    
    if (dist > 0) {
      totalDistance += dist
      distanceCount++
    }
  }
  
  const avgDistance = distanceCount > 0 ? totalDistance / distanceCount : 0.1
  
  // Calcola il raggio della sfera basato sulla densità
  const sphereRadius = Math.sqrt(particleCount * avgDistance * avgDistance / (4 * Math.PI)) * 0.5
  
  // Palette di colori basata sul logo HouseBlock (12 colori per il dodecagono)
  const colorPalette = [
    new THREE.Color(1.0, 0.0, 0.0),      // #FF0000 - Rosso
    new THREE.Color(1.0, 0.549, 0.0),    // #FF8C00 - Arancione
    new THREE.Color(1.0, 0.843, 0.0),    // #FFD700 - Giallo
    new THREE.Color(0.196, 0.804, 0.196), // #32CD32 - Verde chiaro
    new THREE.Color(0.0, 1.0, 0.498),    // #00FF7F - Verde
    new THREE.Color(0.0, 0.808, 0.820),  // #00CED1 - Turchese
    new THREE.Color(0.118, 0.565, 1.0),   // #1E90FF - Blu
    new THREE.Color(0.294, 0.0, 0.510),  // #4B0082 - Indaco
    new THREE.Color(0.545, 0.0, 1.0),    // #8B00FF - Viola
    new THREE.Color(1.0, 0.078, 0.576),  // #FF1493 - Rosa
    new THREE.Color(1.0, 0.0, 1.0),      // #FF00FF - Magenta
    new THREE.Color(0.863, 0.078, 0.235), // #DC143C - Rosso scuro
  ]
  
  // Genera posizioni per una sfera uniforme usando la spirale di Fibonacci
  const spherePositions = []
  const sphereColors = []
  const scaleArray = new Float32Array(particleCount)
  
  for (let i = 0; i < particleCount; i++) {
    // Spirale di Fibonacci per distribuzione uniforme sulla sfera
    const goldenAngle = Math.PI * (3 - Math.sqrt(5))
    const y = 1 - (i / (particleCount - 1)) * 2
    const radius = Math.sqrt(1 - y * y)
    const theta = goldenAngle * i
    
    const x = Math.cos(theta) * radius * sphereRadius
    const z = Math.sin(theta) * radius * sphereRadius
    const yPos = y * sphereRadius
    
    spherePositions.push(x, yPos, z)
    
    // Assegna un colore unico a ogni particella usando un hash basato sulla posizione
    const hash = Math.sin(x * 12.9898 + yPos * 78.233 + z * 37.719) * 43758.5453
    const normalizedHash = (hash - Math.floor(hash))
    
    const colorIndex = Math.floor(normalizedHash * 12) % 12
    const color = colorPalette[colorIndex]
    
    const blendAmount = (normalizedHash * 10) % 1
    const nextColorIndex = (colorIndex + 1) % 12
    const nextColor = colorPalette[nextColorIndex]
    
    const finalColor = new THREE.Color().lerpColors(color, nextColor, blendAmount)
    finalColor.multiplyScalar(0.7)  // Colori opachi
    sphereColors.push(finalColor.r, finalColor.g, finalColor.b)
    
    scaleArray[i] = 0.01
  }
  
  // Crea la geometria della sfera
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(spherePositions, 3))
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(sphereColors, 3))
  geometry.setAttribute('aScale', new THREE.BufferAttribute(scaleArray, 1))
  
  // Crea il materiale per le particelle
  const material = new THREE.PointsMaterial({
    size: particleSize,
    transparent: true,
    opacity: 0.95,
    vertexColors: true,
    map: dotTexture,
    blending: THREE.AdditiveBlending,
    depthWrite: true,
    depthTest: false,
    toneMapped: false,
  })
  
  // Crea il morph target per l'animazione di scroll
  const morphPositions = []
  for (let i = 0; i < particleCount; i++) {
    const distance = 50
    const theta = THREE.MathUtils.randFloatSpread(360) * (Math.PI / 180)
    const phi = THREE.MathUtils.randFloatSpread(360) * (Math.PI / 180)
    const randomDistance = Math.random() * 150 * distance
    
    morphPositions.push(
      randomDistance * Math.sin(theta) * Math.cos(phi),
      randomDistance * Math.sin(theta) * Math.sin(phi),
      randomDistance * Math.cos(theta)
    )
  }
  
  geometry.morphAttributes.position = []
  geometry.morphAttributes.position[0] = new THREE.Float32BufferAttribute(
    morphPositions,
    3
  )
  
  // Crea il sistema di particelle
  const points = new THREE.Points(geometry, material)
  points.scale.x = points.scale.y = points.scale.z = 1.2
  points.position.set(0, 0.5, 0)
  points.rotation.x = Math.PI * 0.1
  points.rotation.y = Math.PI * 0.05
  
  scene.add(points)
  
  return points
}


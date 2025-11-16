/**
 * ============================================================================
 * SCENA MINECRAFT
 * ============================================================================
 * 
 * Responsabilità: Orchestrazione della scena completa (casa + alberi + radici)
 */

import * as THREE from "three"
import { mainObjectModel, dotTexture } from "../loaders/globalLoaders.js"
import { createHouseParticles } from "./house.js"
import { createTreeParticles } from "./tree.js"
import { createRootsParticles } from "./roots.js"

/**
 * Carica e renderizza l'oggetto 3D principale sulla homepage
 * Crea una casa stile Minecraft mantenendo la stessa densità di particelle del modello originale
 * 
 * @param {THREE.Scene} scene - La scena Three.js
 * @param {Object} config - Configurazione (particleSize, etc.)
 * @returns {THREE.Points} - Il sistema di particelle creato
 */
export function createMinecraftHouse(scene, config = {}) {
  const object = mainObjectModel
  const particleSize = config.particleSize || 0.155
  
  // Estrae la mesh e la geometria dal modello caricato per ottenere il numero di particelle
  let mesh = object.scene.children[0]
  let originalGeometry = mesh.geometry
  const particleCount = originalGeometry.attributes.position.count
  
  // Calcola la distanza media tra le particelle nel modello originale
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
  
  // Genera posizioni per una casa stile Minecraft
  const housePositions = []
  const houseColors = []
  
  // Riduce la densità dei puntini usando solo una frazione delle particelle
  const densityFactor = 0.4
  const reducedParticleCount = Math.floor(particleCount * densityFactor)
  
  // Dimensioni della casa stile Minecraft
  const houseSize = sphereRadius * 0.18
  const pyramidHeight = sphereRadius * 0.12
  const baseY = -houseSize * 0.1
  
  // Dividi le particelle: 45% per il corpo, 30% per il tetto, 25% per gli alberi (2 alberi)
  const cubeParticleCount = Math.floor(reducedParticleCount * 0.45)
  const pyramidParticleCount = Math.floor(reducedParticleCount * 0.3)
  const treeParticleCount = Math.floor((reducedParticleCount - cubeParticleCount - pyramidParticleCount) / 2)
  
  const totalParticleCount = cubeParticleCount + pyramidParticleCount + (treeParticleCount * 2)
  const scaleArray = new Float32Array(totalParticleCount)
  
  // Crea la casa
  const houseConfig = {
    houseSize,
    baseY,
    cubeParticleCount,
    pyramidParticleCount,
    pyramidHeight
  }
  
  createHouseParticles(houseConfig, housePositions, houseColors, scaleArray, 0)
  
  // Crea gli alberi
  const treeRightX = houseSize * 1.1
  const treeLeftX = -houseSize * 1.1
  const treeZ = 0
  const treeTrunkHeight = houseSize * 0.6
  const treeTrunkRadius = houseSize * 0.08
  const treeCrownRadius = houseSize * 0.35
  const treeCrownY = baseY + treeTrunkHeight
  
  let treeIndex = cubeParticleCount + pyramidParticleCount
  
  // Albero a destra
  const rightTreeConfig = {
    treeX: treeRightX,
    baseY,
    treeZ,
    treeTrunkHeight,
    treeTrunkRadius,
    treeCrownRadius,
    treeCrownY
  }
  const rightTreeParticles = createTreeParticles(
    rightTreeConfig,
    treeParticleCount,
    housePositions,
    houseColors,
    scaleArray,
    treeIndex
  )
  treeIndex += rightTreeParticles
  
  // Albero a sinistra
  const leftTreeConfig = {
    treeX: treeLeftX,
    baseY,
    treeZ,
    treeTrunkHeight,
    treeTrunkRadius,
    treeCrownRadius,
    treeCrownY
  }
  const leftTreeParticles = createTreeParticles(
    leftTreeConfig,
    treeParticleCount,
    housePositions,
    houseColors,
    scaleArray,
    treeIndex
  )
  treeIndex += leftTreeParticles
  
  // Crea la geometria
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(housePositions, 3))
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(houseColors, 3))
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
  for (let i = 0; i < totalParticleCount; i++) {
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
  points.position.set(0, 0, 0)
  points.rotation.x = 0
  points.rotation.y = 0
  points.rotation.z = 0
  
  scene.add(points)
  
  return points
}


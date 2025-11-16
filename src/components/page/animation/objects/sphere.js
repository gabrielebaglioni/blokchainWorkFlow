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
  
  // Genera posizioni per una casa stile Minecraft (cubo + piramide) - ben squadrata e riconoscibile
  const housePositions = []
  const houseColors = []
  
  // Riduce la densità dei puntini usando solo una frazione delle particelle
  const densityFactor = 0.4  // Aumentato per includere albero e piramide più densa
  const reducedParticleCount = Math.floor(particleCount * densityFactor)
  
  // Dimensioni della casa stile Minecraft - cubo perfetto per il corpo
  const houseSize = sphereRadius * 0.18  // Dimensione del cubo (tutti i lati uguali)
  const pyramidHeight = sphereRadius * 0.12  // Altezza del tetto piramidale
  
  // Dividi le particelle: 45% per il corpo, 30% per il tetto, 25% per gli alberi (2 alberi)
  const cubeParticleCount = Math.floor(reducedParticleCount * 0.45)
  const pyramidParticleCount = Math.floor(reducedParticleCount * 0.3)
  const treeParticleCount = Math.floor((reducedParticleCount - cubeParticleCount - pyramidParticleCount) / 2)  // Metà per ogni albero
  
  const totalParticleCount = cubeParticleCount + pyramidParticleCount + (treeParticleCount * 2)
  const scaleArray = new Float32Array(totalParticleCount)
  
  // Colori per le parti della casa
  const redColor = new THREE.Color(0.8, 0.1, 0.1)  // Rosso per il cubo
  const blueColor = new THREE.Color(0.1, 0.2, 0.8)  // Blu per il tetto
  
  // Genera particelle per il corpo della casa (cubo perfetto) - griglia 3D regolare
  // La base è orizzontale (poggiata sul terreno) - "seduto" meglio
  const gridDensity = Math.ceil(Math.cbrt(cubeParticleCount * 1.2))
  const step = houseSize / (gridDensity - 1)
  const offset = houseSize / 2
  const baseY = -houseSize * 0.1  // La base del cubo è leggermente sotto per farlo "sedere" meglio
  
  let cubeIndex = 0
  // Crea una griglia 3D regolare con base orizzontale
  for (let ix = 0; ix < gridDensity && cubeIndex < cubeParticleCount; ix++) {
    for (let iy = 0; iy < gridDensity && cubeIndex < cubeParticleCount; iy++) {
      for (let iz = 0; iz < gridDensity && cubeIndex < cubeParticleCount; iz++) {
        const x = -offset + ix * step
        const y = baseY + iy * step  // Base a y=0, si estende verso l'alto
        const z = -offset + iz * step
        
        // Salta i punti che sarebbero nella porta (faccia frontale, centro)
        const isDoorArea = z > offset - step * 0.5 && 
                          Math.abs(x) < houseSize * 0.15 && 
                          y < houseSize * 0.4 && y > baseY
        
        if (isDoorArea) continue  // Salta la porta
        
        // Includi solo punti sulla superficie o vicino alla superficie
        const isOnSurface = 
          Math.abs(x + offset) < step * 0.5 || Math.abs(x - offset) < step * 0.5 ||
          Math.abs(y - baseY) < step * 0.5 || Math.abs(y - (baseY + houseSize)) < step * 0.5 ||
          Math.abs(z + offset) < step * 0.5 || Math.abs(z - offset) < step * 0.5
        
        if (isOnSurface || Math.random() < 0.3) {
          housePositions.push(x, y, z)
          houseColors.push(redColor.r, redColor.g, redColor.b)  // Colore rosso per il cubo
          scaleArray[cubeIndex] = 0.01
          cubeIndex++
        }
      }
    }
  }
  
  // Aggiungi la porta (cornice scura/nera)
  const doorWidth = houseSize * 0.25
  const doorHeight = houseSize * 0.4
  const doorDepth = step * 2
  const doorX = 0
  const doorZ = offset + doorDepth / 2
  
  const doorGridDensity = 8
  const doorStepX = doorWidth / doorGridDensity
  const doorStepY = doorHeight / doorGridDensity
  
  for (let i = 0; i < 20 && cubeIndex < cubeParticleCount; i++) {
    // Cornice della porta
    const side = Math.floor(i / 5)
    let x, y, z
    
    switch(side) {
      case 0: // Lato sinistro
        x = doorX - doorWidth / 2
        y = baseY + (i % 5) * doorStepY
        z = doorZ
        break
      case 1: // Lato destro
        x = doorX + doorWidth / 2
        y = baseY + (i % 5) * doorStepY
        z = doorZ
        break
      case 2: // Lato superiore
        x = doorX - doorWidth / 2 + (i % 5) * doorStepX
        y = baseY + doorHeight
        z = doorZ
        break
      default: // Lato inferiore
        x = doorX - doorWidth / 2 + (i % 5) * doorStepX
        y = baseY
        z = doorZ
        break
    }
    
      housePositions.push(x, y, z)
      houseColors.push(0.1, 0.1, 0.1)  // Porta molto scura
      scaleArray[cubeIndex] = 0.012
      cubeIndex++
  }
  
  // Genera particelle per la piramide (tetto) - griglia 3D regolare con bordi marcati, più densa
  const pyramidBaseY = baseY + houseSize  // La piramide inizia sopra il cubo
  const baseSize = houseSize * 0.98   // Base del tetto quasi uguale al cubo
  const tipY = pyramidBaseY + pyramidHeight
  
  // Calcola griglia per la piramide - più densa
  const pyramidGridDensity = Math.ceil(Math.sqrt(pyramidParticleCount * 0.8))  // Aumentato da 0.6 a 0.8
  const baseStep = baseSize / (pyramidGridDensity - 1)
  const heightStep = pyramidHeight / (pyramidGridDensity - 1)
  
  let pyramidIndex = 0
  
  // Prima: enfatizza i bordi esterni della piramide (più marcati)
  const edgeDensity = Math.ceil(pyramidGridDensity * 1.5)
  
  // 4 spigoli verticali (dalla base alla punta)
  for (let i = 0; i < edgeDensity && pyramidIndex < pyramidParticleCount; i++) {
    const heightRatio = i / (edgeDensity - 1)
    const y = pyramidBaseY + heightRatio * pyramidHeight
    const currentBaseSize = baseSize * (1 - heightRatio)
    
    // 4 angoli della base che si restringono verso la punta
    const corners = [
      [currentBaseSize / 2, 0, currentBaseSize / 2],
      [-currentBaseSize / 2, 0, currentBaseSize / 2],
      [currentBaseSize / 2, 0, -currentBaseSize / 2],
      [-currentBaseSize / 2, 0, -currentBaseSize / 2]
    ]
    
    for (const [cx, cy, cz] of corners) {
      if (pyramidIndex < pyramidParticleCount) {
        housePositions.push(cx, y, cz)
        houseColors.push(blueColor.r, blueColor.g, blueColor.b)  // Colore blu per il tetto
        scaleArray[cubeParticleCount + pyramidIndex] = 0.015
        pyramidIndex++
      }
    }
  }
  
  // Poi: griglia regolare per le facce della piramide - più densa
  for (let iy = 0; iy < pyramidGridDensity && pyramidIndex < pyramidParticleCount; iy++) {
    const heightRatio = iy / (pyramidGridDensity - 1)
    const y = pyramidBaseY + heightRatio * pyramidHeight
    const currentBaseSize = baseSize * (1 - heightRatio)
    const currentStep = currentBaseSize / (pyramidGridDensity - 1)
    
    for (let ix = 0; ix < pyramidGridDensity && pyramidIndex < pyramidParticleCount; ix++) {
      for (let iz = 0; iz < pyramidGridDensity && pyramidIndex < pyramidParticleCount; iz++) {
        const x = -currentBaseSize / 2 + ix * currentStep
        const z = -currentBaseSize / 2 + iz * currentStep
        
        // Verifica se il punto è dentro la piramide
        const distX = Math.abs(x) / (currentBaseSize / 2)
        const distZ = Math.abs(z) / (currentBaseSize / 2)
        
        // Includi più punti (aumentato da 0.2 a 0.5 per maggiore densità)
        const isOnEdge = distX > 0.85 || distZ > 0.85 || heightRatio < 0.1 || heightRatio > 0.9
        const isOnSurface = Math.abs(distX - 1) < 0.1 || Math.abs(distZ - 1) < 0.1
        
        if ((isOnEdge || isOnSurface || Math.random() < 0.5) && distX <= 1 && distZ <= 1) {
          housePositions.push(x, y, z)
          houseColors.push(blueColor.r, blueColor.g, blueColor.b)  // Colore blu per il tetto
          scaleArray[cubeParticleCount + pyramidIndex] = isOnEdge ? 0.015 : 0.01
          pyramidIndex++
        }
      }
    }
  }
  
  // Genera particelle per gli alberi - uno a destra e uno a sinistra
  const treeRightX = houseSize * 1.1  // Posizione dell'albero a destra
  const treeLeftX = -houseSize * 1.1  // Posizione dell'albero a sinistra
  const treeZ = 0
  const treeTrunkHeight = houseSize * 0.6
  const treeTrunkRadius = houseSize * 0.08
  const treeCrownRadius = houseSize * 0.35  // Chioma più grande
  const treeCrownY = baseY + treeTrunkHeight
  const treeCrownCenterY = treeCrownY + treeCrownRadius * 0.5
  
  let treeIndex = 0
  
  // Funzione helper per creare un albero
  function createTree(treeX, maxParticles) {
    let localTreeIndex = 0
  
    // Tronco dell'albero (cilindro) - marrone
    const trunkGridDensity = Math.ceil(Math.sqrt(maxParticles * 0.3))
    const trunkStepY = treeTrunkHeight / trunkGridDensity
    const trunkStepR = treeTrunkRadius / trunkGridDensity
    
    for (let iy = 0; iy < trunkGridDensity && localTreeIndex < maxParticles; iy++) {
      const y = baseY + iy * trunkStepY
      for (let ir = 0; ir < trunkGridDensity && localTreeIndex < maxParticles; ir++) {
        const r = ir * trunkStepR
        const angle = Math.random() * Math.PI * 2
        const x = treeX + Math.cos(angle) * r
        const z = treeZ + Math.sin(angle) * r
        
        housePositions.push(x, y, z)
        houseColors.push(0.5, 0.3, 0.2)  // Colore marrone più marcato per il tronco
        scaleArray[cubeParticleCount + pyramidParticleCount + treeIndex + localTreeIndex] = 0.01
        localTreeIndex++
      }
    }
    
    // Prima chioma dell'albero (sfera inferiore) - verde più scuro, molto più densa
    const crownGridDensity = Math.ceil(Math.cbrt(maxParticles * 0.9))  // Aumentata da 0.5 a 0.8 per maggiore densità
    const crownStep = treeCrownRadius * 2 / (crownGridDensity - 1)
    const firstCrownCenterY = treeCrownY + treeCrownRadius * 0.3
    
    for (let ix = 0; ix < crownGridDensity && localTreeIndex < maxParticles; ix++) {
      for (let iy = 0; iy < crownGridDensity && localTreeIndex < maxParticles; iy++) {
        for (let iz = 0; iz < crownGridDensity && localTreeIndex < maxParticles; iz++) {
          const x = treeX + (ix - crownGridDensity / 2) * crownStep
          const y = firstCrownCenterY + (iy - crownGridDensity / 2) * crownStep
          const z = treeZ + (iz - crownGridDensity / 2) * crownStep
          
          const dx = x - treeX
          const dy = y - firstCrownCenterY
          const dz = z - treeZ
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)
          
          // Aumentata la densità: soglia ridotta da 0.6 a 0.5 e probabilità aumentata da 0.7 a 0.9
          if (dist <= treeCrownRadius && (dist > treeCrownRadius * 0.5 || Math.random() < 0.9)) {
            housePositions.push(x, y, z)
            houseColors.push(0.02, 0.15, 0.02)  // Colore verde ancora più scuro per la chioma
            scaleArray[cubeParticleCount + pyramidParticleCount + treeIndex + localTreeIndex] = 0.01
            localTreeIndex++
          }
        }
      }
    }
    
    // Seconda chioma dell'albero (sfera superiore) - verde più scuro, molto più densa
    const secondCrownRadius = treeCrownRadius * 0.85
    const secondCrownCenterY = firstCrownCenterY + treeCrownRadius * 0.6
    const secondCrownStep = secondCrownRadius * 2 / (crownGridDensity - 1)
    
    for (let ix = 0; ix < crownGridDensity && localTreeIndex < maxParticles; ix++) {
      for (let iy = 0; iy < crownGridDensity && localTreeIndex < maxParticles; iy++) {
        for (let iz = 0; iz < crownGridDensity && localTreeIndex < maxParticles; iz++) {
          const x = treeX + (ix - crownGridDensity / 2) * secondCrownStep
          const y = secondCrownCenterY + (iy - crownGridDensity / 2) * secondCrownStep
          const z = treeZ + (iz - crownGridDensity / 2) * secondCrownStep
          
          const dx = x - treeX
          const dy = y - secondCrownCenterY
          const dz = z - treeZ
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)
          
          // Aumentata la densità: soglia ridotta da 0.6 a 0.5 e probabilità aumentata da 0.7 a 0.9
          if (dist <= secondCrownRadius && (dist > secondCrownRadius * 0.5 || Math.random() < 0.9)) {
            housePositions.push(x, y, z)
            houseColors.push(0.02, 0.15, 0.02)  // Colore verde ancora più scuro per la chioma
            scaleArray[cubeParticleCount + pyramidParticleCount + treeIndex + localTreeIndex] = 0.01
            localTreeIndex++
          }
        }
      }
    }
    
    return localTreeIndex
  }
  
  // Crea l'albero a destra
  const rightTreeParticles = createTree(treeRightX, treeParticleCount)
  treeIndex += rightTreeParticles
  
  // Crea l'albero a sinistra
  const leftTreeParticles = createTree(treeLeftX, treeParticleCount)
  treeIndex += leftTreeParticles
  
  // Crea la geometria della casa
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
  points.position.set(0, 0, 0)  // Centrata perfettamente
  points.rotation.x = 0  // Nessuna rotazione per non farla sembrare storta
  points.rotation.y = 0
  points.rotation.z = 0
  
  scene.add(points)
  
  return points
}


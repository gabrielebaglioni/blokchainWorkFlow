/**
 * ============================================================================
 * CASA MINECRAFT
 * ============================================================================
 * 
 * Responsabilità: Creare solo la casa (cubo + tetto piramidale)
 */

import * as THREE from "three"

/**
 * Crea le particelle per la casa (cubo + tetto)
 * @param {Object} config - Configurazione (houseSize, baseY, etc.)
 * @param {Array} positions - Array dove aggiungere le posizioni
 * @param {Array} colors - Array dove aggiungere i colori
 * @param {Float32Array} scaleArray - Array per le scale
 * @param {number} startIndex - Indice iniziale nell'array scale
 * @returns {Object} - {cubeIndex, pyramidIndex} - indici finali
 */
export function createHouseParticles(config, positions, colors, scaleArray, startIndex) {
  const {
    houseSize,
    baseY,
    cubeParticleCount,
    pyramidParticleCount,
    pyramidHeight
  } = config
  
  // Colori per le parti della casa
  const redColor = new THREE.Color(0.8, 0.1, 0.1)  // Rosso per il cubo
  const blueColor = new THREE.Color(0.1, 0.2, 0.8)  // Blu per il tetto
  
  let cubeIndex = startIndex
  let pyramidIndex = startIndex + cubeParticleCount
  
  // Genera particelle per il corpo della casa (cubo perfetto) - griglia 3D regolare
  const gridDensity = Math.ceil(Math.cbrt(cubeParticleCount * 1.2))
  const step = houseSize / (gridDensity - 1)
  const offset = houseSize / 2
  
  // Crea una griglia 3D regolare con base orizzontale
  for (let ix = 0; ix < gridDensity && cubeIndex < startIndex + cubeParticleCount; ix++) {
    for (let iy = 0; iy < gridDensity && cubeIndex < startIndex + cubeParticleCount; iy++) {
      for (let iz = 0; iz < gridDensity && cubeIndex < startIndex + cubeParticleCount; iz++) {
        const x = -offset + ix * step
        const y = baseY + iy * step
        const z = -offset + iz * step
        
        // Salta i punti che sarebbero nella porta
        const isDoorArea = z > offset - step * 0.5 && 
                          Math.abs(x) < houseSize * 0.15 && 
                          y < houseSize * 0.4 && y > baseY
        
        if (isDoorArea) continue
        
        // Includi solo punti sulla superficie o vicino alla superficie
        const isOnSurface = 
          Math.abs(x + offset) < step * 0.5 || Math.abs(x - offset) < step * 0.5 ||
          Math.abs(y - baseY) < step * 0.5 || Math.abs(y - (baseY + houseSize)) < step * 0.5 ||
          Math.abs(z + offset) < step * 0.5 || Math.abs(z - offset) < step * 0.5
        
        if (isOnSurface || Math.random() < 0.3) {
          positions.push(x, y, z)
          colors.push(redColor.r, redColor.g, redColor.b)
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
  
  for (let i = 0; i < 20 && cubeIndex < startIndex + cubeParticleCount; i++) {
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
    
    positions.push(x, y, z)
    colors.push(0.1, 0.1, 0.1)  // Porta molto scura
    scaleArray[cubeIndex] = 0.012
    cubeIndex++
  }
  
  // Genera particelle per la piramide (tetto)
  const pyramidBaseY = baseY + houseSize
  const baseSize = houseSize * 0.98
  const pyramidGridDensity = Math.ceil(Math.sqrt(pyramidParticleCount * 0.8))
  const baseStep = baseSize / (pyramidGridDensity - 1)
  const heightStep = pyramidHeight / (pyramidGridDensity - 1)
  
  // Enfatizza i bordi esterni della piramide
  const edgeDensity = Math.ceil(pyramidGridDensity * 1.5)
  
  for (let i = 0; i < edgeDensity && pyramidIndex < startIndex + cubeParticleCount + pyramidParticleCount; i++) {
    const heightRatio = i / (edgeDensity - 1)
    const y = pyramidBaseY + heightRatio * pyramidHeight
    const currentBaseSize = baseSize * (1 - heightRatio)
    
    const corners = [
      [currentBaseSize / 2, 0, currentBaseSize / 2],
      [-currentBaseSize / 2, 0, currentBaseSize / 2],
      [currentBaseSize / 2, 0, -currentBaseSize / 2],
      [-currentBaseSize / 2, 0, -currentBaseSize / 2]
    ]
    
    for (const [cx, cy, cz] of corners) {
      if (pyramidIndex < startIndex + cubeParticleCount + pyramidParticleCount) {
        positions.push(cx, y, cz)
        colors.push(blueColor.r, blueColor.g, blueColor.b)
        scaleArray[pyramidIndex] = 0.015
        pyramidIndex++
      }
    }
  }
  
  // Griglia regolare per le facce della piramide
  for (let iy = 0; iy < pyramidGridDensity && pyramidIndex < startIndex + cubeParticleCount + pyramidParticleCount; iy++) {
    const heightRatio = iy / (pyramidGridDensity - 1)
    const y = pyramidBaseY + heightRatio * pyramidHeight
    const currentBaseSize = baseSize * (1 - heightRatio)
    const currentStep = currentBaseSize / (pyramidGridDensity - 1)
    
    for (let ix = 0; ix < pyramidGridDensity && pyramidIndex < startIndex + cubeParticleCount + pyramidParticleCount; ix++) {
      for (let iz = 0; iz < pyramidGridDensity && pyramidIndex < startIndex + cubeParticleCount + pyramidParticleCount; iz++) {
        const x = -currentBaseSize / 2 + ix * currentStep
        const z = -currentBaseSize / 2 + iz * currentStep
        
        const distX = Math.abs(x) / (currentBaseSize / 2)
        const distZ = Math.abs(z) / (currentBaseSize / 2)
        
        const isOnEdge = distX > 0.85 || distZ > 0.85 || heightRatio < 0.1 || heightRatio > 0.9
        const isOnSurface = Math.abs(distX - 1) < 0.1 || Math.abs(distZ - 1) < 0.1
        
        if ((isOnEdge || isOnSurface || Math.random() < 0.5) && distX <= 1 && distZ <= 1) {
          positions.push(x, y, z)
          colors.push(blueColor.r, blueColor.g, blueColor.b)
          scaleArray[pyramidIndex] = isOnEdge ? 0.015 : 0.01
          pyramidIndex++
        }
      }
    }
  }
  
  return { cubeIndex, pyramidIndex }
}

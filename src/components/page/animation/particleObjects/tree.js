/**
 * ============================================================================
 * ALBERI
 * ============================================================================
 * 
 * Responsabilità: Creare solo gli alberi (tronco + chiome)
 */

/**
 * Crea le particelle per un albero
 * @param {Object} config - Configurazione (treeX, baseY, treeTrunkHeight, etc.)
 * @param {number} maxParticles - Numero massimo di particelle per albero
 * @param {Array} positions - Array dove aggiungere le posizioni
 * @param {Array} colors - Array dove aggiungere i colori
 * @param {Float32Array} scaleArray - Array per le scale
 * @param {number} startIndex - Indice iniziale nell'array scale
 * @returns {number} - Numero di particelle create
 */
export function createTreeParticles(config, maxParticles, positions, colors, scaleArray, startIndex) {
  const {
    treeX,
    baseY,
    treeZ,
    treeTrunkHeight,
    treeTrunkRadius,
    treeCrownRadius,
    treeCrownY
  } = config
  
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
      
      positions.push(x, y, z)
      colors.push(0.5, 0.3, 0.2)  // Colore marrone per il tronco
      scaleArray[startIndex + localTreeIndex] = 0.01
      localTreeIndex++
    }
  }
  
  // Prima chioma dell'albero (sfera inferiore) - verde scuro
  const crownGridDensity = Math.ceil(Math.cbrt(maxParticles * 0.9))
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
        
        if (dist <= treeCrownRadius && (dist > treeCrownRadius * 0.5 || Math.random() < 0.9)) {
          positions.push(x, y, z)
          colors.push(0.02, 0.15, 0.02)  // Colore verde scuro per la chioma
          scaleArray[startIndex + localTreeIndex] = 0.01
          localTreeIndex++
        }
      }
    }
  }
  
  // Seconda chioma dell'albero (sfera superiore) - verde scuro
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
        
        if (dist <= secondCrownRadius && (dist > secondCrownRadius * 0.5 || Math.random() < 0.9)) {
          positions.push(x, y, z)
          colors.push(0.02, 0.15, 0.02)  // Colore verde scuro per la chioma
          scaleArray[startIndex + localTreeIndex] = 0.01
          localTreeIndex++
        }
      }
    }
  }
  
  return localTreeIndex
}


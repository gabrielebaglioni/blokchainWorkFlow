/**
 * ============================================================================
 * BACKGROUND (SKYBOX)
 * ============================================================================
 * 
 * Crea uno skybox equirettangolare (sfondo panoramico)
 */

import * as THREE from "three"
import { textures } from "../loaders/globalLoaders.js"
import { getTextureIdentifier } from "../loaders/textureLoader.js"

/**
 * Rimuove tutti i background mesh esistenti dalla scena
 * @param {THREE.Scene} scene - La scena Three.js
 */
function removeExistingBackgrounds(scene) {
  // Trova e rimuovi tutti i mesh di background
  // I background sono mesh sferici con MeshBasicMaterial e texture
  const objectsToRemove = []
  scene.traverse((object) => {
    if (
      object instanceof THREE.Mesh &&
      object.geometry instanceof THREE.SphereGeometry &&
      object.material instanceof THREE.MeshBasicMaterial &&
      object.material.map // Ha una texture
    ) {
      // È probabilmente un background (skybox)
      objectsToRemove.push(object)
    }
  })
  
  objectsToRemove.forEach((mesh) => {
    scene.remove(mesh)
    mesh.geometry.dispose()
    mesh.material.dispose()
    if (mesh.material.map) {
      mesh.material.map.dispose()
    }
  })
}

/**
 * Crea uno skybox equirettangolare (sfondo panoramico)
 * Questo è il background che vedi quando guardi intorno nella scena 3D
 * Le immagini panoramiche vengono proiettate su una sfera gigante
 * 
 * @param {THREE.Scene} scene - La scena Three.js
 * @param {string} url - L'URL della pagina corrente
 * @returns {THREE.Mesh} - Il mesh del background creato
 */
export function createEquirectangularBackground(scene, url) {
  // Rimuovi i background esistenti prima di crearne uno nuovo
  removeExistingBackgrounds(scene)
  // Crea una geometria sferica molto grande (raggio 500 unità)
  // 60 = segmenti orizzontali, 40 = segmenti verticali (più segmenti = più dettaglio)
  const geometry = new THREE.SphereGeometry(500, 60, 40)
  
  // Scala negativa sull'asse X per invertire la sfera (così vediamo l'interno, non l'esterno)
  geometry.scale(-1, 1, 1)

  // Ottieni l'identificatore della texture per questa pagina
  const textureIdentifier = getTextureIdentifier(url)
  const texture = textures[textureIdentifier]

  // Crea il materiale con la texture di background per questa pagina
  const material = new THREE.MeshBasicMaterial({
    map: texture,  // Usa la texture caricata per questa pagina
    toneMapped: false,  // Non applica tone mapping (mantiene i colori originali)
  })

  // Crea la mesh (l'oggetto 3D) con la geometria e il materiale
  const mesh = new THREE.Mesh(geometry, material)

  // Ruota lo skybox per orientarlo correttamente
  mesh.rotation.y = -Math.PI / 2
  
  // Rotazioni speciali per alcune pagine (per allineare meglio le immagini)
  if (url.indexOf("ethereum") !== -1 || url.indexOf("ai-layer") !== -1) {
    mesh.rotation.y = -Math.PI / 1.55
  }
  if (url.indexOf("ourstory") !== -1 || url.indexOf("input-layer") !== -1) {
    mesh.rotation.y = -Math.PI / 0.8
  }

  // Aggiunge lo skybox alla scena
  scene.add(mesh)
  
  // Restituisce il mesh per poterlo tracciare
  return mesh
}


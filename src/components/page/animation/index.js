/**
 * ============================================================================
 * ENTRY POINT PRINCIPALE
 * ============================================================================
 * 
 * Questo file esporta le funzioni principali per l'animazione 3D
 */

export { Animate } from "./core/main.js"
export { loadAssets } from "./loaders/assetLoader.js"
export { urlToTextureMap } from "./constants/textureMap.js"

// Esporta come default per compatibilità
import { Animate } from "./core/main.js"
export default Animate


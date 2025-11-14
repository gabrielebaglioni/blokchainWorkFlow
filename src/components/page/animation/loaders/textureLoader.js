/**
 * ============================================================================
 * GESTIONE DELLE TEXTURE DI BACKGROUND
 * ============================================================================
 */

import { urlToTextureMap } from "../constants/textureMap.js"
import { testWebP } from "../utils/webp.js"
import { textures, backgroundLoader } from "./globalLoaders.js"

/**
 * Normalizza l'URL rimuovendo hash e query string
 * @param {string} url - L'URL da normalizzare
 * @returns {string} - L'URL normalizzato
 */
function normalizeUrl(url) {
  // Rimuovi hash (#section) e query string (?param=value)
  return url.split('#')[0].split('?')[0]
}

/**
 * Determina quale immagine di background caricare in base all'URL della pagina
 * e alla dimensione dello schermo
 * 
 * @param {string} url - L'URL della pagina corrente (es. "/", "/architecture", etc.)
 * @returns {string} - Il nome completo del file immagine da caricare
 */
function getTextureIdentifierByUrl(url) {
  // Normalizza l'URL rimuovendo hash e query string
  const normalizedUrl = normalizeUrl(url)
  
  // Se l'URL normalizzato non è nella mappa, usa "/" come fallback
  const urlKey = urlToTextureMap[normalizedUrl] ? normalizedUrl : "/"
  
  // Seleziona la dimensione dell'immagine in base alla larghezza dello schermo:
  // - Small (< 500px): immagini più piccole per risparmiare banda
  // - Medium (500-1700px): dimensioni medie
  // - Large (> 1700px): immagini ad alta risoluzione per schermi grandi
  const backgroundImagePath = (() => {
    if (screen.width < 500) {
      return urlToTextureMap[urlKey].small
    } else if (screen.width >= 500 && screen.width <= 1700) {
      return urlToTextureMap[urlKey].medium
    } else {
      return urlToTextureMap[urlKey].large
    }
  })()

  // Scegli il formato: WebP se supportato (più efficiente), altrimenti JPG
  const webpSupported = testWebP()
  const fullIdentifier = webpSupported
    ? backgroundImagePath + ".webp"
    : backgroundImagePath + ".jpg"

  return fullIdentifier
}

/**
 * Carica e mette in cache una texture di background
 * Se la texture è già in cache, la restituisce immediatamente
 * 
 * @param {string} url - L'URL della pagina corrente
 * @returns {Promise} - Promise che si risolve quando la texture è caricata
 */
export async function loadAndCacheTexture(url) {
  // Normalizza l'URL per rimuovere hash e query string
  const normalizedUrl = normalizeUrl(url)
  
  // Ottieni il nome completo del file da caricare
  const fullIdentifier = getTextureIdentifierByUrl(normalizedUrl)
  
  // Controlla se la texture è già in cache
  const texture = textures[fullIdentifier]
  if (texture) return texture

  // Se non è in cache, caricala e poi salvala in cache
  return new Promise((resolve) => {
    backgroundLoader.load(`assets/${fullIdentifier}`, (texture) => {
      textures[fullIdentifier] = texture
      resolve(texture)
    })
  })
}

/**
 * Ottiene l'identificatore della texture per un URL
 * @param {string} url - L'URL della pagina
 * @returns {string} - L'identificatore della texture
 */
export function getTextureIdentifier(url) {
  const normalizedUrl = normalizeUrl(url)
  return getTextureIdentifierByUrl(normalizedUrl)
}


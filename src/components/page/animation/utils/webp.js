/**
 * ============================================================================
 * UTILITÀ PER IL FORMATO WEBP
 * ============================================================================
 */

/**
 * Verifica se il browser supporta il formato WebP
 * WebP è un formato di immagine più efficiente di JPEG/PNG
 * @returns {boolean} true se WebP è supportato, false altrimenti
 */
export function testWebP() {
  // Crea un canvas temporaneo per testare il supporto WebP
  const canvas =
    typeof document === "object" ? document.createElement("canvas") : {}
  canvas.width = canvas.height = 1
  
  // Prova a convertire il canvas in WebP
  // Se il risultato contiene "image/webp" alla posizione 5, il formato è supportato
  return canvas.toDataURL
    ? canvas.toDataURL("image/webp").indexOf("image/webp") === 5
    : false
}


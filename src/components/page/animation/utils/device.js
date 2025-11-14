/**
 * ============================================================================
 * UTILITÀ PER IL DISPOSITIVO
 * ============================================================================
 */

/**
 * Verifica se il dispositivo è mobile
 * @returns {boolean} true se è un dispositivo mobile
 */
export function isMobileDevice() {
  // Controlla l'user agent per identificare dispositivi mobili
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    return true
  } else {
    return false
  }
}

/**
 * Imposta l'altezza del documento come variabile CSS
 * Utile per gestire correttamente l'altezza su mobile
 */
export function setDocumentHeight() {
  const doc = document.body
  doc.style.setProperty("--doc-height", `${window.innerHeight}px`)
}


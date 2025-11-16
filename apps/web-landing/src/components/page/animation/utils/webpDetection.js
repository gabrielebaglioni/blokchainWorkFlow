/**
 * ============================================================================
 * RILEVAMENTO SUPPORTO WEBP
 * ============================================================================
 * 
 * Responsabilità: Rilevare il supporto WebP e aggiornare il DOM di conseguenza
 */

import { testWebP } from "./webp.js"

/**
 * Rileva il supporto WebP e aggiunge classi CSS
 */
export function renderWebPImages() {
  const mainMenuContainer = document.getElementById(
    "main--menu--internal--container"
  )
  
  if (mainMenuContainer) {
    if (testWebP()) {
      mainMenuContainer.classList.add("webp--supported")
    } else {
      mainMenuContainer.classList.add("webp--not--supported")
    }
  }
}


/**
 * ============================================================================
 * UTILITÀ PER I COLORI
 * ============================================================================
 */

/**
 * Converte valori RGB da 0-255 a percentuali 0-1
 * @param {number[]} arr - Array di valori RGB [R, G, B]
 * @returns {number[]} - Array di valori RGB normalizzati [R, G, B]
 */
export function rgbToPercentage(arr) {
  return arr.map((value) => value / 255)
}


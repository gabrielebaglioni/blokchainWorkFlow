/**
 * ============================================================================
 * CONFIGURAZIONI DELLA SCENA
 * ============================================================================
 */

// Tipo di file del modello 3D attualmente in uso
export const FILE_TYPE = "obj"

// Velocità di rotazione dell'oggetto principale
export const ROTATION_SPEED = 0.00003

// Punto di stop per l'espansione delle particelle
export const FINAL_STOP_POINT = 0.002

// Colore RGB per le particelle [R, G, B] (valori 0-255)
export const DEFAULT_PARTICLE_COLOR = [137, 188, 222]

// Parametri per l'effetto bloom (bagliore) - attualmente non usato
export const bloomParams = {
  bloomStrength: 1,
  bloomThreshold: 0.98,
  bloomRadius: 0.5,
}


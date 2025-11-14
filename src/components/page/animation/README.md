# Animation Module Structure

Questo modulo contiene tutto il codice per le animazioni 3D del sito, refactorizzato da un singolo file `animate.js` in una struttura modulare organizzata.

## Struttura delle Cartelle

```
animation/
├── index.js                    # Entry point principale (esporta Animate e loadAssets)
├── constants/                  # Costanti e configurazioni
│   ├── textureMap.js           # Mappa delle texture per ogni pagina
│   └── sceneConfig.js          # Configurazioni della scena (velocità, colori, etc.)
├── loaders/                    # Gestione del caricamento degli asset
│   ├── globalLoaders.js        # Loader e renderer globali (riutilizzabili)
│   ├── textureLoader.js        # Caricamento e caching delle texture
│   └── assetLoader.js          # Caricamento di tutti gli asset (texture, modelli, etc.)
├── utils/                      # Funzioni di utilità
│   ├── webp.js                 # Rilevamento supporto WebP
│   ├── colors.js               # Conversioni colori (RGB, etc.)
│   ├── device.js               # Rilevamento dispositivo (mobile/desktop)
│   └── helpers.js              # Funzioni helper (resize, event listeners, etc.)
├── scene/                      # Setup della scena 3D
│   ├── sceneSetup.js           # Inizializzazione scena, camera, renderer, controlli
│   └── lighting.js             # Illuminazione della scena
├── objects/                    # Oggetti 3D
│   ├── sphere.js                # Sfera colorata (homepage)
│   └── degenerateMesh.js       # Mesh degenerato (altre pagine)
├── effects/                     # Effetti visivi
│   ├── background.js            # Skybox (background panoramico)
│   └── fireflies.js            # Effetto lucciole
├── animation/                   # Loop di animazione
│   └── renderLoop.js           # Loop principale di rendering
├── core/                       # Logica principale
│   └── main.js                 # Funzione Animate principale (orchestra tutto)
├── assets/                      # Asset Three.js (OrbitControls, shaders, etc.)
└── animations/                  # Shader GLSL per gli effetti
```

## Flusso di Esecuzione

1. **Entry Point** (`index.js`): Esporta `Animate` e `loadAssets`
2. **Caricamento Asset** (`loaders/assetLoader.js`): Carica texture, modelli 3D, etc.
3. **Inizializzazione** (`core/main.js`):
   - Crea scena, camera, renderer
   - Aggiunge oggetti 3D (sfera o mesh degenerato)
   - Aggiunge effetti (background, fireflies)
   - Avvia il loop di animazione
4. **Loop di Animazione** (`animation/renderLoop.js`): 
   - Aggiorna rotazioni
   - Gestisce animazioni basate su scroll
   - Renderizza la scena

## Utilizzo

```javascript
import animate, { loadAssets } from "./animation"

// Carica gli asset prima di avviare l'animazione
await loadAssets("/")

// Avvia l'animazione
const cleanup = animate("/")

// Quando necessario, pulisci
cleanup()
```

## Vantaggi della Nuova Struttura

- **Modularità**: Ogni file ha una responsabilità chiara
- **Manutenibilità**: Più facile trovare e modificare codice specifico
- **Testabilità**: Ogni modulo può essere testato indipendentemente
- **Riusabilità**: I moduli possono essere riutilizzati in altri contesti
- **Leggibilità**: Nomi di file e cartelle descrivono chiaramente il loro contenuto


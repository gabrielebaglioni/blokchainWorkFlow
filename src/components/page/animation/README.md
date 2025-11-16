# Animation Module Structure

Questo modulo contiene tutto il codice per le animazioni 3D del sito, refactorizzato da un singolo file `animate.js` in una struttura modulare organizzata seguendo i principi Clean Code e Single Responsibility Principle.

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
│   ├── webpDetection.js        # Rilevamento WebP e aggiornamento DOM
│   ├── colors.js               # Conversioni colori (RGB, etc.)
│   ├── device.js               # Rilevamento dispositivo (mobile/desktop)
│   └── helpers.js              # Funzioni helper (resize, event listeners, etc.)
├── scene/                      # Setup della scena 3D (ogni file ha una responsabilità)
│   ├── scene.js                # Inizializzazione scena base
│   ├── camera.js               # Inizializzazione camera
│   ├── renderer.js             # Inizializzazione renderer WebGL
│   ├── controls.js             # Inizializzazione controlli di navigazione (OrbitControls)
│   ├── postProcessing.js       # Inizializzazione effetti post-processing
│   └── lighting.js             # Illuminazione della scena
├── particleObjects/            # Oggetti 3D creati con particelle
│   ├── minecraftScene.js       # Orchestrazione scena completa (casa + alberi)
│   ├── house.js                # Creazione casa (cubo + tetto)
│   ├── tree.js                 # Creazione alberi (tronco + chiome)
│   └── sparseParticleMesh.js   # Mesh con particelle sparse (pagine non-homepage)
├── visualEffects/              # Effetti visivi
│   ├── background.js           # Skybox (background panoramico)
│   └── fireflies.js            # Effetto lucciole
├── rendering/                  # Loop di rendering e animazione
│   └── renderLoop.js           # Loop principale di rendering
├── orchestrator/               # Orchestrazione principale
│   └── main.js                 # Funzione Animate principale (orchestra tutto)
├── threeJsAssets/              # Asset Three.js (OrbitControls, shaders, etc.)
│   ├── OrbitControls.js        # Controlli di navigazione
│   ├── EffectComposer.js       # Compositore per post-processing
│   ├── RenderPass.js           # Pass di rendering
│   ├── GLTFLoader.js           # Loader per modelli GLTF/GLB
│   └── shaders/                # Shader Three.js
└── shaders/                    # Shader GLSL personalizzati per gli effetti
    ├── firefliesVertexShader.glsl
    ├── firefliesFragmentShader.glsl
    └── ...
```

## Flusso di Esecuzione

1. **Entry Point** (`index.js`): Esporta `Animate` e `loadAssets`
2. **Caricamento Asset** (`loaders/assetLoader.js`): Carica texture, modelli 3D, etc.
3. **Inizializzazione** (`orchestrator/main.js`):
   - Crea scena, camera, renderer (tramite `scene/`)
   - Aggiunge oggetti 3D (tramite `particleObjects/`)
   - Aggiunge effetti (tramite `visualEffects/`)
   - Avvia il loop di animazione (tramite `rendering/`)
4. **Loop di Animazione** (`rendering/renderLoop.js`): 
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

- **Modularità**: Ogni file ha una responsabilità chiara (SRP)
- **Manutenibilità**: Più facile trovare e modificare codice specifico
- **Testabilità**: Ogni modulo può essere testato indipendentemente
- **Riusabilità**: I moduli possono essere riutilizzati in altri contesti
- **Leggibilità**: Nomi di file e cartelle descrivono chiaramente il loro contenuto
- **Clean Code**: Struttura organizzata e coerente

## Convenzioni di Naming

- **camelCase** per tutti i file JavaScript
- Nomi descrittivi che indicano chiaramente la responsabilità
- Cartelle organizzate per tipo di funzionalità:
  - `particleObjects/` - oggetti creati con particelle
  - `visualEffects/` - effetti visivi
  - `rendering/` - loop di rendering
  - `orchestrator/` - orchestrazione principale
  - `threeJsAssets/` - asset della libreria Three.js
  - `shaders/` - shader GLSL personalizzati

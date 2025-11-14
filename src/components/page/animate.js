/**
 * ============================================================================
 * IMPORTAZIONI
 * ============================================================================
 * Questo file gestisce tutta l'animazione 3D del sito usando Three.js
 */

// Libreria principale per la grafica 3D
import * as THREE from "three"

// Controlli per permettere all'utente di ruotare la scena con il mouse/touch
import { OrbitControls } from "./assets/OrbitControls.js"

// Pass di rendering per gli effetti post-processing
import { RenderPass } from "./assets/RenderPass.js"

// Effetto bloom (bagliore) - attualmente commentato
// import { UnrealBloomPass } from "./assets/UnrealBloomPass.js"

// Compositore per gestire gli effetti post-processing in sequenza
import { EffectComposer } from "./assets/EffectComposer.js"

// Loader per caricare modelli 3D in formato GLTF/GLB
import * as GLTFLoader from "./assets/GLTFLoader.js"

// Shader personalizzati per le particelle "fireflies" (lucciole)
// Gli shader sono programmi che girano sulla GPU per creare effetti grafici avanzati
import firefliesVertexShader from "./animations/firefliesVertexShader.glsl"
import firefliesVertexShaderETHLogo from "./animations/firefliesVertexShader_ETHLogo.glsl"
import firefliesFragmentShader from "./animations/firefliesFragmentShader.glsl"

/**
 * ============================================================================
 * FUNZIONI DI UTILITÀ
 * ============================================================================
 */

/**
 * Verifica se il browser supporta il formato WebP
 * WebP è un formato di immagine più efficiente di JPEG/PNG
 * @returns {boolean} true se WebP è supportato, false altrimenti
 */
function testWebP() {
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

/**
 * ============================================================================
 * VARIABILI GLOBALI PER IL CACHING
 * ============================================================================
 */

// Modello 3D principale caricato (il logo/oggetto centrale)
let mainObjectModel

// Texture a punti usata per le particelle
let dotTexture

// Cache di tutte le texture caricate (per evitare di ricaricarle)
const textures = {}

// Abilita la cache di Three.js per migliorare le performance
THREE.Cache.enabled = true

/**
 * ============================================================================
 * GESTIONE DELLE TEXTURE DI BACKGROUND
 * ============================================================================
 */

/**
 * Determina quale immagine di background caricare in base all'URL della pagina
 * e alla dimensione dello schermo
 * 
 * @param {string} url - L'URL della pagina corrente (es. "/", "/architecture", etc.)
 * @returns {string} - Il nome completo del file immagine da caricare
 */
const getTextureIdentifierByUrl = (url) => {
  // Seleziona la dimensione dell'immagine in base alla larghezza dello schermo:
  // - Small (< 500px): immagini più piccole per risparmiare banda
  // - Medium (500-1700px): dimensioni medie
  // - Large (> 1700px): immagini ad alta risoluzione per schermi grandi
  const backgroundImagePath = (() => {
    if (screen.width < 500) {
      return urlToTextureMap[url].small
    } else if (screen.width >= 500 && screen.width <= 1700) {
      return urlToTextureMap[url].medium
    } else {
      return urlToTextureMap[url].large
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
export const loadAndCacheTexture = async (url) => {
  // Ottieni il nome completo del file da caricare
  const fullIdentifier = getTextureIdentifierByUrl(url)

  // Controlla se la texture è già in cache
  const texture = textures[fullIdentifier]
  if (texture) return texture

  // Se non è in cache, caricala e poi salvala in cache
  return new Promise((resolve) => {
    backgroundLoader.load(`assets/${fullIdentifier}`, (texture) => {
      textures[fullIdentifier] = texture
      resolve()
    })
  })
}

/**
 * ============================================================================
 * MAPPA DELLE TEXTURE PER OGNI PAGINA
 * ============================================================================
 * 
 * Questa mappa definisce quale immagine di background usare per ogni pagina.
 * Ogni pagina ha 3 versioni della stessa immagine:
 * - small: per schermi piccoli (< 500px) - risoluzione 6000px
 * - medium: per schermi medi (500-1700px) - risoluzione 8000px  
 * - large: per schermi grandi (> 1700px) - risoluzione 12000px
 * 
 * Le immagini si trovano in /public/assets/
 */
export const urlToTextureMap = {
  "/": {
    small: "EF-website-landscape-landing-03-6000px",
    medium: "EF-website-landscape-landing-03-8000px",
    large: "EF-website-landscape-landing-03-12000px",
  },
  "/architecture": {
    small: "EF-website-landscape-philosophy-03-6000px",
    medium: "EF-website-landscape-philosophy-03-8000px",
    large: "EF-website-landscape-philosophy-03-12000px",
  },
  "/identity": {
    small: "EF-website-landscape-ef-03-6000px",
    medium: "EF-website-landscape-ef-03-8000px",
    large: "EF-website-landscape-ef-03-12000px",
  },
  "/ai-layer": {
    small: "EF-website-landscape-ethereum-03-6000px",
    medium: "EF-website-landscape-ethereum-03-8000px",
    large: "EF-website-landscape-ethereum-03-12000px",
  },
  "/why-exists": {
    small: "EF-website-landscape-infinite-garden-03-6000px",
    medium: "EF-website-landscape-infinite-garden-03-8000px",
    large: "EF-website-landscape-infinite-garden-03-12000px",
  },
  "/publishing": {
    small: "EF-website-landscape-infinite-garden-03-6000px",
    medium: "EF-website-landscape-infinite-garden-03-8000px",
    large: "EF-website-landscape-infinite-garden-03-12000px",
  },
  "/future": {
    small: "EF-website-landscape-infinite-garden-03-6000px",
    medium: "EF-website-landscape-infinite-garden-03-8000px",
    large: "EF-website-landscape-infinite-garden-03-12000px",
  },
  "/input-layer": {
    small: "EF-website-landscape-ourstory-01-6000px",
    medium: "EF-website-landscape-ourstory-01-8000px",
    large: "EF-website-landscape-ourstory-01-12000px",
  },
  "/output-layer": {
    small: "EF-website-landscape-infinite-garden-03-6000px",
    medium: "EF-website-landscape-infinite-garden-03-8000px",
    large: "EF-website-landscape-infinite-garden-03-12000px",
  },
  "/contact": {
    small: "EF-website-landscape-ef-03-6000px",
    medium: "EF-website-landscape-ef-03-8000px",
    large: "EF-website-landscape-ef-03-12000px",
  },
}

/**
 * ============================================================================
 * CARICAMENTO DI TUTTI GLI ASSETS
 * ============================================================================
 * 
 * Carica tutti gli asset necessari per la scena 3D:
 * 1. Texture di background (cambia in base alla pagina)
 * 2. Texture a punti per le particelle
 * 3. Modello 3D principale (logo/oggetto centrale)
 * 
 * @param {string} url - L'URL della pagina corrente
 * @returns {Promise} - Promise che si risolve quando tutti gli asset sono caricati
 */
export function loadAssets(url) {
  const assetLoaders = [
    // 1. Carica la texture di background per questa pagina
    loadAndCacheTexture(url),
    
    // 2. Carica la texture a punti (usata per le particelle)
    // Se è già caricata, usa quella in cache
    new Promise((resolve) => {
      if (dotTexture) {
        resolve()
      } else {
        dotLoader.load("assets/dotTexture.png", (texture) => {
          dotTexture = texture
          resolve()
        })
      }
    }),
    
    // 3. Carica il modello 3D principale (logo/oggetto centrale)
    // Se è già caricato, usa quello in cache
    new Promise((resolve) => {
      if (mainObjectModel) {
        resolve()
      } else {
        glbLoader.load("assets/ether.glb", function (object) {
          mainObjectModel = object
          resolve()
        })
      }
    }),
  ]

  // Attendi che tutti gli asset siano caricati prima di continuare
  return Promise.all(assetLoaders)
}

/**
 * ============================================================================
 * INIZIALIZZAZIONE DEI LOADER E RENDERER GLOBALI
 * ============================================================================
 * 
 * Questi oggetti sono globali per motivi di performance e caching.
 * Vengono creati una sola volta e riutilizzati per tutte le scene.
 */

// Verifica se siamo in un ambiente browser (non durante il server-side rendering)
const isClient = typeof window !== "undefined"

// Renderer WebGL: disegna la scena 3D sul canvas HTML
// - antialias: true = smoothing dei bordi per renderli più lisci
// - preserveDrawingBuffer: true = mantiene il buffer dopo il rendering
// - alpha: true = supporta la trasparenza
let renderer = isClient
  ? new THREE.WebGLRenderer({
      antialias: true,
      preserveDrawingBuffer: true,
      alpha: true,
    })
  : null

// Manager per gestire il caricamento di tutti gli asset
const loadingManager = isClient ? new THREE.LoadingManager() : null

// Loader per le texture di background
const backgroundLoader = isClient
  ? new THREE.TextureLoader(loadingManager)
  : null

// Loader per la texture a punti
const dotLoader = isClient ? new THREE.TextureLoader(loadingManager) : null

// Loader per i modelli 3D in formato GLTF/GLB
const glbLoader = isClient ? new GLTFLoader.GLTFLoader() : null

/**
 * ============================================================================
 * FUNZIONE PRINCIPALE: Animate
 * ============================================================================
 * 
 * Questa è la funzione principale che crea e gestisce tutta la scena 3D.
 * Viene chiamata ogni volta che l'utente naviga a una nuova pagina.
 * 
 * @param {string} url - L'URL della pagina corrente (es. "/", "/architecture")
 * @returns {Function} - Funzione di cleanup per rimuovere la scena quando necessario
 */
export const Animate = (url) => {
  /**
   * ========================================================================
   * CONTROLLI DELLA SCENA
   * ========================================================================
   */
  
  // Velocità di rotazione dell'oggetto principale
  const generalSceneControls = {
    ["ETH Rotation Speed"]: 0.00003,
  }

  /**
   * ========================================================================
   * VARIABILI PRINCIPALI DELLA SCENA
   * ========================================================================
   */
  
  // Scena 3D: contiene tutti gli oggetti 3D
  let scene
  
  // Camera: definisce il punto di vista sulla scena
  let camera
  
  // Compositore: gestisce gli effetti post-processing
  let composer
  
  // Pass per l'effetto bloom (bagliore) - attualmente non usato
  let bloomPass
  
  // Stats: mostra le performance (FPS) - attualmente disabilitato
  let stats
  
  // Colore RGB per le particelle [R, G, B] (valori 0-255)
  let color = [137, 188, 222]
  
  // Dimensioni della finestra del browser
  let innerWidth = window.innerWidth
  let innerHeight = window.innerHeight
  
  // Container HTML dove verrà inserito il canvas 3D
  let container = document.getElementById("canvas")
  
  // Controlli per permettere all'utente di ruotare la scena
  let controls

  /**
   * ========================================================================
   * VARIABILI PER LE PARTICELLE "FIREFLIES" (LUCIOLE)
   * ========================================================================
   */
  
  // Sistema di particelle che crea l'effetto "lucciole" nella scena
  let fireflies
  let firefliesGeometry  // Geometria delle particelle
  let firefliesMaterial  // Materiale delle particelle
  let firefliesActivated = false  // Se true, le lucciole sono attive
  let mouseIntensity = 0.01  // Intensità dell'effetto mouse (deve essere tra 0.01 e 0.03)

  // Mesh speciale per le lucciole del logo (non usata attualmente)
  let ethLogoFirefliesMesh

  /**
   * ========================================================================
   * VARIABILI PER ANIMAZIONI E EFFETTI
   * ========================================================================
   */
  
  // Clock per tracciare il tempo trascorso (usato per animazioni)
  let clock

  // Parametri per l'effetto bloom (bagliore) - attualmente non usato
  const bloomParams = {
    bloomStrength: 1,      // Forza del bagliore
    bloomThreshold: 0.98,  // Soglia oltre la quale applicare il bloom
    bloomRadius: 0.5,      // Raggio del bloom
  }

  // Materiale shader per le particelle finali (logo/oggetto principale)
  let finalPointsShaderMaterial
  
  // Sistema di particelle finale (l'oggetto principale della scena)
  let finalPoints

  /**
   * ========================================================================
   * VARIABILI PER L'OGGETTO 3D PRINCIPALE
   * ========================================================================
   */
  
  // Se true, l'oggetto ruota automaticamente
  let activateParticleRotation = true
  
  // Dimensione delle particelle dell'oggetto animato
  let animatedModelParticleSize
  
  // Materiale per le particelle dell'oggetto animato
  let animatedModelPointsMaterial

  /**
   * ========================================================================
   * VARIABILI PER ELEMENTI AGGIUNTIVI
   * ========================================================================
   */
  
  // Materiale per un piano/cilindro sulla homepage (attualmente non usato)
  let homePagePlanetMaterial
  let backgroundPlaneMesh
  let backgroundPlaneMeshDisplayed = true

  // Geometria "degenerata" (particelle sparse) - per animazioni future
  let degenerateGeometry
  let degenerateMesh

  // Se true, mostra le statistiche di performance (FPS)
  let statsAdded = false

  // Se true, mostra il background (skybox con le immagini panoramiche)
  let backgroundPaintingIsDisplayed = true
  
  // Helper per visualizzare la griglia (utile per debug)
  let gridHelper
  
  // Gruppo di oggetti 3D
  let group
  
  // Palette di colori per le particelle
  const palette = [new THREE.Color("#FFFFFF")]

  /**
   * ========================================================================
   * COSTANTI PER I MODELLI 3D
   * ========================================================================
   * 
   * Questi sono i file dei modelli 3D che possono essere caricati.
   * Ogni modello ha un numero diverso di vertici, quindi produce risultati visivi diversi.
   * Modelli con meno vertici dovrebbero avere particelle più grandi per essere meglio visibili.
   */

  // File del modello 3D principale in formato GLB (binario, più efficiente)
  const ETHER_GLB = "ether.glb"
  
  // File del modello 3D principale in formato OBJ (testo, meno efficiente)
  const ETHER_OBJ = "ether.obj"

  // Tipo di file attualmente in uso
  // NOTA: Se cambi il formato del modello, devi cambiare anche questo valore
  const FILE_TYPE = "obj"

  /**
   * ========================================================================
   * FUNZIONI PER CARICARE E RENDERIZZARE L'OGGETTO PRINCIPALE
   * ========================================================================
   */

  /**
   * Aggiunge l'oggetto principale alla scena
   * Sulla homepage carica un oggetto 3D completo, sulle altre pagine carica particelle sparse
   */
  function addMainObjectToScene() {
    // Se siamo sulla homepage, carica l'oggetto 3D completo
    if (isHomePage()) {
      return load3DModelObject()
    } else {
      // Altrimenti, carica particelle sparse (effetto "degenerato")
      return loadDegenerateParticleMesh()
    }
  }

  /**
   * Verifica se siamo sulla homepage
   * @returns {boolean} true se l'URL è "/"
   */
  function isHomePage() {
    return url === "/"
  }

  /**
   * Carica e renderizza l'oggetto 3D principale sulla homepage
   * Crea una sfera non colorata mantenendo la stessa densità di particelle del modello originale
   */
  function load3DModelObject() {
    const object = mainObjectModel

    /**
     * Dimensione delle particelle
     * Modifica questo valore per cambiare la dimensione delle particelle
     * Valori più piccoli = particelle più piccole e dettagliate
     * Valori più grandi = particelle più grandi e meno dettagliate
     */
    animatedModelParticleSize = 0.155
    
    // Estrae la mesh e la geometria dal modello caricato per ottenere il numero di particelle
    let mesh = object.scene.children[0]
    let originalGeometry = mesh.geometry
    const particleCount = originalGeometry.attributes.position.count
    
    // Calcola la distanza media tra le particelle nel modello originale
    // per mantenere la stessa densità nella sfera
    const positions = originalGeometry.attributes.position.array
    let totalDistance = 0
    let distanceCount = 0
    
    // Calcola distanze tra particelle vicine (campione)
    const sampleSize = Math.min(1000, particleCount)
    for (let i = 0; i < sampleSize; i++) {
      const idx1 = Math.floor(Math.random() * particleCount) * 3
      const idx2 = Math.floor(Math.random() * particleCount) * 3
      
      const dx = positions[idx1] - positions[idx2]
      const dy = positions[idx1 + 1] - positions[idx2 + 1]
      const dz = positions[idx1 + 2] - positions[idx2 + 2]
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)
      
      if (dist > 0) {
        totalDistance += dist
        distanceCount++
      }
    }
    
    const avgDistance = distanceCount > 0 ? totalDistance / distanceCount : 0.1
    
    // Calcola il raggio della sfera basato sulla densità
    // Area superficie sfera = 4πr², quindi r ≈ sqrt(particleCount * avgDistance² / (4π))
    const sphereRadius = Math.sqrt(particleCount * avgDistance * avgDistance / (4 * Math.PI)) * 0.5
    
    // Palette di colori basata sul logo HouseBlock (12 colori per il dodecagono)
    const colorPalette = [
      new THREE.Color(1.0, 0.0, 0.0),      // #FF0000 - Rosso
      new THREE.Color(1.0, 0.549, 0.0),    // #FF8C00 - Arancione
      new THREE.Color(1.0, 0.843, 0.0),    // #FFD700 - Giallo
      new THREE.Color(0.196, 0.804, 0.196), // #32CD32 - Verde chiaro
      new THREE.Color(0.0, 1.0, 0.498),    // #00FF7F - Verde
      new THREE.Color(0.0, 0.808, 0.820),  // #00CED1 - Turchese
      new THREE.Color(0.118, 0.565, 1.0),   // #1E90FF - Blu
      new THREE.Color(0.294, 0.0, 0.510),  // #4B0082 - Indaco
      new THREE.Color(0.545, 0.0, 1.0),    // #8B00FF - Viola
      new THREE.Color(1.0, 0.078, 0.576),  // #FF1493 - Rosa
      new THREE.Color(1.0, 0.0, 1.0),      // #FF00FF - Magenta
      new THREE.Color(0.863, 0.078, 0.235), // #DC143C - Rosso scuro
    ]
    
    // Genera posizioni per una sfera uniforme usando la spirale di Fibonacci
    // Questo mantiene una distribuzione uniforme simile alla densità originale
    const spherePositions = []
    const sphereColors = []
    const scaleArray = new Float32Array(particleCount)
    
    for (let i = 0; i < particleCount; i++) {
      // Spirale di Fibonacci per distribuzione uniforme sulla sfera
      const goldenAngle = Math.PI * (3 - Math.sqrt(5))  // Angolo aureo
      const y = 1 - (i / (particleCount - 1)) * 2  // y va da 1 a -1
      const radius = Math.sqrt(1 - y * y)  // Raggio del cerchio a questa altezza
      const theta = goldenAngle * i  // Angolo per la spirale
      
      const x = Math.cos(theta) * radius * sphereRadius
      const z = Math.sin(theta) * radius * sphereRadius
      const yPos = y * sphereRadius
      
      spherePositions.push(x, yPos, z)
      
      // Assegna un colore unico a ogni particella usando un hash basato sulla posizione
      // Questo garantisce che anche particelle vicine abbiano colori diversi
      // Usa una funzione hash semplice basata sulla posizione per avere colori deterministici ma vari
      const hash = Math.sin(x * 12.9898 + yPos * 78.233 + z * 37.719) * 43758.5453
      const normalizedHash = (hash - Math.floor(hash))  // Valore tra 0 e 1
      
      // Seleziona un colore dalla palette basato sull'hash
      const colorIndex = Math.floor(normalizedHash * 12) % 12
      const color = colorPalette[colorIndex]
      
      // Mescola con un colore adiacente per più varietà, usando una frazione dell'hash
      const blendAmount = (normalizedHash * 10) % 1  // Valore tra 0 e 1 per il blend
      const nextColorIndex = (colorIndex + 1) % 12
      const nextColor = colorPalette[nextColorIndex]
      
      const finalColor = new THREE.Color().lerpColors(color, nextColor, blendAmount)
      // Rendi i colori più opachi (meno saturati, più solidi)
      finalColor.multiplyScalar(0.7)  // Riduce la luminosità per effetto più opaco
      sphereColors.push(finalColor.r, finalColor.g, finalColor.b)
      
      // Scala uniforme
      scaleArray[i] = 0.01
    }

    // Crea la geometria della sfera
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(spherePositions, 3))
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(sphereColors, 3))
    geometry.setAttribute('aScale', new THREE.BufferAttribute(scaleArray, 1))
    
    // Crea il materiale per le particelle - con colori per vertice
    animatedModelPointsMaterial = new THREE.PointsMaterial({
      size: animatedModelParticleSize,
      transparent: true,
      opacity: 0.95,  // Più opaco (meno trasparente)
      vertexColors: true,  // IMPORTANTE: usa i colori per vertice
      map: dotTexture,
      blending: THREE.AdditiveBlending,
      depthWrite: true,
      depthTest: false,
      toneMapped: false,
    })

    /**
     * Crea un "morph target" (target di morphing)
     * Questo permette di animare le particelle da una forma all'altra
     * Quando l'utente scrolla, le particelle si espandono in una sfera più grande e sparsa
     */
    const morphPositions = []
    
    // Genera posizioni sparse in una sfera più grande per il morph target
    // Mantiene lo stesso numero di particelle ma con distanze maggiori
    for (let i = 0; i < particleCount; i++) {
      const distance = 50  // Distanza dal centro per l'espansione
      
      // Angoli casuali per posizionare le particelle in coordinate sferiche
      const theta = THREE.MathUtils.randFloatSpread(360) * (Math.PI / 180)  // Angolo polare
      const phi = THREE.MathUtils.randFloatSpread(360) * (Math.PI / 180)     // Angolo azimutale
      
      // Distanza casuale per effetto di espansione
      const randomDistance = Math.random() * 150 * distance
      
      // Converti coordinate sferiche in coordinate cartesiane (x, y, z)
      morphPositions.push(
        randomDistance * Math.sin(theta) * Math.cos(phi),  // X
        randomDistance * Math.sin(theta) * Math.sin(phi),  // Y
        randomDistance * Math.cos(theta)                   // Z
      )
    }

    // Aggiunge il morph target alla geometria
    // Questo permetterà di animare le particelle dalla sfera compatta alla sfera espansa
    geometry.morphAttributes.position = []
    geometry.morphAttributes.position[0] = new THREE.Float32BufferAttribute(
      morphPositions,
      3  // 3 componenti per ogni posizione (x, y, z)
    )

    // Crea il sistema di particelle finale
    let points = new THREE.Points(geometry, animatedModelPointsMaterial)
    
    // Scala l'oggetto - ridotta per occupare max 1/4 della pagina
    points.scale.x = points.scale.y = points.scale.z = 1.2
    
    // Posiziona l'oggetto nella scena
    points.position.x = 0
    points.position.y = 0.5
    points.position.z = 0
    
    // Ruota l'oggetto leggermente per una migliore visualizzazione
    points.rotation.x = Math.PI * 0.1
    points.rotation.y = Math.PI * 0.05
    
    // Salva l'oggetto nella variabile globale
    finalPoints = points

    // Aggiunge l'oggetto alla scena
    scene.add(points)
  }

  /**
   * Carica un mesh "degenerato" (particelle sparse)
   * Usato sulle pagine diverse dalla homepage
   * Le particelle sono distribuite casualmente in una sfera
   * 
   * NOTA: Una versione precedente creava particelle in forma cubica,
   * ma non era bella quando le particelle si espandevano, quindi è stata cambiata in sferica
   */
  function loadDegenerateParticleMesh() {
    const object = mainObjectModel

    // Dimensione delle particelle (più grande rispetto alla homepage)
    animatedModelParticleSize = 0.9
    animatedModelPointsMaterial = new THREE.PointsMaterial({
      color: new THREE.Color(10, 10, 10),
      size: animatedModelParticleSize,
      transparent: true,
      map: dotTexture, // new THREE.TextureLoader().load("assets/dotTexture.png"),
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false,
    })

    const mesh = object.scene.children[0]
    const geometry = mesh.geometry
    const positionAttribute = geometry.attributes.position
    let count = 48000
    let newPositions = []
    let scaleArray = new Float32Array(count)

    for (let i = 0; i < positionAttribute.count; i++) {
      // #distance: Modifies how far the particles are rendered from the center
      // and therefore how close they are to camera
      let distance = 4
      let theta = THREE.MathUtils.randFloatSpread(360)
      let phi = THREE.MathUtils.randFloatSpread(360)

      newPositions.push(
        // Spherical Rendering Algorithm
        Math.ceil(Math.random() * 50 * distance) *
          Math.sin(theta) *
          Math.cos(phi), // Sets particles within the sphere
        Math.ceil(Math.random() * 50 * distance) *
          Math.sin(theta) *
          Math.sin(phi), // Sets particles within the sphere
        Math.ceil(Math.random() * 50 * distance) * Math.cos(theta) // Sets particles within the sphere
      )

      // Comment: This does not affect the actual size of the particles
      scaleArray[i] = Math.random() * 100
    }

    // We simply 1. distribute points in space
    // 2. We set the scale,
    // 3. We create the object
    let bufferGeometry = new THREE.BufferGeometry()
    bufferGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(newPositions, 3)
    )
    let finalPointsGeometry = new THREE.BufferGeometry().setFromPoints(
      newPositions
    )

    finalPointsGeometry.setAttribute(
      "aScale",
      new THREE.BufferAttribute(scaleArray, 3)
    )

    bufferGeometry.setAttribute(
      "aScale",
      new THREE.BufferAttribute(scaleArray, 3)
    )

    let points = new THREE.Points(bufferGeometry, animatedModelPointsMaterial)
    points.scale.x = points.scale.y = points.scale.z = 2
    finalPoints = points
    points.rotation.x = Math.PI / 2
    scene.add(points)
  }

  /**
   * Function left here for future optimizations in case we want to create more complex
   * animation sequences between particles
   */
  function createDegenerateParticles() {
    const geometry = createPointMeshForBlockchainMiningAnimation()
    const meshSurfaceSamplerPointSize = 0.1

    const pointsMaterial = new THREE.PointsMaterial({
      size: meshSurfaceSamplerPointSize,
      alphaTest: 0.2,
      map: dotTexture, // new THREE.TextureLoader().load("assets/dotTexture.png"),
      vertexColors: true,
      color: 0xffffff,
    })

    degenerateMesh = new THREE.Points(geometry, pointsMaterial)
    degenerateMesh.name = "DegenerateParticles"
    degenerateMesh.position.x = 0
    degenerateMesh.position.y = 0
    degenerateMesh.position.z = 0

    scene.add(degenerateMesh)
  }

  // Helper function for @createDegenerateParticles
  function createPointMeshForBlockchainMiningAnimation() {
    // Create initial mesh which will hold all the particles outside the mesh
    let particleCount = 100
    let newPositions = []
    let colors = []
    let scales = []

    for (let i = 0; i < particleCount; i++) {
      const v = new THREE.Vector3(
        THREE.MathUtils.randFloat(-10, 10),
        THREE.MathUtils.randFloat(-10, 10),
        THREE.MathUtils.randFloat(-10, 10)
      )

      newPositions.push(v)

      // Add color for particle
      const color = palette[Math.floor(Math.random() * palette.length)]
      colors.push(color.r, color.g, color.b)

      // Add scale array
      let randomScale = 0.001
      scales.push(randomScale)
    }

    // After we've set the positions, we most likely want to create an actual buffer geometry with these attributes
    degenerateGeometry = new THREE.BufferGeometry().setFromPoints(newPositions)
    degenerateGeometry.setAttribute(
      "color",
      new THREE.Float32BufferAttribute(colors, 3)
    )
    degenerateGeometry.setAttribute(
      "aScale",
      new THREE.Float32BufferAttribute(scales, 1)
    )
    degenerateGeometry.morphAttributes.position = []
    degenerateGeometry.morphAttributes.position[0] =
      new THREE.Float32BufferAttribute(newPositions, 3)

    return degenerateGeometry
  }

  // Helper function for @createDegenerateParticles - the "end state" here refers to the illusory mesh that we will create
  // in order to give the impression that particles are "expanding", which will be the transition between the different potential
  // animations we might be implementing.
  function createDegenerateParticleSystemInEndState() {
    let particleCount = 100
    let newPositions = []
    let colors = []
    let scales = []

    for (let i = 0; i < particleCount; i++) {
      const v = new THREE.Vector3(0, 0, 0)
      newPositions.push(v)

      // Add color for particle
      const color = palette[Math.floor(Math.random() * palette.length)]
      colors.push(color.r, color.g, color.b)

      // Add scale array
      let randomScale = 0.001
      scales.push(randomScale)
    }

    const bufferGeometry = new THREE.BufferGeometry().setFromPoints(
      newPositions
    )
    bufferGeometry.setAttribute(
      "color",
      new THREE.Float32BufferAttribute(colors, 3)
    )
    bufferGeometry.setAttribute(
      "aScale",
      new THREE.Float32BufferAttribute(scales, 1)
    )
    return newPositions
  }

  /**
   * Helper function created in order to generate a degenerate particle morph target for any object that we pass
   * We use because if we want to morph a particle system from an initial state (geometry argument) to another state
   * or to an "explosion" state, the target state needs to have the same amount of particles as the passed geometry.
   * This function ensures that we render a particle system with the exact same amount of vertices (and particles)
   * as the geometry that we have passed
   */
  function createParticleMorphTargetForGeometry(geometry) {
    // New Positions
    let newPositions = []
    let distance = 50
    const positionAttribute = geometry.attributes?.position

    for (let i = 0; i < positionAttribute?.length; i++) {
      newPositions.push(
        Math.ceil(Math.random() * distance * 20) *
          (Math.round(Math.random()) ? 1 : -1),
        Math.ceil(Math.random() * distance * 30) *
          (Math.round(Math.random()) ? 1 : -1),
        Math.ceil(Math.random() * distance * 50) *
          (Math.round(Math.random()) ? 1 : -1)
      )
    }

    // Test II: we create our own sphere filled with actual particles
    geometry.morphAttributes.position = []
    geometry.morphAttributes.position[0] = new THREE.Float32BufferAttribute(
      newPositions,
      3
    )
  }

  /** Light **/
  function setLightInScene() {
    let sun = new THREE.DirectionalLight(0xffffff, 1.7)
    sun.position.set(4, 4, 4)
    scene.add(sun)
  }

  /**
   * ========================================================================
   * CREAZIONE DEL BACKGROUND (SKYBOX)
   * ========================================================================
   */

  /**
   * Crea uno skybox equirettangolare (sfondo panoramico)
   * Questo è il background che vedi quando guardi intorno nella scena 3D
   * Le immagini panoramiche vengono proiettate su una sfera gigante
   */
  function createEquirectangularBackground() {
    // Crea una geometria sferica molto grande (raggio 500 unità)
    // 60 = segmenti orizzontali, 40 = segmenti verticali (più segmenti = più dettaglio)
    const geometry = new THREE.SphereGeometry(500, 60, 40)
    
    // Scala negativa sull'asse X per invertire la sfera (così vediamo l'interno, non l'esterno)
    geometry.scale(-1, 1, 1)

    // Crea il materiale con la texture di background per questa pagina
    const material = new THREE.MeshBasicMaterial({
      map: textures[getTextureIdentifierByUrl(url)],  // Usa la texture caricata per questa pagina
      toneMapped: false,  // Non applica tone mapping (mantiene i colori originali)
    })

    // Crea la mesh (l'oggetto 3D) con la geometria e il materiale
    const mesh = new THREE.Mesh(geometry, material)

    // Ruota lo skybox per orientarlo correttamente
    mesh.rotation.y = -Math.PI / 2
    
    // Rotazioni speciali per alcune pagine (per allineare meglio le immagini)
    if (url.indexOf("ethereum") !== -1) {
      mesh.rotation.y = -Math.PI / 1.55
    }
    if (url.indexOf("ourstory") !== -1) {
      mesh.rotation.y = -Math.PI / 0.8
    }

    // Aggiunge lo skybox alla scena
    scene.add(mesh)
  }

  /**
   * ========================================================================
   * CREAZIONE DELLE "FIREFLIES" (LUCIOLE)
   * ========================================================================
   */

  /**
   * Crea e renderizza le particelle "fireflies" (lucciole) nella scena
   * Usa shader personalizzati (fragment e vertex) per effetti avanzati
   * Le lucciole sono particelle luminose che fluttuano nella scena
   */
  function addFireflies() {
    // Crea una nuova geometria per le lucciole
    firefliesGeometry = new THREE.BufferGeometry()
    
    // Numero di lucciole da creare
    const firefliesCount = 1000
    
    // Array per le posizioni (ogni lucciola ha 3 coordinate: x, y, z)
    const positionArray = new Float32Array(firefliesCount * 3)
    
    // Array per le scale (dimensione) di ogni lucciola
    const scaleArray = new Float32Array(firefliesCount)

    // Genera posizioni casuali per ogni lucciola
    for (let i = 0; i < firefliesCount; i++) {
      // Crea una posizione casuale:
      // - X: tra -5 e 5
      // - Y: tra 0 e 3
      // - Z: tra -250 e 250 (spread più ampio sull'asse Z per profondità)
      new THREE.Vector3(
        (Math.random() - 0.5) * 10,      // X
        Math.random() * 1.5 * 2,         // Y
        (Math.random() - 0.5) * 500       // Z (spread più ampio)
      ).toArray(positionArray, i * 3)     // Salva la posizione nell'array
      
      // Imposta la scala iniziale di ogni lucciola
      scaleArray[i] = 5
    }

    // Aggiunge gli attributi alla geometria
    firefliesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positionArray, 3)  // 3 componenti per posizione (x, y, z)
    )

    firefliesGeometry.setAttribute(
      "aScale",
      new THREE.BufferAttribute(scaleArray, 1)  // 1 componente per scala
    )

    // Crea il materiale shader per le lucciole
    firefliesMaterial = new THREE.ShaderMaterial({
      vertexShader: firefliesVertexShader,    // Shader per i vertici
      fragmentShader: firefliesFragmentShader, // Shader per i pixel
      transparent: true,
      uniforms: {
        // Tempo per animazioni
        uTime: { value: 0 },
        
        // Pixel ratio per schermi retina
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
        
        // Dimensione base delle lucciole
        uSize: { value: 100 },
        
        // Colore delle lucciole
        color: {
          type: "v3",
          value: new THREE.Vector3(...rgbToPercentage(color)),
        },
        
        // Intensità dell'effetto mouse
        mouseIntensity: {
          type: "f",
          value: mouseIntensity,
        },
      },
      blending: THREE.AdditiveBlending,  // Blending additivo (le lucciole si sommano)
      depthWrite: false,                  // Non scrive nella depth buffer
    })

    // Crea il sistema di particelle finale
    fireflies = new THREE.Points(firefliesGeometry, firefliesMaterial)
    
    // Posiziona le lucciole al centro della scena
    fireflies.position.x = 0
    fireflies.position.y = 0
    fireflies.position.z = 0
    
    // Aggiunge le lucciole alla scena
    scene.add(fireflies)
    
    // Segna che le lucciole sono attive
    firefliesActivated = true
  }

  /**
   * Creates a semi-opaque cylinder placed between the ETH object and the background, which is in turn
   * modified in the @render function in order to give the illusion that the opacity of the whole
   * scene is changin
   */
  function createHomePageCylinder() {
    homePagePlanetMaterial = new THREE.MeshBasicMaterial({
      color: "#00000F",
      transparent: true,
      opacity: 0.1,
      depthWrite: false,
    })

    const geometry = new THREE.CylinderGeometry(15, 15, 20, 100)
    geometry.name = "HomePage_TextPlane"

    backgroundPlaneMesh = new THREE.Mesh(geometry, homePagePlanetMaterial)
    backgroundPlaneMesh.scale.x =
      backgroundPlaneMesh.scale.y =
      backgroundPlaneMesh.scale.z =
        1
    backgroundPlaneMesh.position.x = 0
    backgroundPlaneMesh.position.y = 0
    backgroundPlaneMesh.position.z = 0

    scene.add(backgroundPlaneMesh)
  }

  /** Scene Helpers **/

  // function addGridHelper() {
  //     const size = 100;
  //     const divisions = 100;
  //     gridHelper = new THREE.GridHelper(size, divisions);
  //     scene.add(gridHelper);
  //     gridHelperDisplayed = true;
  // }

  // function addAxesHelper() {
  //     const axesHelper = new THREE.AxesHelper(100);
  //     scene.add(axesHelper);
  // }

  /**
   * ========================================================================
   * FUNZIONE PRINCIPALE DI INIZIALIZZAZIONE
   * ========================================================================
   */

  /**
   * Inizializza e avvia tutta la scena 3D
   * Questa funzione viene chiamata quando la pagina è pronta
   * 
   * @returns {Function} - Funzione di cleanup per rimuovere la scena
   */
  function begin() {
    // 1. Inizializza la scena 3D
    initScene()
    
    // 2. Crea e posiziona la camera
    initCamera()
    
    // 3. Inizializza il renderer e ottieni la funzione di cleanup
    const disposeRendererElement = initRenderer()
    
    // 4. Inizializza gli effetti post-processing
    initPostProcessingEffects()
    
    // 5. Inizializza i controlli (rotazione con mouse/touch)
    initControls()
    
    // 6. Aggiunge la luce alla scena
    setLightInScene()
    
    // 7. Rileva il supporto WebP e aggiunge classi CSS
    renderWebPImages()
    
    // 8. Aggiunge l'oggetto principale (logo/particelle)
    addMainObjectToScene()

    // 9. Se il background è abilitato, crea lo skybox
    if (backgroundPaintingIsDisplayed) {
      createEquirectangularBackground()
    }

    // Helpers per debug (attualmente disabilitati)
    // addGridHelper();  // Mostra una griglia
    // addAxesHelper();  // Mostra gli assi X, Y, Z

    // 10. Se le statistiche sono abilitate, aggiungile
    if (statsAdded) {
      addStatsElement()
    }

    // 11. Se le lucciole sono abilitate, aggiungile
    // NOTA: Se attivate, devi anche abilitare il codice elapsedTime nella funzione render()
    if (firefliesActivated) {
      addFireflies()
    }

    // Implementazioni future (attualmente commentate):
    // - Particelle degenerate come base per morphing tra forme diverse
    // - Cilindro sulla homepage per effetti di opacità

    // 12. Avvia il loop di animazione
    animate()

    // Ritorna una funzione di cleanup che rimuove tutto quando necessario
    return () => {
      disposeRendererElement()  // Rimuove il renderer
      controls.dispose()        // Rimuove i controlli
    }
  }

  /**
   * ========================================================================
   * FUNZIONI DI INIZIALIZZAZIONE
   * ========================================================================
   */

  /**
   * Inizializza la camera (punto di vista sulla scena)
   */
  function initCamera() {
    // Crea una camera prospettica:
    // - 50 = campo visivo in gradi (FOV)
    // - innerWidth / innerHeight = aspect ratio (rapporto larghezza/altezza)
    // - 0.5 = distanza minima di rendering (near plane)
    // - 1000 = distanza massima di rendering (far plane)
    camera = new THREE.PerspectiveCamera(
      50,
      innerWidth / innerHeight,
      0.5,
      1000
    )
    
    // Posiziona la camera (x, y, z)
    camera.position.set(0, 2, 16)
    
    // Fai guardare la camera verso il centro della scena
    camera.lookAt(0, 0, 0)
    
    // Aggiunge la camera alla scena
    scene.add(camera)
  }

  /**
   * Inizializza la scena 3D
   */
  function initScene() {
    // Crea una nuova scena
    scene = new THREE.Scene()
    
    // Imposta il colore di background (nero scuro)
    scene.background = new THREE.Color(0x111111)
  }

  /**
   * Inizializza il renderer (disegna la scena sul canvas)
   * @returns {Function} - Funzione per rimuovere il renderer
   */
  function initRenderer() {
    // Imposta le dimensioni del renderer
    renderer.setSize(innerWidth, innerHeight)
    
    // Imposta il pixel ratio (per schermi retina)
    renderer.setPixelRatio(window.devicePixelRatio)
    
    // Imposta il colore di clear (bianco)
    renderer.setClearColor(0xffffff)

    // Pulisce i buffer di rendering (colore, profondità, stencil)
    // Questo inizializza il color buffer con il colore di clear
    renderer.clear()
    
    // Aggiunge il canvas del renderer al container HTML
    container.appendChild(renderer.domElement)
    
    // Disabilita gli eventi del mouse sul canvas (così non interferisce con la pagina)
    renderer.domElement.style["pointer-events"] = "none"

    // Ritorna una funzione per rimuovere il canvas quando necessario
    return () => {
      container.removeChild(renderer.domElement)
    }
  }

  function renderWebPImages() {
    let mainMenuContainer = document.getElementById(
      "main--menu--internal--container"
    )

    if (testWebP()) {
      mainMenuContainer.classList.add("webp--supported")
    } else {
      mainMenuContainer.classList.add("webp--not--supported")
    }
  }

  /**
   * Inizializza i controlli per permettere all'utente di guardare intorno nella scena
   */
  function initControls() {
    // Crea i controlli orbit (permettono di ruotare la scena con mouse/touch)
    controls = new OrbitControls(camera, document.body)
    
    // Permette di usare i tasti per controllare la camera
    controls.listenToKeyEvents(window)

    // Su dispositivi mobili, abilita il damping (inerzia)
    // Questo dà un senso di "peso" ai movimenti della camera
    if (isMobileDevice()) {
      controls.enableDamping = true
      controls.dampingFactor = 0.05  // Valore più basso = movimento più lento
    }

    // Disabilita lo zoom (non vogliamo che l'utente possa zoomare)
    controls.enableZoom = false
    
    // Disabilita il pan (spostamento laterale)
    controls.enablePan = false
    
    // Disabilita il pan nello spazio schermo
    controls.screenSpacePanning = false
    
    // Distanza minima e massima dalla camera (limita lo zoom)
    controls.minDistance = 10
    controls.maxDistance = 100
    
    // Limita l'angolo polare (impedisce di guardare sopra/sotto troppo)
    controls.maxPolarAngle = Math.PI * 0.5  // 90 gradi
    controls.minPolarAngle = Math.PI * 0.5  // 90 gradi (camera orizzontale)
    
    // Abilita la rotazione automatica
    controls.autoRotate = true
    
    // Velocità di rotazione automatica (più veloce su mobile)
    if (screen.width >= 500) {
      controls.autoRotateSpeed = 0.06
    } else {
      controls.autoRotateSpeed = 0.12
    }
    
    // Aggiorna i controlli
    controls.update()
  }

  /**
   * Inizializza gli effetti post-processing
   * Gli effetti post-processing vengono applicati dopo che la scena è stata renderizzata
   */
  function initPostProcessingEffects() {
    // EffectComposer gestisce una catena di effetti post-processing
    // Gli effetti vengono eseguiti in ordine di aggiunta
    // NOTA: Cambiare l'ordine degli effetti produce risultati visivi diversi
    
    composer = new EffectComposer(renderer)
    
    // Aggiunge il pass di rendering base (renderizza la scena)
    composer.addPass(new RenderPass(scene, camera))
    
    // Effetto bloom (bagliore) - attualmente commentato
    // bloomPass = new UnrealBloomPass(
    //   new THREE.Vector2(window.innerWidth / 2.0, window.innerHeight / 2.0),
    //   bloomParams.bloomStrength,
    //   bloomParams.bloomRadius,
    //   bloomParams.bloomThreshold
    // );
    // composer.addPass(bloomPass);
  }

  function addStatsElement() {
    stats = new Stats()
    stats.domElement.style.position = "absolute"
    stats.domElement.style.left = "0px"
    stats.domElement.style.top = "0px"
    document.body.appendChild(stats.domElement)
  }

  /** Helper Functions **/
  // Used to create go dray firefly particles in previous iteration
  function rgbToPercentage(arr) {
    return arr.map((value) => value / 255)
  }

  /**
   * ========================================================================
   * LOOP DI ANIMAZIONE
   * ========================================================================
   */

  /**
   * Loop principale di animazione
   * Viene chiamato continuamente (circa 60 volte al secondo) per aggiornare la scena
   */
  function animate() {
    // Se le statistiche sono abilitate, aggiornale
    if (statsAdded) {
      stats.update()
    }
    
    // Renderizza un frame
    render()
  }

  /**
   * Variabili per l'effetto di scroll automatico
   * Dichiarate qui per evitare di ricrearle 60 volte al secondo (ottimizzazione)
   */
  let deltaY  // Delta Y per l'animazione di espansione/contrazione

  // Punto di stop per l'espansione delle particelle
  const finalStopPoint = 0.002
  
  let meshOpacityAnimationEnded  // Flag per sapere se l'animazione è finita
  let homePage = isHomePage()     // Se siamo sulla homepage

  /**
   * Renderizza un singolo frame della scena
   * Questa funzione viene chiamata 60 volte al secondo
   */
  function render() {
    // Rotazione dell'oggetto principale (se esiste e la rotazione è abilitata)
    if (finalPoints !== undefined && activateParticleRotation !== false) {
      // Ruota l'oggetto sull'asse Z (sia per GLB che OBJ)
      if (FILE_TYPE === "glb") {
        finalPoints.rotation.z += generalSceneControls["ETH Rotation Speed"]
      } else if (FILE_TYPE === "obj") {
        finalPoints.rotation.z += generalSceneControls["ETH Rotation Speed"]
      }
      
      // Aggiorna i controlli (necessario per il damping su mobile)
      controls.update()
    }

    // Geometry with Surface Sampler
    if (group !== undefined) {
      group.rotation.y += generalSceneControls["ETH Rotation Speed"]
    }

    // Geometry with Internal Sampler
    if (ethLogoFirefliesMesh !== undefined) {
      ethLogoFirefliesMesh.rotation.y +=
        generalSceneControls["ETH Rotation Speed"]
    }

    /**
     * ====================================================================
     * ANIMAZIONE BASATA SULLO SCROLL
     * ====================================================================
     * 
     * Quando l'utente scrolla, le particelle si espandono o si contraggono
     */
    
    // Verifica se il contenuto è stato scrollato (classe CSS aggiunta da React)
    const contentVisible = document.body.classList.contains("content-scrolled")

    if (contentVisible) {
      // Se il contenuto è visibile (utente ha scrollato):
      
      // Codice commentato per l'opacità del cilindro (non usato)
      // if (backgroundPlaneMesh.material.opacity < 0.7) {
      //   backgroundPlaneMesh.material.opacity += 0.004
      // } else {
      //   meshOpacityAnimationEnded = true
      // }

      // Se siamo sulla homepage, espandi le particelle
      if (homePage) {
        let morphValue = finalPoints.morphTargetInfluences[0]

        // Velocità di espansione
          deltaY = 0.0000024

        // Se non abbiamo raggiunto il punto di stop, continua ad espandere
        if (morphValue <= finalStopPoint) {
          finalPoints.morphTargetInfluences[0] += deltaY
        }
      }
    } else {
      // Se il contenuto non è visibile (utente non ha scrollato o è tornato su):
      
      // Codice commentato per l'opacità del cilindro (non usato)
      // if (backgroundPlaneMesh.material.opacity >= 0.1) {
      //     backgroundPlaneMesh.material.opacity -= 0.004;
      // }
      // if (backgroundPlaneMesh.material.opacity <= 0.1) {
      //     backgroundPlaneMesh.material.opacity = 0.1;
      // };

      // Se siamo sulla homepage, contrai le particelle (torna alla forma originale)
      if (homePage) {
        const currentMorphTargetInfluence = finalPoints.morphTargetInfluences[0]

        // Velocità di contrazione (negativa perché stiamo tornando indietro)
        if (currentMorphTargetInfluence > 0.001) {
          deltaY = -0.000005
        } else {
          deltaY = -0.00001
        }

        let morphTarget = finalPoints.morphTargetInfluences[0]
        let finalValue = morphTarget - deltaY
        const finalStopPoint = 0  // Punto di stop = forma originale

        // Se non siamo ancora tornati alla forma originale, continua a contrarre
        if (finalValue >= finalStopPoint) {
          finalPoints.morphTargetInfluences[0] += deltaY

          // Assicurati che il valore non vada mai sotto 0
          if (finalPoints.morphTargetInfluences[0] <= 0) {
            finalValue = 0
            finalPoints.morphTargetInfluences[0] = 0
          }
        }

        // Controllo di sicurezza: se il valore è negativo, resettalo a 0
        if (finalPoints.morphTargetInfluences[0] < 0) {
          finalValue = 0
          finalPoints.morphTargetInfluences[0] = 0
        }
      }
    }

    /**
     * ====================================================================
     * AGGIORNAMENTO DELLE LUCIOLE
     * ====================================================================
     */
    
    // Aggiorna il tempo trascorso (usato per animare le lucciole)
    // Il tempo viene usato per creare un movimento tipo "browniano" (casuale)
    if (clock) {
      elapsedTime = clock.getElapsedTime()
    }

    // Se le lucciole sono attive, passa il tempo agli shader
    // Questo permette alle lucciole di animarsi nel tempo
    if (firefliesActivated) {
      if (finalPointsShaderMaterial) {
        finalPointsShaderMaterial.uniforms.uTime.value = elapsedTime
      }
    }

    /**
     * ====================================================================
     * RENDERING FINALE
     * ====================================================================
     */
    
    // Richiedi il prossimo frame di animazione
    // Questo crea il loop continuo (60 FPS)
    window.requestAnimationFrame(animate)
    
    // Renderizza la scena con tutti gli effetti post-processing
    composer.render()

    return
  }

  /**
   * ========================================================================
   * FUNZIONI DI UTILITÀ
   * ========================================================================
   */

  /**
   * Verifica se il dispositivo è mobile
   * @returns {boolean} true se è un dispositivo mobile
   */
  function isMobileDevice() {
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
   * Ridimensiona la scena quando l'utente ridimensiona la finestra
   */
  function resize() {
    // Aggiorna le dimensioni della finestra
    innerWidth = window.innerWidth
    innerHeight = window.innerHeight
    
    // Aggiorna l'aspect ratio della camera
    camera.aspect = innerWidth / innerHeight
    camera.updateProjectionMatrix()

    // Aggiorna le dimensioni del compositore e del renderer
    composer.setSize(innerWidth, innerHeight)
    renderer.setSize(innerWidth, innerHeight)
  }

  /**
   * Aggiunge tutti gli event listener necessari alla pagina
   * @returns {Function} - Funzione per rimuovere gli event listener
   */
  function addEventListeners() {
    // Listener per il ridimensionamento della finestra
    window.addEventListener("resize", resize, false)
    
    // Listener per aggiornare l'altezza del documento (utile per mobile)
    // TODO: Questo potrebbe essere fatto lato React
    window.addEventListener("resize", setDocumentHeight)

    // Ritorna una funzione per rimuovere gli event listener
    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("resize", setDocumentHeight)
    }
  }

  /**
   * Modifica gli elementi in base al dispositivo (mobile/desktop)
   * Attualmente solo imposta l'altezza del documento
   */
  function modifyElementsAccordingToDevice() {
    setDocumentHeight()
  }

  /**
   * Imposta l'altezza del documento come variabile CSS
   * Utile per gestire correttamente l'altezza su mobile
   * TODO: Questo potrebbe essere fatto lato React
   */
  function setDocumentHeight() {
    const doc = document.body
    doc.style.setProperty("--doc-height", `${window.innerHeight}px`)
  }

  /**
   * ========================================================================
   * AVVIO DELL'ANIMAZIONE
   * ========================================================================
   */
  
  // Avvia l'inizializzazione e ottiene la funzione di cleanup
  const cleanUpAfterThreejs = begin()
  
  // Aggiunge gli event listener e ottiene la funzione di cleanup
  const clearAllListeners = addEventListeners()
  
  // Modifica gli elementi in base al dispositivo
  modifyElementsAccordingToDevice()

  /**
   * Funzione di cleanup per prevenire memory leak
   * Rimuove l'animazione dal DOM quando non è più necessaria
   * Questa funzione viene chiamata quando il componente React viene smontato
   */
  return () => {
    clearAllListeners()      // Rimuove gli event listener
    cleanUpAfterThreejs()    // Rimuove la scena 3D
  }
}

// Esporta la funzione principale
export default Animate

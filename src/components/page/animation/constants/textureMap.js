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
  "/publishing": {
    small: "EF-website-landscape-ourstory-01-6000px",
    medium: "EF-website-landscape-ourstory-01-8000px",
    large: "EF-website-landscape-ourstory-01-12000px",
  },
  "/future": {
    small: "EF-website-landscape-philosophy-03-6000px",
    medium: "EF-website-landscape-philosophy-03-8000px",
    large: "EF-website-landscape-philosophy-03-12000px",
  },
  "/contact": {
    small: "EF-website-landscape-ethereum-03-6000px",
    medium: "EF-website-landscape-ethereum-03-8000px",
    large: "EF-website-landscape-ethereum-03-12000px",
  },
}


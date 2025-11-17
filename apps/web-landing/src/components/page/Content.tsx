"use client"
import React from "react"
import css from "./Content.module.scss"
import {
  ScrollDirection,
  useScrollDirectionContext,
} from "../../utils/useScrollDirection"
import { usePathname } from "next/navigation"
import animate, { loadAssets } from "./animation"
import { useAnimationContext } from "./animation-context"

export const pageContentID = "page-content"

type ContentBlockProps = {
  isHomePage?: boolean
  scrollDirection?: ScrollDirection
  children?: React.ReactNode
}

const ContentBlock = (props: ContentBlockProps) => {
  const [assetsLoaded, setAssetsLoaded] = React.useState(false)
  const animationRan = React.useRef(false)
  const cleanupRef = React.useRef<(() => void) | null>(null)
  const scrollDirection = useScrollDirectionContext()
  const { setAnimationIsLoading } = useAnimationContext()
  const pathname = usePathname()
  
  // Normalizza il pathname rimuovendo hash e query string per il confronto
  const normalizedPathname = React.useMemo(() => {
    return pathname.split('#')[0].split('?')[0]
  }, [pathname])

  React.useEffect(() => {
    // Reset quando cambia il pathname (senza hash)
    setAssetsLoaded(false)
    animationRan.current = false
    
    // Pulisci l'animazione precedente se esiste
    if (cleanupRef.current) {
      cleanupRef.current()
      cleanupRef.current = null
    }
    
    setAnimationIsLoading(true)

    // Load animation assets (usa il pathname normalizzato)
    loadAssets(normalizedPathname).then(() => {
      setAssetsLoaded(true)
      setAnimationIsLoading(false)
    })
  }, [normalizedPathname, setAnimationIsLoading])

  React.useEffect(() => {
    if (assetsLoaded && !animationRan.current) {
      // React strict mode will call this twice in succession in dev mode (to test for side effects), this prevents executing animations twice in that scenario
      animationRan.current = true
      const cleanup = animate(normalizedPathname)
      cleanupRef.current = cleanup as (() => void) | null
      
      return () => {
        if (cleanup) {
          cleanup()
        }
        cleanupRef.current = null
      }
    }
  }, [assetsLoaded, normalizedPathname])

  return (
    <>
      <div id="transition-container" className={assetsLoaded ? "removed" : ""}>
        <div className="loader-wrapper"></div>
      </div>

      <main
        id={
          scrollDirection === ScrollDirection.UP
            ? "page-content-container"
            : "page-content-container-visible"
        }
        className={css["container"]}
      >
        <div id="page-content-container-inner">
          <div
            id={pageContentID}
            className={(() => {
              let className = css["content"]

              if (props.isHomePage) {
                className += ` homepage`
              }

              if (assetsLoaded) {
                className += ` ${css["loaded"]}`
              }

              return className
            })()}
          >
            {props.children}
          </div>
        </div>
      </main>
    </>
  )
}

export default ContentBlock

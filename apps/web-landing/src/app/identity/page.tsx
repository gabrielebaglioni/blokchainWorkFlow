"use client"
import React, { useEffect } from "react"
import Link from "../../components/Link"
import ContentBlock from "../../components/page/Content"
import { loadAndCacheTexture } from "components/page/animation/loaders/textureLoader"
import { DoubleSpiraleIcon } from "../../components/icons/DoubleSpiraleIcon"

const Identity = (props: any) => {
  useEffect(() => {
    loadAndCacheTexture("/output-layer")
  }, [])

  return (
    <ContentBlock>
      <div id="content-body" className="disable--selection">
        <h1>An identity, not a company</h1>
        <p>
          HouseBlock is not tied to my first and last name. It's an autonomous identity, with a logo, an avatar, and a coherent voice.
        </p>

        <p>
          This choice is intentional: it allows me to experiment more freely, to speak in first person through a digital character, and to separate my experiments from my "traditional" profile.
        </p>

        <p>
          The goal is not to attract clients with offers and pricing, but to build reputation through what is created and shared. If one day someone wants something similar or wants to collaborate, we can talk about it. But the project is born to serve me, not the market.
        </p>

        <Link href="/architecture" id="next-navigation">
          <DoubleSpiraleIcon
            variant="white"
            width={50}
            height={50}
            ariaLabel="Next"
          />
          <span>Architecture: a microservices ecosystem</span>
        </Link>
      </div>
    </ContentBlock>
  )
}

export default Identity

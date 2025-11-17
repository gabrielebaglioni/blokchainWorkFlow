"use client"
import React, { useEffect } from "react"
import Link from "../../components/Link"
import ContentBlock from "../../components/page/Content"
import { loadAndCacheTexture } from "components/page/animation/loaders/textureLoader"
import { DoubleSpiraleIcon } from "../../components/icons/DoubleSpiraleIcon"

const Philosophy = (props: any) => {
  useEffect(() => {
    loadAndCacheTexture("/")
  }, [])

  return (
    <ContentBlock>
      <div id="content-body" className="disable--selection">
        <h1>Architecture: a microservices ecosystem</h1>
        <p>
          At the foundation of the project is an architecture made of independent workflows, often orchestrated with n8n, that function as microservices.
        </p>

        <p>
          Each microservice has a clear responsibility: collect data, analyze it, generate content, archive insights, publish output, display dashboards.
        </p>

        <p>
          These blocks are loosely coupled: they can be stopped, replaced, or extended without breaking the entire system. It's the same logic I would use to design a distributed system in production, applied however to a personal AI + Web3 laboratory.
        </p>

        <Link href="/input-layer" id="next-navigation">
          <DoubleSpiraleIcon
            variant="white"
            width={50}
            height={50}
            ariaLabel="Next"
          />
          <span> Input Layer: listening to Web3 </span>
        </Link>
      </div>
    </ContentBlock>
  )
}

export default Philosophy

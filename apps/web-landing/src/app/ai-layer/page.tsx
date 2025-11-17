"use client"
import React, { useEffect } from "react"
import Link from "../../components/Link"
import ContentBlock from "../../components/page/Content"
import { loadAndCacheTexture } from "components/page/animation/loaders/textureLoader"
import { DoubleSpiraleIcon } from "../../components/icons/DoubleSpiraleIcon"

const Ethereum = (props: any) => {
  useEffect(() => {
    loadAndCacheTexture("/identity")
  }, [])

  return (
    <ContentBlock>
      <div id="content-body" className="disable--selection">
        <h1>AI Layer: interpreting and filtering</h1>

        <p>
          The second layer is the AI Analysis Layer, where the raw flow becomes information.
        </p>

        <p>
          This is where language models and scoring logic come into play that:
        </p>
        <ul>
          <li>identify emerging trends and narratives;</li>
          <li>evaluate sentiment on protocols, chains, and communities;</li>
          <li>distinguish what is "background noise" and what might be important;</li>
          <li>suggest which topics deserve a post, an in-depth analysis, or an experiment.</li>
        </ul>

        <p>
          In practice, it's the part of the system that asks: "Do I really need this, or can I let it go?". It's the filter that protects my time and attention.
        </p>

        <Link href="/output-layer" id="next-navigation">
          <DoubleSpiraleIcon
            variant="white"
            width={50}
            height={50}
            ariaLabel="Next"
          />
          <span>Output Layer: content, visuals, and knowledge base</span>
        </Link>
      </div>
    </ContentBlock>
  )
}

export default Ethereum

"use client"
import React, { useEffect } from "react"
import Link from "../../components/Link"
import ContentBlock from "../../components/page/Content"
import { loadAndCacheTexture } from "components/page/animation/loaders/textureLoader"

const InfiniteGarden = (props: any) => {
  useEffect(() => {
    loadAndCacheTexture("/ai-layer")
  }, [])

  return (
    <ContentBlock>
      <div id="content-body" className="disable--selection">
        <h1>Why this project exists</h1>

        <p>
          The Web3 ecosystem is chaotic: news, chains, protocols, drama, hacks, endless threads. It's easy to get lost, it's hard to understand what really matters.
        </p>

        <p>
          HouseBlock was born from this: the desire to build a system that filters the noise, highlights the signal, and allows me to follow the blockchain world without being overwhelmed by it.
        </p>

        <p>
          Instead of spending hours every day between tweets, articles, and dashboards, I chose to use what I know as a software architect – automation, microservices, integrations – to create a "second brain" specialized in Web3, that watches for me and delivers only what really matters.
        </p>

        <Link href="/identity" id="next-navigation">
          <object
            data="/assets/double-spirale-white.svg"
            width="50"
            height="50"
            aria-labelledby="Next"
          >
            {" "}
            Next
          </object>
          <span> An identity, not a company </span>
        </Link>
      </div>
    </ContentBlock>
  )
}

export default InfiniteGarden

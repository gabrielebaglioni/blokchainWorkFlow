"use client"

import React, { useEffect } from "react"
import Link from "../../components/Link"
import ContentBlock from "../../components/page/Content"
import { loadAndCacheTexture } from "components/page/animation/loaders/textureLoader"
import SilvicultureSocietyMembers from "../../components/silviculture-society-members/SilvicultureSociety"

const SilvicultureSociety = () => {
  useEffect(() => {
    loadAndCacheTexture("/identity")
  }, [])

  return (
    <ContentBlock>
      <div id="content-body" className="disable--selection">
        <h1>Publishing, social, and dashboard</h1>
        <p>
          The final part of the flow concerns how this information emerges outward.
        </p>
        <p>
          A set of workflows handles:
        </p>
        <ul>
          <li>publishing consistently on X, Telegram, LinkedIn (and, if needed, on other channels);</li>
          <li>avoiding spam and overproduction, preferring few good signals over many useless contents;</li>
          <li>tracking what works, what generates real interactions, which formats are most effective.</li>
        </ul>
        <p>
          In parallel, a personal dashboard shows system status, channel growth, microservices activity, insights to review. It's not designed to "sell", but to help me understand how the house is growing and where it makes sense to prune, extend, or plant something new.
        </p>

        <Link href="/future" id="next-navigation">
          <object
            data="/assets/double-spirale-white.svg"
            width="50"
            height="50"
            aria-labelledby="Next"
          >
            {" "}
            Next
          </object>
          <span> Future of the house: experiments and collaborations </span>
        </Link>
      </div>
    </ContentBlock>
  )
}

export default SilvicultureSociety

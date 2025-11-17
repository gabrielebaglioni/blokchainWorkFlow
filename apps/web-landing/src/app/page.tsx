"use client"
import React, { useEffect } from "react"
import Link from "../components/Link"
import ContentBlock from "../components/page/Content"
import { loadAndCacheTexture } from "components/page/animation/loaders/textureLoader"
import { DoubleSpiraleIcon } from "../components/icons/DoubleSpiraleIcon"

const HomePage = () => {
  useEffect(() => {
    loadAndCacheTexture("/why-exists")
  }, [])

  return (
    <ContentBlock isHomePage>
      <div id="content-body" className="disable--selection">
        <h1>HouseBlock</h1>
        <p>
          HouseBlock is a personal experiment: a microservices system working on three fundamental layers – AI, automation, and Web3.
        </p>
        <p>
          It's not an agency, it's not a SaaS, it's not a product for sale. It's a system that works for one thing: feeding my understanding of the blockchain world and transforming it into content, notes, and ideas that last over time.
        </p>
        <p>
          At the center is a pseudonymous identity, HouseBlock, that observes, interprets, and tells stories. Everything that gets published – posts, threads, images, experiments – is the result of a microservices ecosystem working in the background, like an automatic house that never stops growing.
        </p>
        <Link href="/why-exists" id="next-navigation">
          <DoubleSpiraleIcon
            variant="default"
            width={50}
            height={50}
            ariaLabel="Next"
          />
          <span> Click to explore </span>
        </Link>
      </div>
    </ContentBlock>
  )
}

export default HomePage

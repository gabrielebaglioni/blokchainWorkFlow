"use client"
import React, { useEffect } from "react"
import Link from "../../components/Link"
import ContentBlock from "../../components/page/Content"
import Image from "next/image"
import { loadAndCacheTexture } from "components/page/animate"

const EthereumFoundation = (props: any) => {
  useEffect(() => {
    loadAndCacheTexture("/architecture")
  }, [])

  return (
    <ContentBlock>
      <div id="content-body" className="disable--selection">
        <h1>Input Layer: listening to Web3</h1>
        <p>
          The first layer of the house is the Input Layer: everything related to listening.
        </p>
        <p>
          This is where the workflows live that:
        </p>
        <ul>
          <li>read news and articles from Web3 sources;</li>
          <li>follow accounts, threads, and conversations on X, Telegram, and Discord;</li>
          <li>intercept on-chain events – unusual movements, new smart contracts, hacks, liquidations, sudden changes in TVL or volumes.</li>
        </ul>
        <p>
          This layer decides nothing, interprets nothing: its only job is to collect data continuously and in a structured way, creating a raw flow on which subsequent layers can work.
        </p>

        <Link href="/ai-layer" id="next-navigation">
          <object
            data="/assets/double-spirale-white.svg"
            width="50"
            height="50"
            aria-labelledby="Next"
          >
            {" "}
            Next
          </object>
          <span> AI Layer: interpreting and filtering </span>
        </Link>
      </div>
    </ContentBlock>
  )
}

export default EthereumFoundation

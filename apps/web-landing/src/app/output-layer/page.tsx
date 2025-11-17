"use client"
import React from "react"
import Link from "../../components/Link"
import ContentBlock from "../../components/page/Content"
import { DoubleSpiraleIcon } from "../../components/icons/DoubleSpiraleIcon"

const OutputLayer = (props: any) => {
  return (
    <ContentBlock>
      <div id="content-body" className="disable--selection">
        <h1>Output Layer: content, visuals, and knowledge base</h1>
        <p>
          Once the signal has been identified, the Output Layer comes into play.
        </p>
        <p>
          Here the system:
        </p>
        <ul>
          <li>generates drafts of posts, threads, research notes, and micro-essays;</li>
          <li>creates visuals – graphs, explanatory cards, data snapshots – that help see patterns and dynamics;</li>
          <li>saves everything it finds interesting in an internal knowledge base, indexed and reusable.</li>
        </ul>
        <p>
          Only a portion of what is produced ends up on social media: the rest remains as private material – insights, patterns, ideas for future projects, potential more structured articles.
        </p>

        <Link href="/publishing" id="next-navigation">
          <DoubleSpiraleIcon
            variant="white"
            width={50}
            height={50}
            ariaLabel="Next"
          />
          <span>Publishing, social, and dashboard</span>
        </Link>
      </div>
    </ContentBlock>
  )
}

export default OutputLayer

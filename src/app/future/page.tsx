"use client"

import React, { useEffect } from "react"
import Link from "../../components/Link"
import ContentBlock from "../../components/page/Content"
import { loadAndCacheTexture } from "components/page/animate"

const ConflictOfInterestPolicyPage = () => {
  useEffect(() => {
    loadAndCacheTexture("/identity")
  }, [])

  return (
    <ContentBlock>
      <style jsx global>{`
        ul {
          padding: 0;
          margin: 0;
        }
        h2 {
          margin-block: 35px;
        }
        .list-heading {
          text-align: left;
          font-size: 18px;
          padding: 0px;
          margin-bottom: 8px;
          font-weight: 600;
        }   
        section {
            padding:0 100px;
            @media (max-width: 900px) {
              padding:0 50px;
            }
            @media (max-width: 500px) {
              font-size: 16px;
              padding:0 20px;
            }
        }
        ul, ul ul {
          margin-left: 20px;
        }
      `}</style>
      <div id="content-body" className="disable--selection">
        <h1>Future of the house: experiments and collaborations</h1>
        <p>
          HouseBlock is designed as an open and evolving project.
        </p>
        <p>
          Over time, new microservices, new visualizations, new ways of telling Web3 stories may emerge – perhaps with public dashboards, interactive experiments, or small open source tools.
        </p>
        <p>
          If someone wants a similar system for themselves, or wants to explore an idea together, the house will have already done its job: it will have shown, with facts and not with a brochure, what happens when AI, automation, and blockchain are treated as a living ecosystem, and not as simple buzzwords.
        </p>
        <p>
          The future is not fixed in a rigid business plan: it's a series of iterations. The house observes, grows, adapts. And I with it.
        </p>

        <Link href="/" id="next-navigation">
          <object
            data="/assets/double-spirale-white.svg"
            width="50"
            height="50"
            aria-labelledby="Next"
          >
            {" "}
            Next
          </object>
          <span> Back Home </span>
        </Link>
      </div>
    </ContentBlock>
  )
}

export default ConflictOfInterestPolicyPage

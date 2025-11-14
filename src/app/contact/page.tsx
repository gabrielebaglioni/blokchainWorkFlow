"use client"

import React, { useEffect } from "react"
import Link from "../../components/Link"
import ContentBlock from "../../components/page/Content"
import { loadAndCacheTexture } from "components/page/animate"

const EFSocialRequestsPage = () => {
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
        section li {
            margin: 0 100px;
            @media (max-width: 900px) {
              margin: 0 50px;
            }
            @media (max-width: 500px) {
              margin: 0 20px;
            }
        }
        ul, ul ul {
          margin-left: 20px;
        }
        hr {
          margin: 40px 0;
          border: none;
          border-top: 1px solid #ddd;
        }
      `}</style>
      <div id="content-body" className="disable--selection">
        <h1>HouseBlock</h1>
        <p>
          This page is under construction.
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

export default EFSocialRequestsPage
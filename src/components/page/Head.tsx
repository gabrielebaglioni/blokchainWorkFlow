type HeadProps = {
  title: string
}

const Head = (props: HeadProps) => {
  return (
    <head>
      <title>{props.title}</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1,minimum-scale=1.0, maximum-scale=5.0, viewport-fit=cover' />
      <meta
        name="description"
        content="HouseBlock is a personal experiment: a microservices system working on three fundamental layers – AI, automation, and Web3."
      />

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />

      <link rel='shortcut icon' sizes='196x196' href='/favicon.png' />
      <link rel='stylesheet' href='https://use.typekit.net/akf2vsf.css' />

      <meta property="og:site_name" content="HouseBlock" />
      <meta property="og:title" content={props.title} />
      <meta property="og:description" content="HouseBlock is a personal experiment: a microservices system working on three fundamental layers – AI, automation, and Web3." />
      <meta property="og:url" content="https://houseblock.io" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://houseblock.io/assets/EF-website-thumbnail.jpg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={props.title} />
      <meta name="twitter:image" content="https://houseblock.io/assets/EF-website-thumbnail.jpg" />
      <link rel='apple-touch-icon-precomposed' href='/favicon.png' />
      <link rel='apple-touch-icon' href='/favicon.png' />
      <meta name='msapplication-TileColor' content='#FFFFFF' />
      <meta name='msapplication-TileImage' content='/favicon.png' />
      <link rel='shortcut icon' sizes='196x196' href='/favicon.png' />
    </head>
  )
}

export default Head;
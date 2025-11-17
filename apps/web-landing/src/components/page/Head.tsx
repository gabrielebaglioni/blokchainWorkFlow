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

      {/* Favicon - logo principale per browser tab e tutto il progetto */}
      <link rel='icon' type='image/png' sizes='196x196' href='/favicon.png' />
      <link rel='shortcut icon' type='image/png' href='/favicon.png' />
      <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
      <link rel='stylesheet' href='https://use.typekit.net/akf2vsf.css' />

      {/* Open Graph / Social Media Meta Tags */}
      <meta property="og:site_name" content="HouseBlock" />
      <meta property="og:title" content={props.title} />
      <meta property="og:description" content="HouseBlock is a personal experiment: a microservices system working on three fundamental layers – AI, automation, and Web3." />
      <meta property="og:url" content="https://houseblock.io" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://houseblock.io/favicon.png" />
      <meta property="og:image:width" content="196" />
      <meta property="og:image:height" content="196" />
      <meta property="og:image:alt" content="HouseBlock Logo" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={props.title} />
      <meta name="twitter:description" content="HouseBlock is a personal experiment: a microservices system working on three fundamental layers – AI, automation, and Web3." />
      <meta name="twitter:image" content="https://houseblock.io/favicon.png" />
      
      {/* Apple Touch Icons */}
      <link rel='apple-touch-icon-precomposed' href='/favicon.png' />
      <link rel='apple-touch-icon' href='/favicon.png' />
      
      {/* Windows Tiles */}
      <meta name='msapplication-TileColor' content='#0a0a0a' />
      <meta name='msapplication-TileImage' content='/favicon.png' />
    </head>
  )
}

export default Head;
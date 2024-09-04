import Head from "next/head"

interface SEOProps {
  title: string
  description: string
  ogImage?: string
}

const SEO: React.FC<SEOProps> = ({ title, description, ogImage }) => (
  <Head>
    <title>{title} | DigiMedic Blog</title>
    <meta name="description" content={description} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    {ogImage && <meta property="og:image" content={ogImage} />}
    <meta name="twitter:card" content="summary_large_image" />
  </Head>
)

export default SEO

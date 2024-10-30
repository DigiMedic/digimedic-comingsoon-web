import Head from 'next/head';

interface SEOProps {
  title: string;
  description: string;
}

export default function SEO({ title, description }: SEOProps) {
  return (
    <Head>
      <title>{title} | DigiMedic</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Head>
  );
}

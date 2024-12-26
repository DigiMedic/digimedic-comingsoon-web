export const ghostConfig = {
  defaultParams: {
    include: 'tags,authors',
    limit: 'all',
  },
  api: {
    url: process.env.NEXT_PUBLIC_GHOST_URL || 'https://ghost.digimedic.dev',
    key: process.env.NEXT_PUBLIC_GHOST_KEY || '',
    version: 'v5.0',
  },
  endpoints: {
    posts: '/ghost/api/content/posts',
    tags: '/ghost/api/content/tags',
    authors: '/ghost/api/content/authors',
  },
  caching: {
    revalidate: 60, // revalidace cache každou minutu
    staleWhileRevalidate: 300, // povolí použití staré cache po dobu 5 minut během revalidace
  },
  security: {
    enforceHttps: true, // vždy používat HTTPS
    allowInsecure: process.env.NODE_ENV === 'development', // povolit HTTP pouze v development módu
  }
}

export const ghostConfig = {
  api: {
    url: process.env.NEXT_PUBLIC_GHOST_URL || 'http://194.164.72.131:2368',
    key: process.env.NEXT_PUBLIC_GHOST_KEY || '',
    version: 'v3.0',
  },
  endpoints: {
    posts: '/ghost/api/v3/content/posts',
    pages: '/ghost/api/v3/content/pages',
    tags: '/ghost/api/v3/content/tags',
    authors: '/ghost/api/v3/content/authors',
  },
  defaultParams: {
    include: 'tags,authors',
    limit: 'all',
  },
  security: {
    enforceHttps: false, // Vypneme vynucení HTTPS
    allowInsecure: true, // Povolíme HTTP
  },
  caching: {
    revalidate: 60, // revalidace každou minutu
    staleWhileRevalidate: 300, // povolíme starou verzi po dobu 5 minut
  },
  logging: {
    enabled: true,
    level: 'debug',
  }
}

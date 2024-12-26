export const ghostConfig = {
  defaultParams: {
    include: 'tags,authors',
    limit: 'all',
  },
  api: {
    url: process.env.NEXT_PUBLIC_GHOST_URL || 'http://194.164.72.131:2368',
    key: process.env.NEXT_PUBLIC_GHOST_KEY || '',
    version: 'v5.0',
  },
  endpoints: {
    posts: '/ghost/api/content/posts',
    tags: '/ghost/api/content/tags',
    authors: '/ghost/api/content/authors',
  },
  caching: {
    revalidate: 60,
    staleWhileRevalidate: 300,
  },
  security: {
    enforceHttps: false, // Vypneme vynucení HTTPS
    allowInsecure: true, // Povolíme HTTP
  }
}

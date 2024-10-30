export const ghostConfig = {
  apiVersion: 'v5.0',
  revalidateInterval: 3600, // 1 hodina
  endpoints: {
    posts: '/ghost/api/content/posts/',
  },
  defaultParams: {
    include: 'tags,authors',
    limit: 'all',
  },
} as const;

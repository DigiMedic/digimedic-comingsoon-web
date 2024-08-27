import GhostContentAPI from '@tryghost/content-api';

const api = new GhostContentAPI({
  url: process.env.GHOST_API_URL,
  key: process.env.GHOST_CONTENT_API_KEY,
  version: 'v5.0'
});

export async function getPosts() {
  return await api.posts
    .browse({
      limit: 'all',
      include: ['tags', 'authors'],
    })
    .catch((err: Error) => {
      console.error('Chyba při načítání příspěvků:', err);
      throw err;
    });
}

export async function getSinglePost(slug: string) {
  return await api.posts
    .read({ slug }, { include: ['tags', 'authors'] })
    .catch((err: Error) => {
      console.error(`Chyba při načítání příspěvku se slugem ${slug}:`, err);
      throw err;
    });
}

export async function getTags() {
  return await api.tags
    .browse({ limit: 'all' })
    .catch((err: Error) => {
      console.error('Chyba při načítání tagů:', err);
      throw err;
    });
}

export async function getAuthors() {
  return await api.authors
    .browse({ limit: 'all' })
    .catch((err: Error) => {
      console.error('Chyba při načítání autor:', err);
      throw err;
    });
}

export async function getPages() {
  return await api.pages
    .browse({ limit: 'all' })
    .catch((err: Error) => {
      console.error('Chyba při načítání stránek:', err);
      throw err;
    });
}

export async function getPaginatedPosts(page: number = 1, limit: number = 10) {
  console.log(`Fetching posts: page ${page}, limit ${limit}`);
  console.log('API URL:', process.env.GHOST_API_URL);
  console.log('API Key:', process.env.GHOST_CONTENT_API_KEY);
  try {
    const result = await api.posts.browse({
      page,
      limit,
      include: ['tags', 'authors'],
    });
    console.log('Fetched posts result:', JSON.stringify(result, null, 2));
    return result;
  } catch (err) {
    console.error(`Chyba při načítání stránkovaných příspěvků (stránka ${page}):`, err);
    throw err;
  }
}

export default api;
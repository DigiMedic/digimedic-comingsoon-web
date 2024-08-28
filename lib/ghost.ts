import GhostContentAPI from '@tryghost/content-api';
import axios from 'axios';

if (!process.env.GHOST_API_URL || !process.env.GHOST_CONTENT_API_KEY) {
  throw new Error('Chybí GHOST_API_URL nebo GHOST_CONTENT_API_KEY v proměnných prostředí.');
}

const api = new GhostContentAPI({
  url: process.env.GHOST_API_URL || '',
  key: process.env.GHOST_CONTENT_API_KEY || '',
  version: 'v5.0'
});

export interface GhostPost {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  feature_image?: string;
  published_at: string;
  reading_time: number;
  html: string;
  primary_author: {
    name: string;
    profile_image?: string;
  };
  tags?: Array<{ id: string; name: string }>;
}

export async function getPosts(): Promise<GhostPost[]> {
  try {
    const response = await axios.get(`${process.env.GHOST_API_URL}/ghost/api/v3/content/posts/?key=${process.env.GHOST_CONTENT_API_KEY}&include=tags,authors&limit=all`);
    return response.data.posts;
  } catch (error) {
    console.error('Chyba při načítání příspěvků:', error);
    throw error;
  }
}

export async function getSinglePost(slug: string): Promise<GhostPost | null> {
  console.log(`Attempting to fetch post with slug: ${slug}`);
  try {
    const response = await axios.get(`${process.env.GHOST_API_URL}/ghost/api/v3/content/posts/slug/${slug}/?key=${process.env.GHOST_CONTENT_API_KEY}&include=tags,authors`);
    console.log('Successfully fetched post:', response.data.posts[0]);
    return response.data.posts[0];
  } catch (error) {
    console.error(`Error fetching post with slug ${slug}:`, error);
    return null;
  }
}

export async function getTags(): Promise<any[]> {
  return await api.tags
    .browse({ limit: 'all' })
    .catch((err: Error) => {
      console.error('Chyba při načítán�� tagů:', err);
      throw err;
    });
}

export async function getAuthors() {
  return await api.authors
    .browse({ limit: 'all' })
    .catch((err: Error) => {
      console.error('Chyba při načítání autorů:', err);
      throw err;
    });
}

export async function getPages() {
  return await api.pages
    .browse({ limit: 'all' })
    .catch((err: Error) => {
      console.error('Chyba při natání stránek:', err);
      throw err;
    });
}

export async function getPaginatedPosts(page: number = 1, limit: number = 10): Promise<{ posts: GhostPost[], meta: { pagination: { page: number, limit: number, pages: number, total: number, next: number | null, prev: number | null } } }> {
  console.log(`Načítání příspěvků: stránka ${page}, limit ${limit}`);
  console.log('API URL:', process.env.GHOST_API_URL);
  console.log('API Key:', process.env.GHOST_CONTENT_API_KEY);
  try {
    const result = await api.posts.browse({
      page,
      limit,
      include: ['tags', 'authors'],
    });
    console.log('Výsledek načtených příspěvků:', JSON.stringify(result, null, 2));
    return {
      posts: result.map((post): GhostPost => ({
        id: post.id,
        slug: post.slug,
        title: post.title || '',
        excerpt: post.excerpt,
        feature_image: post.feature_image || undefined,
        published_at: post.published_at || '',
        reading_time: post.reading_time || 0,
        html: post.html || '',
        primary_author: {
          name: post.primary_author?.name || '',
          profile_image: post.primary_author?.profile_image || undefined,
        },
        tags: post.tags?.map(tag => ({ id: tag.id, name: tag.name || '' })),
      })),
      meta: {
        pagination: result.meta.pagination
      }
    };
  } catch (err) {
    console.error(`Chyba při načítání stránkovaných příspěvků (stránka ${page}):`, err);
    throw err;
  }
}

export default api;
import axios from 'axios';

// Přidáme konstanty pro URL a KEY
const GHOST_URL = process.env.NEXT_PUBLIC_GHOST_URL;
const GHOST_KEY = process.env.NEXT_PUBLIC_GHOST_KEY;

if (!GHOST_URL || !GHOST_KEY) {
  throw new Error(
    'Ghost API konfigurace chybí. Zkontrolujte NEXT_PUBLIC_GHOST_URL a NEXT_PUBLIC_GHOST_KEY v .env'
  );
}

export interface GhostPost {
  id: string;
  slug: string;
  title: string;
  html: string;
  feature_image: string | null | undefined;
  published_at: string;
  excerpt: string;
  reading_time: number;
  tags?: Array<{ name: string; slug: string }>;
}

export interface GhostError {
  message: string;
  code?: number;
}

export async function getPosts(): Promise<GhostPost[]> {
  try {
    const response = await axios.get(`${GHOST_URL}/ghost/api/content/posts/`, {
      params: {
        key: GHOST_KEY,
        limit: 'all',
        include: 'tags,authors'
      }
    });

    if (!response.data || !response.data.posts) {
      throw new Error('Neplatná odpověď z Ghost API');
    }

    return response.data.posts;
  } catch (err) {
    console.error('Error fetching posts:', err);
    throw new Error(
      err instanceof Error
        ? err.message
        : 'Chyba při načítání příspěvků z Ghost API'
    );
  }
}

export async function getPostBySlug(slug: string): Promise<GhostPost | null> {
  try {
    const response = await axios.get(`${GHOST_URL}/ghost/api/content/posts/slug/${slug}/`, {
      params: {
        key: GHOST_KEY,
        include: 'tags,authors'
      }
    });

    if (!response.data || !response.data.posts) {
      return null;
    }

    return response.data.posts[0] || null;
  } catch (error) {
    console.error('Chyba při načítání příspěvku:', error);
    return null;
  }
}

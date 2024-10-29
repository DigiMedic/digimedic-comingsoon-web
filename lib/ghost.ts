import GhostContentAPI from '@tryghost/content-api';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_GHOST_URL: string;
      NEXT_PUBLIC_GHOST_KEY: string;
    }
  }
}

const GHOST_URL = process.env.NEXT_PUBLIC_GHOST_URL;
const GHOST_KEY = process.env.NEXT_PUBLIC_GHOST_KEY;

if (!GHOST_URL || !GHOST_KEY) {
  throw new Error(
    'Ghost API konfigurace chybí. Zkontrolujte NEXT_PUBLIC_GHOST_URL a NEXT_PUBLIC_GHOST_KEY v .env'
  );
}

export async function getPosts(): Promise<GhostPost[]> {
  try {
    const response = await fetch(
      `${GHOST_URL}/ghost/api/content/posts/?key=${GHOST_KEY}&include=tags,authors&fields=id,slug,title,html,feature_image,published_at,excerpt,reading_time&limit=all`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data.posts;
  } catch (error) {
    console.error('Chyba při načítání příspěvků z Ghost:', error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<GhostPost | null> {
  try {
    const response = await fetch(
      `${GHOST_URL}/ghost/api/content/posts/slug/${slug}/?key=${GHOST_KEY}&include=tags,authors`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data.posts[0] || null;
  } catch (error) {
    console.error('Chyba při načítání příspěvku:', error);
    return null;
  }
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

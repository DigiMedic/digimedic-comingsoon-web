import { GhostPost, GhostAPIResponse } from './ghost.types';
import { ghostConfig } from '../config/ghost.config';
import { BlogPost } from '@/types/blog';

// Kontrola prostředí a konfigurace
const GHOST_URL = process.env.NEXT_PUBLIC_GHOST_URL!;
const GHOST_KEY = process.env.NEXT_PUBLIC_GHOST_KEY!;

if (!GHOST_URL || !GHOST_KEY) {
  throw new Error('Ghost API konfigurace chybí - zkontrolujte NEXT_PUBLIC_GHOST_URL a NEXT_PUBLIC_GHOST_KEY v .env');
}

export function convertGhostPostToBlogPost(post: GhostPost): BlogPost {
  // Zajistíme, že máme validní datum nebo použijeme aktuální datum jako fallback
  const safeDate = (dateStr: string | null): Date => {
    if (!dateStr) return new Date();
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? new Date() : date;
  };

  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    content: post.html || '',
    imageUrl: post.feature_image,
    publishedAt: safeDate(post.published_at),
    excerpt: post.excerpt || '',
    createdAt: safeDate(post.created_at),
    updatedAt: safeDate(post.updated_at),
    published_at: post.published_at || new Date().toISOString(),
    reading_time: post.reading_time || 0,
  };
}

export async function getPosts(): Promise<GhostPost[]> {
  try {
    console.log('Ghost API konfigurace:', {
      url: GHOST_URL,
      hasKey: !!GHOST_KEY,
    });

    const url = new URL(ghostConfig.endpoints.posts, GHOST_URL);
    url.searchParams.append('key', GHOST_KEY);
    url.searchParams.append('include', ghostConfig.defaultParams.include);
    url.searchParams.append('limit', ghostConfig.defaultParams.limit);

    console.log('Pokus o načtení z URL:', url.toString());

    const response = await fetch(url.toString(), {
      next: { revalidate: ghostConfig.revalidateInterval },
      headers: {
        'Accept-Version': ghostConfig.apiVersion,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Ghost API response not OK:', response.status, errorText);
      throw new Error(`Ghost API vrátila chybu: ${response.status} - ${errorText}`);
    }

    const data = await response.json() as GhostAPIResponse;
    console.log('Počet načtených příspěvků:', data.posts?.length || 0);

    if (!data.posts) {
      throw new Error('Ghost API nevrátila žádné příspěvky');
    }

    return data.posts;

  } catch (error) {
    console.error('Detailní chyba při načítání příspěvků:', {
      error,
      message: error instanceof Error ? error.message : 'Neznámá chyba',
      cause: error instanceof Error ? error.cause : undefined,
    });
    throw error;
  }
}

export async function getPostBySlug(slug: string): Promise<GhostPost | null> {
  try {
    console.log('Načítám článek se slugem:', slug);

    const url = new URL(`${GHOST_URL}/ghost/api/content/posts/slug/${slug}`);
    url.searchParams.append('key', GHOST_KEY);
    url.searchParams.append('include', ghostConfig.defaultParams.include);

    console.log('Pokus o načtení z URL:', url.toString());

    const response = await fetch(url.toString(), {
      headers: {
        'Accept-Version': ghostConfig.apiVersion,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Ghost API response not OK:', response.status, errorText);
      throw new Error(`Ghost API vrátila chybu: ${response.status} - ${errorText}`);
    }

    const data = await response.json() as GhostAPIResponse;
    console.log('API odpověď pro slug:', slug, 'Data:', data);

    if (!data.posts || !data.posts[0]) {
      console.log('Žádný článek nebyl nalezen pro slug:', slug);
      return null;
    }

    return data.posts[0];

  } catch (error) {
    console.error('Detailní chyba při načítání článku:', {
      error,
      message: error instanceof Error ? error.message : 'Neznámá chyba',
      cause: error instanceof Error ? error.cause : undefined,
      slug,
    });
    throw error;
  }
}

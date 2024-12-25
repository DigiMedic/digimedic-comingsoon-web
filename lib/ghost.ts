import { GhostAPIResponse } from './ghost.types';
import { ghostConfig } from '../config/ghost.config';
import { BlogPost, GhostPost } from '@/types/blog';

// Kontrola prostředí a konfigurace
const GHOST_URL = process.env.NEXT_PUBLIC_GHOST_URL;
const GHOST_KEY = process.env.NEXT_PUBLIC_GHOST_KEY;

// Funkce pro kontrolu konfigurace
function validateConfig() {
  if (!GHOST_URL || !GHOST_KEY) {
    console.error('Chybí Ghost API konfigurace:', {
      GHOST_URL: !!GHOST_URL,
      GHOST_KEY: !!GHOST_KEY,
    });
    return false;
  }
  return true;
}

export function convertGhostPostToBlogPost(post: GhostPost): BlogPost {
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
  if (!validateConfig()) {
    console.error('Ghost API není správně nakonfigurováno');
    return [];
  }

  try {
    const url = new URL('/ghost/api/content/posts/', GHOST_URL!);
    url.searchParams.append('key', GHOST_KEY!);
    url.searchParams.append('include', ghostConfig.defaultParams.include);
    
    console.log('Fetching posts from:', url.toString());
    
    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: GhostAPIResponse = await response.json();
    return data.posts || [];
  } catch (error) {
    console.error('Chyba při načítání příspěvků z Ghost API:', error);
    throw error;
  }
}

export async function getPostBySlug(slug: string): Promise<GhostPost | null> {
  if (!validateConfig()) {
    return null;
  }

  try {
    const url = new URL(`/ghost/api/content/posts/slug/${slug}`, GHOST_URL!);
    url.searchParams.append('key', GHOST_KEY!);
    url.searchParams.append('include', ghostConfig.defaultParams.include);

    console.log('Fetching post by slug from:', url.toString());

    const response = await fetch(url.toString());
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Ghost API response not OK:', response.status, errorText);
      return null;
    }

    const data = await response.json() as GhostAPIResponse;
    return data.posts?.[0] || null;

  } catch (error) {
    console.error('Chyba při načítání článku:', error);
    return null;
  }
}

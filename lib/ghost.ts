// Přidáme konstanty pro URL a KEY
import { BlogPost } from '../types/blog';

const GHOST_URL = process.env.NEXT_PUBLIC_GHOST_URL;
const GHOST_KEY = process.env.NEXT_PUBLIC_GHOST_KEY;

if (!GHOST_URL || !GHOST_KEY) {
  throw new Error(
    'Ghost API konfigurace chybí. Zkontrolujte NEXT_PUBLIC_GHOST_URL a NEXT_PUBLIC_GHOST_KEY v .env'
  );
}

export interface GhostPost {
  id: string;
  uuid: string;
  title: string;
  slug: string;
  html: string | null;
  comment_id: string;
  feature_image: string | null;
  feature_image_alt: string | null;
  feature_image_caption: string | null;
  featured: boolean;
  visibility: string;
  created_at: string;
  updated_at: string;
  published_at: string;
  custom_excerpt: string | null;
  codeinjection_head: string | null;
  codeinjection_foot: string | null;
  custom_template: string | null;
  canonical_url: string | null;
  url: string;
  excerpt: string;
  reading_time: number;
  access: boolean;
  og_image: string | null;
  og_title: string | null;
  og_description: string | null;
  twitter_image: string | null;
  twitter_title: string | null;
  twitter_description: string | null;
  meta_title: string | null;
  meta_description: string | null;
  email_subject: string | null;
  authors?: Array<{
    id: string;
    name: string;
    slug: string;
    profile_image: string | null;
    cover_image: string | null;
    bio: string | null;
    website: string | null;
    location: string | null;
    facebook: string | null;
    twitter: string | null;
    meta_title: string | null;
    meta_description: string | null;
    url: string;
  }>;
  primary_author?: {
    id: string;
    name: string;
    slug: string;
    profile_image: string | null;
    cover_image: string | null;
    bio: string | null;
    website: string | null;
    location: string | null;
    facebook: string | null;
    twitter: string | null;
    meta_title: string | null;
    meta_description: string | null;
    url: string;
  } | null;
  tags?: Array<{
    id: string;
    name: string;
    slug: string;
    description: string | null;
    feature_image: string | null;
    visibility: string;
    meta_title: string | null;
    meta_description: string | null;
    url: string;
  }> | null;
  primary_tag?: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    feature_image: string | null;
    visibility: string;
    meta_title: string | null;
    meta_description: string | null;
    url: string;
  };
}

export interface GhostError {
  message: string;
  code?: number;
}

export async function getPosts(): Promise<GhostPost[]> {
  if (!GHOST_URL || !GHOST_KEY) {
    throw new Error('Chybí Ghost API konfigurace');
  }

  try {
    const response = await fetch(
      `${GHOST_URL}/ghost/api/content/posts/?key=${GHOST_KEY}&include=tags,authors&limit=all`,
      {
        next: { revalidate: 3600 }, // Cache na 1 hodinu
        headers: {
          'Accept-Version': 'v5.0',
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.posts || [];

  } catch (error) {
    console.error('Chyba při načítání příspěvků:', error);
    throw error;
  }
}

export async function getPostBySlug(slug: string): Promise<GhostPost | null> {
  try {
    const response = await fetch(
      `${GHOST_URL}/posts/slug/${slug}/?key=${GHOST_KEY}&include=tags,authors`,
      {
        headers: {
          'Accept-Version': 'v5.0',
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!data || !data.posts) {
      return null;
    }

    return data.posts[0] || null;
  } catch (error) {
    console.error('Chyba při načítání příspěvku:', error);
    return null;
  }
}

export function convertGhostPostToBlogPost(ghostPost: GhostPost): BlogPost {
  return {
    id: ghostPost.id,
    title: ghostPost.title,
    slug: ghostPost.slug,
    excerpt: ghostPost.excerpt || ghostPost.custom_excerpt || '',
    content: ghostPost.html ?? '',
    html: ghostPost.html ?? undefined,
    createdAt: ghostPost.created_at,
    updatedAt: ghostPost.updated_at,
    feature_image: ghostPost.feature_image ?? undefined,
    tags: ghostPost.tags ?? undefined,
    published_at: ghostPost.published_at,
    reading_time: ghostPost.reading_time || 5,
    primary_author: ghostPost.primary_author ?? undefined
  };
}

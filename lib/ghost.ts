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
  html: string;
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
  };
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
  }>;
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
  try {
    const response = await fetch(
      `${GHOST_URL}/posts/?key=${GHOST_KEY}&include=tags,authors&limit=all`,
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
      throw new Error('Neplatná odpověď z Ghost API');
    }

    return data.posts;
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
    excerpt: ghostPost.excerpt,
    content: ghostPost.html,
    createdAt: ghostPost.created_at,
    updatedAt: ghostPost.updated_at,
    feature_image: ghostPost.feature_image || undefined,
    tags: ghostPost.tags?.map(tag => ({ id: tag.id, name: tag.name })),
    published_at: ghostPost.published_at,
    primary_author: ghostPost.primary_author ? { name: ghostPost.primary_author.name } : undefined,
    custom_excerpt: ghostPost.custom_excerpt || undefined,
  };
}

import GhostContentAPI from "@tryghost/content-api";

interface MakeRequestOptions {
  url: string;
  method: string;
  params: Record<string, any>;
  headers: Record<string, string>;
}

// Použijeme NEXT_PUBLIC_ proměnné
const GHOST_URL = process.env.NEXT_PUBLIC_GHOST_URL;
const GHOST_KEY = process.env.NEXT_PUBLIC_GHOST_KEY;

if (!GHOST_URL || !GHOST_KEY) {
  console.error('Environment variables:', {
    GHOST_URL: process.env.NEXT_PUBLIC_GHOST_URL,
    GHOST_KEY: process.env.NEXT_PUBLIC_GHOST_KEY ? '[REDACTED]' : 'undefined'
  });
  throw new Error('Ghost URL nebo API klíč není nastaven v proměnných prostředí');
}

const api = new GhostContentAPI({
  url: GHOST_URL,
  key: GHOST_KEY,
  version: "v5.0"
});

// Přidáme na začátek souboru typy
interface GhostTag {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

interface GhostAuthor {
  id: string;
  name: string;
  slug: string;
  profile_image?: string;
  bio?: string;
}

interface GhostPost {
  id: string;
  uuid: string;
  title: string;
  slug: string;
  html?: string;
  feature_image?: string;
  featured: boolean;
  tags?: GhostTag[];
  authors?: GhostAuthor[];
  excerpt?: string;
  published_at: string;
}

interface GhostPostsResponse {
  posts: GhostPost[];
}

// Upravíme existující funkce pro použití typů
export async function getPosts(): Promise<GhostPost[]> {
  try {
    console.log('Fetching posts from Ghost API');
    const response = await fetch(
      `${GHOST_URL}/ghost/api/content/posts/?key=${GHOST_KEY}&include=tags,authors`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        next: { revalidate: 60 } // Cache na 60 sekund
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(`Fetched ${data.posts?.length || 0} posts`);
    return data.posts || [];
  } catch (error) {
    console.error("Error in getPosts:", error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<GhostPost | null> {
  try {
    console.log('Fetching post with slug:', slug);
    const response = await fetch(
      `${GHOST_URL}/ghost/api/content/posts/slug/${slug}/?key=${GHOST_KEY}&include=tags,authors`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        next: { revalidate: 60 } // Cache na 60 sekund
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.posts?.[0] || null;
  } catch (error) {
    console.error("Error in getPostBySlug:", error);
    return null;
  }
}

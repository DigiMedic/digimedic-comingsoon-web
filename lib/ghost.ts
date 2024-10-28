import GhostContentAPI from "@tryghost/content-api";

interface MakeRequestOptions {
  url: string;
  method: string;
  params: Record<string, any>;
  headers: Record<string, string>;
}

const GHOST_API_URL =
  "https://ghost-dso8k808400okgkc80wss8s0.194.164.72.131.sslip.io/ghost/api/content"
const GHOST_API_KEY = "0fe6e78d497ebf77ab192d7804"

// Přejmenujeme na _api nebo odstraníme, pokud není potřeba
// const _api = new GhostContentAPI({
//   url: GHOST_API_URL,
//   key: GHOST_API_KEY,
//   version: "v5.0",
//   makeRequest: ({ url, method, params, headers }: MakeRequestOptions) => {
//     const apiUrl = new URL(url);
//     Object.keys(params).forEach((key) =>
//       apiUrl.searchParams.set(key, encodeURIComponent(params[key]))
//     );
//     return fetch(apiUrl, { method, headers }).then((res) => res.json());
//   },
// })

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
    const response = await fetch(
      `${GHOST_API_URL}/posts/?key=${GHOST_API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json() as GhostPostsResponse;
    return data.posts;
  } catch (error) {
    console.error("Chyba při načítání příspěvků:", error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<GhostPost | null> {
  try {
    const res = await fetch(
      `${GHOST_API_URL}/posts/slug/${slug}/?key=${GHOST_API_KEY}&include=tags,authors`
    )
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const json = await res.json() as GhostPostsResponse;
    if (!json.posts || json.posts.length === 0) {
      console.error("Žádný příspěvek nenalezen pro slug:", slug);
      return null;
    }
    return json.posts[0];
  } catch (error) {
    console.error("Chyba při načítání příspěvku:", error);
    return null;
  }
}

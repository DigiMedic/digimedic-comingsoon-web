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

const api = new GhostContentAPI({
  url: GHOST_API_URL,
  key: GHOST_API_KEY,
  version: "v5.0",
  makeRequest: ({ url, method, params, headers }: MakeRequestOptions) => {
    const apiUrl = new URL(url);
    Object.keys(params).forEach((key) =>
      apiUrl.searchParams.set(key, encodeURIComponent(params[key]))
    );
    return fetch(apiUrl, { method, headers }).then((res) => res.json());
  },
})

export async function getPosts() {
  const res = await fetch(
    `${GHOST_API_URL}/posts/?key=${GHOST_API_KEY}&include=tags,authors`
  )
  const json = await res.json()
  return json.posts
}

export async function getPostBySlug(slug: string) {
  try {
  const res = await fetch(
    `${GHOST_API_URL}/posts/slug/${slug}/?key=${GHOST_API_KEY}&include=tags,authors`
  )
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
}
    const json = await res.json()
    if (!json.posts || json.posts.length === 0) {
      console.error("Žádný příspěvek nenalezen pro slug:", slug);
      return null;
    }
    return json.posts[0]
  } catch (error) {
    console.error("Chyba při načítání příspěvku:", error);
    return null;
  }
}

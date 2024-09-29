import GhostContentAPI from "@tryghost/content-api"

const GHOST_API_URL = process.env.GHOST_API_URL || ""
const GHOST_API_KEY = process.env.GHOST_CONTENT_API_KEY || ""

const api = new GhostContentAPI({
  url: GHOST_API_URL,
  key: GHOST_API_KEY,
  version: "v5.0",
  makeRequest: ({ url, method, params, headers }) => {
    const apiUrl = new URL(url)
    Object.keys(params).forEach((key) =>
      apiUrl.searchParams.set(key, encodeURIComponent(params[key]))
    )
    return fetch(apiUrl, { method, headers }).then((res) => res.json())
  },
})

export async function getPosts() {
  const res = await fetch(
    `${GHOST_API_URL}/posts/?key=${GHOST_API_KEY}&include=tags,authors`
  )
  const json = await res.json()
  return json.posts
}

export const getSinglePost = async (postSlug: string) => {
  return await api.posts
    .read({ slug: postSlug }, { include: ["tags", "authors"] })
    .catch((err: Error) => {
      console.error(err)
      return null
    })
}

export const getTags = async () => {
  return await api.tags.browse({ limit: "all" }).catch((err: Error) => {
    console.error(err)
    return []
  })
}

export const getAuthors = async () => {
  return await api.authors.browse({ limit: "all" }).catch((err: Error) => {
    console.error(err)
    return []
  })
}

export async function getPostBySlug(slug: string) {
  const res = await fetch(
    `${GHOST_API_URL}/posts/slug/${slug}/?key=${GHOST_API_KEY}&include=tags,authors`
  )
  const json = await res.json()
  return json.posts[0]
}

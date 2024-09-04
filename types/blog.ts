import { Author, PostOrPage, PostsOrPages, Tag } from "@tryghost/content-api"

export interface BlogPost extends PostOrPage {
  // Přidejte další vlastnosti, pokud jsou potřeba
}

export interface BlogTag extends Tag {
  // Přidejte další vlastnosti, pokud jsou potřeba
}

export interface BlogAuthor extends Author {
  // Přidejte další vlastnosti, pokud jsou potřeba
}

export type BlogPosts = PostsOrPages

export interface PostsResponse {
  posts: BlogPost[]
  meta: {
    pagination: {
      page: number
      limit: number
      pages: number
      total: number
      next: number | null
      prev: number | null
    }
  }
}

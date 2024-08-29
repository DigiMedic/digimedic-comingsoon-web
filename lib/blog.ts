import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'content/posts')

export function getBlogPosts() {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.mdx?$/, '')
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)

    return {
      slug,
      title: matterResult.data.title,
      date: matterResult.data.date,
      excerpt: matterResult.data.description,
      tags: matterResult.data.tags || [],
      coverImage: matterResult.data.coverImage || null,
    }
  })

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export async function getBlogPost(slug: string) {
  console.log(`Attempting to get blog post with slug: ${slug}`)
  
  // Decode the URL-encoded slug
  const decodedSlug = decodeURIComponent(slug)
  console.log(`Decoded slug: ${decodedSlug}`)

  let fullPath = path.join(postsDirectory, `${decodedSlug}.mdx`)
  console.log(`Trying path with .mdx: ${fullPath}`)
  
  if (!fs.existsSync(fullPath)) {
    console.log(`File not found with .mdx extension, trying without extension`)
    fullPath = path.join(postsDirectory, decodedSlug)
    console.log(`Trying path without extension: ${fullPath}`)
    if (!fs.existsSync(fullPath)) {
      console.log(`File not found without extension`)
      throw new Error(`Post not found: ${decodedSlug}`)
    }
  }

  console.log(`File found at: ${fullPath}`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    slug: decodedSlug,
    title: data.title,
    date: data.date,
    excerpt: data.description,
    tags: data.tags || [],
    content: content,
    coverImage: data.coverImage || null,
  }
}
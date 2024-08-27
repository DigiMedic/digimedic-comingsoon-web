import Link from 'next/link'
import { getBlogPosts } from '@/lib/blog'
import { BlogPost } from '@/types/blog'

export default async function BlogPage() {
  const posts = await getBlogPosts()
  console.log('Načtené příspěvky v komponentě:', posts) // Pro debugování

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Blog DigiMedic</h1>
      {posts.length === 0 ? (
        <p>Žádné články k zobrazení.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post: BlogPost) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="block">
              <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-500 text-sm mb-2">{new Date(post.date).toLocaleDateString('cs-CZ')}</p>
                <p className="text-gray-600 mb-2">{post.excerpt}</p>
                <span className="text-blumine">Číst více →</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
import Link from 'next/link';
import Image from 'next/image';
import { GhostPost } from '@/lib/ghost';

export default function BlogPostCard({ post }: { post: GhostPost }) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <div>
        {post.feature_image && (
          <Image src={post.feature_image} alt={post.title} width={300} height={200} />
        )}
        <h2>{post.title}</h2>
        <p>{post.excerpt}</p>
      </div>
    </Link>
  );
}

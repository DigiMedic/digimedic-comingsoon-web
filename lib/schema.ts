import { GhostPost } from '@/types/blog';

export function generateArticleSchema(post: GhostPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt || post.custom_excerpt,
    image: post.feature_image ? [post.feature_image] : [],
    datePublished: post.published_at,
    dateModified: post.updated_at,
    author: post.primary_author ? {
      '@type': 'Person',
      name: post.primary_author.name,
    } : undefined,
    publisher: {
      '@type': 'Organization',
      name: 'DigiMedic',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.digimedic.cz/logo.png'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.digimedic.cz/blog/posts/${post.slug}`
    }
  };
}

export function generateBlogSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'DigiMedic Blog',
    description: 'Nejnovější články a novinky ze světa digitálního zdravotnictví',
    url: 'https://www.digimedic.cz/blog',
    publisher: {
      '@type': 'Organization',
      name: 'DigiMedic',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.digimedic.cz/logo.png'
      }
    }
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

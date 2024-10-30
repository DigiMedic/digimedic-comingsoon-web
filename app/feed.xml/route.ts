import { getPosts } from '@/lib/ghost';
import { formatDate } from '@/lib/utils';

export async function GET() {
  const posts = await getPosts();
  const feed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>DigiMedic Blog</title>
    <link>https://www.digimedic.cz</link>
    <description>Nejnovější články a novinky ze světa digitálního zdravotnictví</description>
    <language>cs</language>
    <lastBuildDate>${formatDate(new Date())}</lastBuildDate>
    ${posts
      .map(
        (post) => `
      <item>
        <title><![CDATA[${post.title}]]></title>
        <link>https://www.digimedic.cz/blog/posts/${post.slug}</link>
        <pubDate>${new Date(post.published_at).toUTCString()}</pubDate>
        <guid>https://www.digimedic.cz/blog/posts/${post.slug}</guid>
        <description><![CDATA[${post.excerpt || post.custom_excerpt || ''}]]></description>
        <content:encoded><![CDATA[${post.html}]]></content:encoded>
      </item>
    `
      )
      .join('')}
  </channel>
</rss>`;

  return new Response(feed, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}

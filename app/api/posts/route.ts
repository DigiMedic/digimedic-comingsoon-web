import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { getAllPosts } from '@/lib/posts';

export async function POST(request: Request) {
  const { title, slug, description, tags, publishDate, coverImage, content } = await request.json();
  const date = publishDate || new Date().toISOString();

  const frontmatter = {
    title,
    date,
    slug,
    description,
    tags,
    coverImage,
  };

  const markdown = matter.stringify(content, frontmatter);
  const filePath = path.join(process.cwd(), 'content/posts', `${slug}.mdx`);
  fs.writeFileSync(filePath, markdown);

  return NextResponse.json({ success: true });
}

export async function GET() {
  const posts = await getAllPosts();
  return NextResponse.json(posts);
}
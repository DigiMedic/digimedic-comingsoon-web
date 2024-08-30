import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content/posts');

interface PostData {
  title: string;
  slug: string;
  description: string;
  tags: string[];
  publishDate: string;
  coverImage: string;
  content: string;
}

export async function savePost({ title, slug, description, tags, publishDate, coverImage, content }: PostData) {
  const response = await fetch('/api/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, slug, description, tags, publishDate, coverImage, content }),
  });
  await response.json();
  const filePath = path.join(postsDirectory, `${slug}.mdx`);
  return filePath;
}

export async function getAllPosts() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    return {
      slug,
      ...matterResult.data,
    };
  });

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}
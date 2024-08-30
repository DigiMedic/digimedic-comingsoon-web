'use client';

import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { savePost } from '@/lib/posts';
import { useDebouncedCallback } from 'use-debounce';
import {
  EditorContent,
  useEditor
} from 'novel';
import StarterKit from '@tiptap/starter-kit';

const NovelEditor = dynamic(() => Promise.resolve(({ defaultValue, onUpdate }: { defaultValue: string; onUpdate: (content: string) => void }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: defaultValue,
    editorProps: {
      attributes: {
        class: 'prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full',
      },
    },
    onUpdate: ({ editor }) => {
      onUpdate(editor.getHTML());
    },
    editable: true,
    onCreate: ({ editor }) => {
      if (typeof window !== "undefined") {
        // Set the initial content once the editor is created
        editor.commands.setContent(defaultValue);
      }
    },
    immediatelyRender: false,
  });

  if (!editor) {
    return null;
  }

  return <EditorContent editor={editor} className="min-h-[500px] w-full max-w-screen-lg" />;
}), { ssr: false });

export default function CreatePostPage() {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [tags, setTags] = React.useState('');
  const [publishDate, setPublishDate] = React.useState('');
  const [coverImage, setCoverImage] = React.useState('');
  const [content, setContent] = React.useState('');

  const debouncedSetContent = useDebouncedCallback(
    (html: string) => setContent(html),
    500
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const slug = title.toLowerCase().replace(/\s+/g, '-');
    await savePost({ title, slug, description, tags: tags.split(',').map(tag => tag.trim()), publishDate, coverImage, content });
    window.location.href = '/admin/posts';
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Vytvořit nový článek</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Titulek
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Popis
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            rows={3}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
            Tagy (oddělené čárkou)
          </label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="publishDate" className="block text-sm font-medium text-gray-700">
            Datum publikace
          </label>
          <input
            type="date"
            id="publishDate"
            value={publishDate}
            onChange={(e) => setPublishDate(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700">
            URL obrázku na obálku
          </label>
          <input
            type="url"
            id="coverImage"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Obsah článku
          </label>
          <NovelEditor
            defaultValue={content}
            onUpdate={debouncedSetContent}
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Publikovat
        </button>
      </form>
      <Link href="/admin" className="mt-4 inline-block text-blue-500 hover:underline">
        Zpět na admin
      </Link>
    </div>
  );
}
// components/TableOfContents.tsx
import React from 'react';

interface TableOfContentsProps {
  content: string;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ content }) => {
  // Jednoduchá implementace - v reálném použití byste chtěli použít parser pro HTML
  const headings = content.match(/<h[2-3][^>]*>(.*?)<\/h[2-3]>/g) || [];
  const toc = headings.map((heading) => {
    const text = heading.replace(/<[^>]+>/g, '');
    const level = heading.startsWith('<h2') ? 2 : 3;
    return { text, level };
  });

  return (
    <nav className="toc mb-8 p-4 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-bold mb-2">Obsah</h2>
      <ul>
        {toc.map((item, index) => (
          <li key={index} className={`ml-${(item.level - 2) * 4} my-1`}>
            <a href={`#${item.text.toLowerCase().replace(/\s+/g, '-')}`} className="text-blue-600 hover:underline">
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;
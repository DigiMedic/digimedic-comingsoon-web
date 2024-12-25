"use client"

import React from "react"

interface TableOfContentsProps {
  content: string
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ content }) => {
  // Jednoduchá implementace - v reálném použití byste chtěli použít parser pro HTML
  const headings = content.match(/<h[2-3][^>]*>(.*?)<\/h[2-3]>/g) || []
  const toc = headings.map((heading) => {
    const text = heading.replace(/<[^>]+>/g, "")
    const level = heading.startsWith("<h2") ? 2 : 3
    return { text, level }
  })

  return (
    <nav className="mb-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-space font-bold mb-4 text-blumine">Obsah</h2>
      <ul className="space-y-2">
        {toc.map((item, index) => (
          <li key={index} className={`${item.level === 2 ? "ml-0" : "ml-4"}`}>
            <a
              href={`#${item.text.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-fountain-blue hover:text-blumine transition-colors duration-200"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default TableOfContents

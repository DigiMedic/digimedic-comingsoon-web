import React from "react"

interface TabsProps {
  items: string[]
  children: React.ReactNode
}

export const Tabs: React.FC<TabsProps> = ({ items, children }) => {
  return (
    <div className="mb-4">
      <div className="flex border-b">
        {items.map((item, index) => (
          <button
            key={index}
            className="border-b-2 border-transparent px-4 py-2 hover:border-blue-500"
          >
            {item}
          </button>
        ))}
      </div>
      <div className="mt-4">{children}</div>
    </div>
  )
}

export const Tab: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div>{children}</div>
}

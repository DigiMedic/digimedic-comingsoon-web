import React from "react"

const SkeletonLoader: React.FC = () => (
  <div className="animate-pulse">
    <div className="mb-8 h-64 rounded-lg bg-gray-300"></div>
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="h-64 rounded-lg bg-gray-300"></div>
      ))}
    </div>
  </div>
)

export default SkeletonLoader

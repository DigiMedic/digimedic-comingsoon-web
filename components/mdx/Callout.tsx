import React from "react"

interface CalloutProps {
  type?: "info" | "warning"
  children: React.ReactNode
}

const Callout: React.FC<CalloutProps> = ({ type = "info", children }) => {
  const bgColor = type === "info" ? "bg-blue-100" : "bg-yellow-100"
  const textColor = type === "info" ? "text-blue-800" : "text-yellow-800"

  return (
    <div className={`my-4 rounded-lg p-4 ${bgColor} ${textColor}`}>
      {children}
    </div>
  )
}

export default Callout

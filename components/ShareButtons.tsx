"use client"

import React from "react"
import { Facebook, Linkedin, Twitter } from "lucide-react"

interface ShareButtonsProps {
  url: string
  title: string
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ url, title }) => {
  const shareOnFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      "_blank"
    )
  }

  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      "_blank"
    )
  }

  const shareOnLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
      "_blank"
    )
  }

  return (
    <div className="flex justify-center gap-6">
      <button
        className="hover:text-blumine-dark text-blumine transition-colors"
        onClick={shareOnFacebook}
      >
        <Facebook size={28} />
      </button>
      <button
        className="hover:text-blumine-dark text-blumine transition-colors"
        onClick={shareOnTwitter}
      >
        <Twitter size={28} />
      </button>
      <button
        className="hover:text-blumine-dark text-blumine transition-colors"
        onClick={shareOnLinkedIn}
      >
        <Linkedin size={28} />
      </button>
    </div>
  )
}

export default ShareButtons

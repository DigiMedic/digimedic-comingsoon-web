"use client";

import React, { useState } from "react"
import { ContactModal } from 'components/ContactModal'
import { createPortal } from "react-dom"

interface ContactButtonProps {
  className?: string;
  href: string;
}

export const ContactButton: React.FC<ContactButtonProps> = ({ className = "", href = "#" }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsModalOpen(true)
  }

  return (
    <>
      <a
        href={href}
        onClick={openModal}
        className={`relative inline-flex h-12 overflow-hidden rounded-full p-px pointer-events-auto focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blumine focus:ring-offset-white ${className}`}
      >
        <span className="absolute inset-[-1000%] pointer-events-none animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E7F5F8_0%,#1B4D6A_50%,#E7F5F8_100%)]" />
        <span className="inline-flex items-center justify-center rounded-full bg-white px-3 py-1 text-sm font-medium text-blumine backdrop-blur-3xl cursor-pointer pointer-events-none size-full">
          Kontakt
          <svg
            className="ml-2 size-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </span>
      </a>
      {isModalOpen && createPortal(
        <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />,
        document.body
      )}
    </>
  )
}

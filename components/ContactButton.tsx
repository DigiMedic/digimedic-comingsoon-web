"use client";

import React, { useState } from "react"
import { ContactModal } from "./ContactModal"

interface ContactButtonProps {
  className?: string
}

export const ContactButton: React.FC<ContactButtonProps> = ({ className = "" }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsModalOpen(true)
  }

  return (
    <>
      <button
        onClick={openModal}
        className={`relative inline-flex h-12 overflow-hidden rounded-full p-px focus:outline-none focus:ring-2 focus:ring-blumine focus:ring-offset-2 focus:ring-offset-white ${className}`}
      >
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E7F5F8_0%,#1B4D6A_50%,#E7F5F8_100%)]" />
        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-white px-3 py-1 text-sm font-medium text-blumine backdrop-blur-3xl">
          Kontaktujte nás
          <svg
            className="ml-2 h-4 w-4"
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
      </button>
      {isModalOpen && <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
    </>
  )
}
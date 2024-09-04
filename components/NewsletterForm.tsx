"use client"

import { useState } from 'react'

export const NewsletterForm = () => {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Submitted email:', email)
    setEmail('')
  }

  return (
    <div className="w-full max-w-lg border border-gray-300 rounded-md p-3 bg-white bg-opacity-50 backdrop-filter backdrop-blur-md">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch gap-2">
        <input
          type="email"
          placeholder="Váš email pro novinky"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-grow px-3 py-2 text-base text-gray-400 placeholder-gray-400 focus:outline-none border border-gray-300 rounded-md bg-white bg-opacity-50"
        />
        <button 
          type="submit" 
          className="bg-blumine px-5 py-2 text-base font-semibold text-white transition-colors hover:bg-astral rounded-md"
        >
          Zůstaňte informováni
        </button>
      </form>
    </div>
  )
}
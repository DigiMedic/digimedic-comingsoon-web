"use client"
import { useState } from 'react'

export const NewsletterForm = () => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch('https://ghost-dso8k808400okgkc80wss8s0.digimedic.cz/members/api/send-magic-link/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          emailType: 'subscribe',
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
        setErrorMessage(data.message || 'Neznámá chyba')
      }
    } catch (error) {
      console.error('Error:', error)
      setStatus('error')
      setErrorMessage('Síťová chyba: ' + (error instanceof Error ? error.message : String(error)))
    }
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
          disabled={status === 'loading'}
        />
        <button 
          type="submit" 
          className="bg-blumine px-5 py-2 text-base font-semibold text-white transition-colors hover:bg-astral rounded-md"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Odesílání...' : 'Zůstaňte informováni'}
        </button>
      </form>
      {status === 'success' && (
        <p className="mt-2 text-green-600">Děkujeme za přihlášení k odběru novinek!</p>
      )}
      {status === 'error' && (
        <p className="mt-2 text-red-600">Došlo k chybě: {errorMessage}</p>
      )}
    </div>
  )
}
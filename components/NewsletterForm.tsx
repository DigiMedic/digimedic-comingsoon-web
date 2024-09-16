"use client";

import React, { useState } from 'react';
import { cn } from '../lib/utils';

export const NewsletterForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Úspěšně jste se přihlásili k odběru newsletteru.');
        setEmail('');
      } else {
        setMessage(data.message || 'Nastala chyba při přihlašování k odběru.');
      }
    } catch (error) {
      console.error('Chyba při odesílání požadavku:', error);
      setMessage('Nastala neočekávaná chyba. Zkuste to prosím znovu.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Váš email pro novinky"
          required
          className={cn(
            "flex-grow px-3 py-2 text-base text-foreground placeholder-muted-foreground",
            "border border-input rounded-md",
            "focus:outline-none focus:ring-2 focus:ring-blumine focus:border-transparent",
            "bg-background",
            isLoading && "opacity-50 cursor-not-allowed"
          )}
          disabled={isLoading}
        />
        <button 
          type="submit" 
          className={cn(
            "px-5 py-2 text-base font-semibold text-white",
            "bg-blumine hover:bg-astral transition-colors duration-300",
            "rounded-md",
            isLoading && "opacity-50 cursor-not-allowed"
          )}
          disabled={isLoading}
        >
          {isLoading ? 'Odesílání...' : 'Zůstaňte informováni'}
        </button>
      </form>
      {message && (
        <p className={cn(
          "mt-2 text-sm text-center",
          message.includes('Úspěšně') ? "text-green-600" : "text-red-600"
        )}>
          {message}
        </p>
      )}
    </div>
  );
};
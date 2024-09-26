"use client";

declare global {
  interface Window {
    initEmbed?: (id: string) => void;
  }
}

import React, { useEffect } from 'react';
import { cn } from '../lib/utils';

export const NewsletterForm: React.FC = () => {
  useEffect(() => {
    // Ensure the script is loaded and initialized
    const script = document.createElement('script');
    script.src = 'https://opnform.com/widgets/iframe.min.js';
    script.type = 'text/javascript';
    script.onload = () => {
      if (typeof window.initEmbed === 'function') {
        window.initEmbed('prihlaseni-k-odberu-gpt8sb');
      }
    };
    document.body.appendChild(script);

    // Cleanup script when component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="flex flex-col sm:flex-row gap-2">
        <iframe
          style={{ border: 'none', width: '100%', height: 'auto' }}
          id="prihlaseni-k-odberu-gpt8sb"
          src="https://opnform.com/forms/prihlaseni-k-odberu-gpt8sb"
          title="Newsletter Signup"
          className={cn(
            "flex-grow px-3 py-2 text-base text-foreground placeholder-muted-foreground",
            "border border-input rounded-md",
            "bg-background"
          )}
        ></iframe>
      </div>
      <div className="mt-2 text-sm text-center">
        {/* Placeholders for message display if needed */}
      </div>
    </div>
  );
};

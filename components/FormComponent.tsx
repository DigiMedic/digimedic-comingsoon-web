'use client'

import React, { useEffect, useRef } from 'react'

export default function FormComponent() {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    const script = document.createElement('script')
    script.src = "https://opnform.com/widgets/iframe.min.js"
    script.onload = () => {
      if (window.initEmbed) {
        window.initEmbed('prihlaseni-k-odberu-gpt8sb')
      }
    }
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <section id="newsletter" aria-label="Newsletter" className="py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden bg-gray-50 dark:bg-gray-900 py-12 px-6 sm:px-12 lg:p-20 rounded-3xl shadow-xl">
          <div className="relative z-10">
            <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-none">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                Zůstaňte informováni
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                Získávejte aktualizace o všech našich událostech a buďte první, kdo se dozví o nových článcích a projektech.
              </p>
            </div>
            <div className="mt-12 lg:mt-16 grid gap-8 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Přihlaste se k odběru našeho newsletteru
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Žádný spam, pouze relevantní informace o našich projektech a událostech.
                </p>
              </div>
              <div className="flex items-center">
                <iframe 
                  ref={iframeRef}
                  style={{border: 'none', width: '100%', height: '200px'}} 
                  id="prihlaseni-k-odberu-gpt8sb" 
                  src="https://opnform.com/forms/prihlaseni-k-odberu-gpt8sb"
                />
              </div>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800 opacity-50"></div>
        </div>
      </div>
    </section>
  )
}
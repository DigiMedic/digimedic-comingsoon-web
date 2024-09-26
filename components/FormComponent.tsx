'use client'

import React, { useRef } from 'react'

export default function FormComponent() {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg overflow-hidden shadow-lg" style={{ height: 'auto' }}>
      <div className="bg-blumine text-white p-6 text-center">
        <h2 className="font-space text-2xl font-bold mb-2 tracking-wide">
          Zůstaňte informovaní
        </h2>
        <p className="font-raleway text-base text-powder-blue leading-relaxed">
          Přihlaste se k odběru našeho newsletteru a buďte v obraze o nejnovějších trendech v digitálním zdravotnictví
        </p>
      </div>
      <div className="bg-polar p-4" style={{ height: 'auto' }}>
        <iframe
          ref={iframeRef}
          src="https://opnform.com/forms/prihlaseni-k-odberu-gpt8sb"
          className="w-full h-auto border-none bg-transparent"
          style={{ overflow: 'hidden' }}
        />
      </div>
    </div>
  )
}
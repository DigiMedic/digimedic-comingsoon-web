'use client';

import React, { useState } from 'react';
import Container from './Container';
import { motion } from 'framer-motion';

export default function FormComponent() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Zde by byla implementace odeslání emailu na backend
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulace API volání
      setIsSuccess(true);
      setEmail('');
    } catch (err) {
      setError('Došlo k chybě při odesílání. Zkuste to prosím později.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-blumine py-16">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold text-polar mb-4 font-raleway">
            Zůstaňte v obraze
          </h2>
          <p className="text-lg text-powder-blue mb-8 font-space">
            Přihlaste se k odběru novinek a buďte první, kdo se dozví o nových článcích
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Váš email"
                required
                className="px-6 py-3 rounded-full bg-polar text-blumine placeholder-astral font-raleway flex-grow max-w-md"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 rounded-full bg-fountain-blue text-polar font-space hover:bg-blumine-dark transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Odesílám...' : 'Přihlásit k odběru'}
              </button>
            </div>

            {error && (
              <p className="text-red-400 font-space">{error}</p>
            )}

            {isSuccess && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-powder-blue font-space"
              >
                Děkujeme za přihlášení k odběru!
              </motion.p>
            )}
          </form>
        </motion.div>
      </Container>
    </section>
  );
}

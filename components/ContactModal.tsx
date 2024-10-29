"use client";

import React from 'react';
import { X, Mail, Phone, MapPin } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-blumine bg-opacity-50 p-4">
      <div className="max-w-5xl w-full overflow-hidden rounded-lg bg-white shadow-xl">
        <div className="flex flex-col lg:flex-row">
          {/* Kontaktní karta */}
          <div className="w-full lg:w-2/5 bg-polar p-8 space-y-6">
            <div className="flex justify-center mb-6">
              <img
                src="https://utfs.io/f/NyKlEsePJFL1eCsi9ZEzl3DpVAEL2Wqayfw71FktP6uBYThO"
                alt="DigiMedic Logo"
                className="h-auto w-48 object-contain"
              />
            </div>
            <h2 className="mb-4 text-2xl font-space font-bold text-blumine text-center">Kontaktní údaje</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="flex-shrink-0 text-astral" size={24} />
                <div>
                  <p className="font-semibold text-blumine">E-mail</p>
                  <a href="mailto:info@digimedic.cz" className="text-fountain-blue hover:underline">info@digimedic.cz</a>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="flex-shrink-0 text-astral" size={24} />
                <div>
                  <p className="font-semibold text-blumine">Telefon</p>
                  <a href="tel:+420774517607" className="text-fountain-blue hover:underline">+420 774 517 607</a>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="flex-shrink-0 text-astral" size={24} />
                <div>
                  <p className="font-semibold text-blumine">Adresa</p>
                  <p className="text-gray-600">Spáčilova 582/21, 618 00 Brno-Černovice</p>
                </div>
              </div>
            </div>
          </div>

          {/* Formulář */}
          <div className="relative w-full lg:w-3/5 p-8 bg-white">
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
              <X className="h-6 w-6" />
            </button>
            <h2 className="mb-4 text-3xl font-space font-bold text-blumine">Kontaktujte nás</h2>
            <p className="mb-6 text-gray-600">Vyplňte formulář níže a my se vám ozveme co nejdříve.</p>
            <iframe 
              style={{ border: "none", width: "100%", height: "450px" }} 
              id="kontaktujte-nas-ypx9oh-1" 
              src="https://opnform.com/forms/kontaktujte-nas-ypx9oh-1"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

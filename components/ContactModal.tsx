"use client";

import React, { useState, useTransition } from "react";
import { ChevronRight, Loader2, X } from "lucide-react";

// Zástupná funkce pro saySomething
const saySomething = async (data: any) => {
  // Simulace asynchronní operace
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log('Odeslaná data:', data);
  // Zde by normálně byla logika pro odeslání dat na server
  return Promise.resolve();
};

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [pending, startTransition] = useTransition();

  const [forms, setForms] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForms({ ...forms, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        await saySomething(forms);
        alert("Vaše zpráva byla úspěšně odeslána. Ozveme se vám co nejdříve.");
        setForms({
          firstName: "",
          lastName: "",
          email: "",
          message: ""
        });
        onClose();
      } catch (error) {
        alert("Při odesílání zprávy došlo k chybě. Zkuste to prosím později.");
      }
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4">
        <button onClick={onClose} className="absolute top-4 right-4">
          <X className="h-6 w-6" />
        </button>
        <h2 className="text-2xl font-bold mb-4">Kontaktujte nás</h2>
        <p className="mb-6">Vyplňte formulář níže a my se vám ozveme co nejdříve.</p>
        <form className="space-y-4" onSubmit={onSubmit}>
          {/* Zbytek formuláře zůstává stejný */}
        </form>
      </div>
    </div>
  );
}
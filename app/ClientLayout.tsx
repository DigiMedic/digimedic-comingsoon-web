"use client";

import { useState } from "react";
import { DigiMedicNavigation } from "@/components/navbar-menu";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  return (
    <>
      <DigiMedicNavigation />
      {children}
    </>
  );
}

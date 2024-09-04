import React from "react";
import { Cover } from "@/components/ui/cover";

export function DigiMedicCoverTitle() {
  return (
    <div>
      <h1 className="text-4xl md:text-4xl lg:text-6xl font-semibold max-w-7xl mx-auto text-center mt-6 relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-blumine via-fountain-blue to-fountain-blue dark:from-blumine dark:via-white dark:to-white">
        <Cover>Digitální páteř</Cover> pro české zdravotnictví
      </h1>
    </div>
  );
}
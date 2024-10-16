import React from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-8 sm:py-12 md:py-16"> {/* Zvětšený padding */}
        {/* Obsah headeru */}
      </header>
      <main className="flex-grow">
        {children}
      </main>
      <footer>
        {/* Obsah footeru */}
      </footer>
    </div>
  );
};

export default Layout;

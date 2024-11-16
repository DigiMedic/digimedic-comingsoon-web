import React from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-4 sm:py-6 md:py-8 lg:py-12">
        {/* Header content */}
      </header>

      <main className="flex-grow px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>

      <footer className="py-8 sm:py-12 md:py-16">
        {/* Footer content */}
      </footer>
    </div>
  );
};

export default Layout;

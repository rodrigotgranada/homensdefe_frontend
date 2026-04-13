import React from 'react';

export const Navbar = () => {
  return (
    <nav className="bg-dark-surface border-b border-dark-border h-16 flex items-center justify-between px-6 sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold bg-gradient-to-r from-brand-500 to-brand-100 bg-clip-text text-transparent">
          Homens de Fé
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 rounded-full bg-brand-500 flex items-center justify-center text-white text-sm font-medium">
          A
        </div>
      </div>
    </nav>
  );
};

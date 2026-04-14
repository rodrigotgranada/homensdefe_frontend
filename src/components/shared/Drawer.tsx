import React, { useEffect, useState } from 'react';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, title, children }) => {
  const [isRendered, setIsRendered] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      document.body.style.overflow = 'hidden';
    } else {
      setTimeout(() => setIsRendered(false), 300);
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  if (!isRendered) return null;

  return (
    <>
      {/* Overlay Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />
      
      {/* Drawer Panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-dark-surface border-l border-dark-border z-[101] flex flex-col shadow-2xl transition-transform duration-300 transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-dark-border">
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-dark-border text-slate-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>
        <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
          {children}
        </div>
      </div>
    </>
  );
};

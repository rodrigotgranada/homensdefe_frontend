import React from 'react';

export const Sidebar = () => {
  const menus = [
    { name: 'Dashboard', icon: '📊', active: true },
    { name: 'Eventos', icon: '📅', active: false },
    { name: 'Inscritos', icon: '👥', active: false },
    { name: 'Cidades', icon: '🏙️', active: false },
  ];

  return (
    <aside className="w-64 bg-dark-surface border-r border-dark-border h-[calc(100vh-4rem)] p-4 flex flex-col gap-2">
      {menus.map((menu) => (
        <button
          key={menu.name}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
            menu.active 
              ? 'bg-brand-500/10 text-brand-500 cursor-default'
              : 'text-slate-400 hover:text-slate-200 hover:bg-dark-border/50'
          }`}
        >
          <span>{menu.icon}</span>
          {menu.name}
        </button>
      ))}
    </aside>
  );
};

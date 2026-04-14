import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface City { _id: string; nome: string; slug: string; uf: string; }

export const Navbar = () => {
  const { user, token, logout } = useAuth();
  const [myCity, setMyCity] = useState<City | null>(null);

  useEffect(() => {
    if (user?.role === 'LOCAL_ADM' && token) {
      fetch(`${import.meta.env.VITE_API_BASE_URL}/cities/my-city`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(r => r.json())
        .then(data => setMyCity(data))
        .catch(() => {});
    }
  }, [user, token]);

  return (
    <nav className="bg-dark-surface border-b border-dark-border h-16 flex items-center justify-between px-6 sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <div className="flex flex-col">
          <h1 className="text-xl font-bold bg-gradient-to-r from-brand-500 to-brand-100 bg-clip-text text-transparent leading-none">
            Painel Admin
          </h1>
          {user?.role === 'LOCAL_ADM' && myCity && (
            <span className="text-[10px] text-brand-500 font-bold uppercase tracking-wider mt-1">
              📍 {myCity.nome} - {myCity.uf}
            </span>
          )}
          {user?.role === 'SUPER_ADM' && (
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1">
              🌍 Administração Global
            </span>
          )}
        </div>
        
        <Link
          to="/"
          className="hidden sm:flex items-center gap-1 text-xs text-slate-500 hover:text-slate-300 transition-colors bg-dark-border px-3 py-1.5 rounded-lg ml-2"
        >
          ← Voltar ao Site
        </Link>
      </div>

      <div className="flex items-center gap-3">
        {user && (
          <>
            <div className="flex flex-col items-end mr-2">
              <span className="text-sm text-slate-200 font-medium leading-none">
                {user.nome}
              </span>
              <span className="text-[10px] text-slate-500 font-medium mt-1">
                {user.role}
              </span>
            </div>
            <div className="w-9 h-9 rounded-full bg-brand-600 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-brand-600/20 border border-brand-400/20">
              {user.nome[0].toUpperCase()}
            </div>
            <button
              onClick={logout}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-400/10 transition-all ml-1"
              title="Sair"
            >
              <span className="text-lg">🚪</span>
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

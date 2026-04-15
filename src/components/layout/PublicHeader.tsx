import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface City {
  _id: string;
  nome: string;
  uf: string;
  slug: string;
}

// List of known global route prefixes that are NOT city slugs
const GLOBAL_ROUTES = ['noticias', 'quemsomos', 'admin', 'eventos'];

const NavDrawer = ({
  isOpen,
  onClose,
  cities,
  activeSlug,
}: {
  isOpen: boolean;
  onClose: () => void;
  cities: City[];
  activeSlug: string | null;
}) => {
  const navigate = useNavigate();
  const [rendered, setRendered] = useState(isOpen);

  useEffect(() => {
    if (isOpen) setRendered(true);
    else setTimeout(() => setRendered(false), 300);
  }, [isOpen]);

  if (!rendered) return null;

  const handleCitySelect = (slug: string) => {
    if (slug) navigate(`/${slug}`);
  };

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
      />

      {/* Drawer */}
      <div className={`fixed top-0 left-0 h-full w-72 bg-dark-surface border-r border-dark-border z-[101] flex flex-col shadow-2xl transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-dark-border">
          <span className="font-bold text-white">Menu</span>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-dark-border transition-colors">✕</button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
          {/* Global Links */}
          <p className="text-xs text-slate-600 uppercase tracking-widest mb-3 px-3">Nacional</p>
          <Link to="/noticias" onClick={onClose} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-dark-border transition-colors">
            📰 Notícias
          </Link>
          <Link to="/quemsomos" onClick={onClose} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-dark-border transition-colors">
            🙏 Quem Somos
          </Link>

          {/* Divider + City Select */}
          <div className="pt-6 pb-2">
            <p className="text-xs text-slate-600 uppercase tracking-widest mb-3 px-3">Sua Cidade</p>
            <select
              value={activeSlug || ''}
              onChange={(e) => handleCitySelect(e.target.value)}
              className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-500 transition-colors"
            >
              <option value="">Selecione uma cidade...</option>
              {cities.map(city => (
                <option key={city._id} value={city.slug}>{city.nome} - {city.uf}</option>
              ))}
            </select>
          </div>

          {/* City-specific links — visible only when a city is active */}
          {activeSlug && (
            <div className="space-y-1 pt-2">
              <p className="text-xs text-brand-500 uppercase tracking-widest mb-3 px-3">
                {cities.find(c => c.slug === activeSlug)?.nome || activeSlug}
              </p>
              <Link to={`/${activeSlug}`} onClick={onClose} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-dark-border transition-colors">
                🏠 Início da Cidade
              </Link>
              <Link to={`/${activeSlug}/noticias`} onClick={onClose} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-dark-border transition-colors">
                📰 Notícias Locais
              </Link>
              <Link to={`/${activeSlug}/eventos`} onClick={onClose} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-dark-border transition-colors">
                📅 Eventos
              </Link>
              <Link to={`/${activeSlug}/quemsomos`} onClick={onClose} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-dark-border transition-colors">
                🙏 Quem Somos Local
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export const PublicHeader = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [cities, setCities] = useState<City[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Detect if there's an active city from the URL
  const pathParts = location.pathname.split('/').filter(Boolean);
  const firstSegment = pathParts[0];
  const activeSlug = firstSegment && !GLOBAL_ROUTES.includes(firstSegment) ? firstSegment : null;

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/cities`)
      .then(r => r.json())
      .then(setCities)
      .catch(() => {});
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-dark-bg/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          {/* Left: Hamburger + Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setDrawerOpen(true)}
              className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-dark-border transition-colors"
              aria-label="Menu"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <rect y="3" width="20" height="2" rx="1"/>
                <rect y="9" width="20" height="2" rx="1"/>
                <rect y="15" width="20" height="2" rx="1"/>
              </svg>
            </button>
            <Link to="/" className="text-lg font-extrabold bg-gradient-to-r from-white to-brand-400 bg-clip-text text-transparent whitespace-nowrap">
              Homens de Fé
            </Link>

            {/* Active city breadcrumb pill */}
            {activeSlug && (
              <span className="hidden sm:flex items-center gap-1 px-3 py-1 bg-brand-500/15 border border-brand-500/30 text-brand-400 text-xs rounded-full">
                📍 {cities.find(c => c.slug === activeSlug)?.nome || activeSlug}
              </span>
            )}
          </div>

          {/* Right: Auth */}
          <div className="flex items-center gap-2">
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(v => !v)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-dark-surface rounded-xl border border-dark-border hover:border-brand-500/50 transition-colors"
                >
                  {/* Avatar */}
                  <div className="w-7 h-7 rounded-full bg-brand-600 flex items-center justify-center text-white text-xs font-bold overflow-hidden">
                    {user.nome[0].toUpperCase()}
                  </div>
                  <span className="text-sm text-slate-300 hidden sm:block max-w-[100px] truncate">{user.nome}</span>
                  <span className="text-slate-500 text-xs">▾</span>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-dark-surface border border-dark-border rounded-xl shadow-2xl overflow-hidden z-[200]">
                    <div className="px-4 py-3 border-b border-dark-border">
                      <p className="text-sm font-medium text-white truncate">{user.nome} {user.sobrenome}</p>
                      <p className="text-xs text-brand-500">{user.role}</p>
                    </div>
                    <Link to="/admin" onClick={() => setDropdownOpen(false)} className="flex items-center gap-2 px-4 py-3 text-sm text-slate-300 hover:bg-dark-border hover:text-white transition-colors">
                      📊 Painel Admin
                    </Link>
                    <button
                      onClick={() => { logout(); setDropdownOpen(false); }}
                      className="w-full text-left flex items-center gap-2 px-4 py-3 text-sm text-red-400 hover:bg-dark-border transition-colors"
                    >
                      🚪 Sair
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/admin/login"
                className="px-5 py-2 bg-brand-600 hover:bg-brand-500 text-white rounded-lg text-sm font-medium transition-all shadow-[0_0_12px_rgba(37,99,235,0.3)]"
              >
                Entrar
              </Link>
            )}
          </div>
        </div>
      </header>

      <NavDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        cities={cities}
        activeSlug={activeSlug}
      />
    </>
  );
};


import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface City { _id: string; nome: string; slug: string; uf: string; }

export const Sidebar = () => {
  const { user, token } = useAuth();
  const location = useLocation();
  const [myCity, setMyCity] = useState<City | null>(null);

  const isSuperAdm = user?.role === 'SUPER_ADM';
  const isLocalAdm = user?.role === 'LOCAL_ADM';

  useEffect(() => {
    if (isLocalAdm && token) {
      fetch(`${import.meta.env.VITE_API_BASE_URL}/cities/my-city`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(r => r.json())
        .then(data => setMyCity(data))
        .catch(() => {});
    }
  }, [isLocalAdm, token]);

  const isActive = (path: string) =>
    location.pathname === path ? 'bg-brand-500/10 text-brand-400 border-r-2 border-brand-500' : 'text-slate-400 hover:text-slate-200 hover:bg-dark-border/50';

  const MenuLink = ({ to, icon, label }: { to: string; icon: string; label: string }) => (
    <Link to={to} className={`flex items-center gap-3 px-4 py-2.5 rounded-l-lg text-sm font-medium transition-all ${isActive(to)}`}>
      <span>{icon}</span> {label}
    </Link>
  );

  return (
    <aside className="w-64 bg-dark-surface border-r border-dark-border min-h-[calc(100vh-4rem)] p-4 flex flex-col gap-1">
      {/* SUPER_ADM menu */}
      {isSuperAdm && (
        <>
          <p className="text-xs text-slate-600 uppercase tracking-widest px-4 py-2 mt-1">Visão Global</p>
          <MenuLink to="/admin" icon="📊" label="Dashboard" />
          <MenuLink to="/admin/cidades" icon="🏙️" label="Cidades" />
          <MenuLink to="/admin/usuarios" icon="👥" label="Usuários" />
          <MenuLink to="/admin/eventos" icon="📅" label="Todos os Eventos" />
          <MenuLink to="/admin/noticias" icon="📰" label="Todas as Notícias" />
          <MenuLink to="/admin/configuracoes" icon="⚙️" label="Configurações" />
        </>
      )}

      {/* LOCAL_ADM menu */}
      {isLocalAdm && (
        <>
          <p className="text-xs text-slate-600 uppercase tracking-widest px-4 py-2 mt-1">
            {myCity ? `${myCity.nome} - ${myCity.uf}` : 'Minha Cidade'}
          </p>
          <MenuLink to="/admin" icon="📊" label="Dashboard" />
          {myCity && (
            <>
              <MenuLink to={`/admin/cidade/${myCity.slug}/eventos`} icon="📅" label="Eventos" />
              <MenuLink to={`/admin/cidade/${myCity.slug}/noticias`} icon="📰" label="Notícias" />
              <MenuLink to={`/admin/cidade/${myCity.slug}/inscritos`} icon="👥" label="Inscritos" />
              <MenuLink to={`/admin/cidade/${myCity.slug}/configuracoes`} icon="⚙️" label="Configurações" />
            </>
          )}
          {!myCity && (
            <p className="text-xs text-slate-600 px-4 py-2 italic">Nenhuma cidade vinculada.</p>
          )}
        </>
      )}

      {/* Spacer */}
      <div className="flex-1" />

      <p className="text-xs text-slate-600 uppercase tracking-widest px-4 py-2 mt-1">Sua Conta</p>
      <MenuLink to="/admin/perfil" icon="👤" label="Meu Perfil" />

      {/* Quick link to public site */}
      {myCity && isLocalAdm && (
        <Link
          to={`/${myCity.slug}`}
          target="_blank"
          className="flex items-center gap-2 px-4 py-2.5 text-xs text-slate-600 hover:text-brand-400 transition-colors rounded-lg"
        >
          🔗 Ver site de {myCity.nome}
        </Link>
      )}
    </aside>
  );
};

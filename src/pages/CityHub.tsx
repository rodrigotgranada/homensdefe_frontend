import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

interface CityData {
  _id: string;
  nome: string;
  uf: string;
  slug: string;
  quemSomosLocal?: string;
}

export const CityHub = () => {
  const { citySlug } = useParams<{ citySlug: string }>();
  const [city, setCity] = useState<CityData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_BASE_URL}/cities/${citySlug}`)
      .then(res => res.json())
      .then(data => {
        setCity(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [citySlug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center text-white">
        <div className="animate-spin w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!city) {
    return (
      <div className="min-h-screen bg-dark-bg flex flex-col items-center justify-center text-white text-center p-6">
        <h2 className="text-3xl font-bold mb-4">Cidade não encontrada</h2>
        <p className="text-slate-400 mb-8">Não encontramos nenhum Hub local para este endereço.</p>
        <Link to="/" className="px-6 py-3 bg-brand-600 rounded-full hover:bg-brand-500 transition-colors">
          Voltar para Início
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg text-white">
      {/* City Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 px-6 border-b border-dark-border">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[600px] h-[600px] bg-brand-600/10 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="max-w-6xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-xl">
            <Link to="/" className="text-brand-500 hover:text-brand-400 text-sm font-medium mb-4 flex items-center gap-2 transition-colors">
              <span>←</span> Movimento Global
            </Link>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-4 bg-gradient-to-br from-white to-slate-400 bg-clip-text text-transparent">
              {city.nome}
              <span className="text-3xl md:text-5xl text-brand-500 ml-2">{city.uf}</span>
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              Bem-vindo ao Hub Local de {city.nome}. Fique por dentro dos próximos eventos, conecte-se com outros homens de fé e aprofunde seu caminho espiritual conosco.
            </p>
          </div>
          <div className="w-full md:w-auto flex flex-col gap-4 bg-dark-surface border border-dark-border p-6 rounded-2xl shadow-xl">
             <h3 className="text-lg font-medium text-slate-200">Próximos Encontros</h3>
             <p className="text-sm text-slate-400 mb-2">Se inscreva rapidamente para garantir sua vaga.</p>
             <button className="w-full py-4 bg-brand-600 hover:bg-brand-500 rounded-xl font-bold transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)]">
               Ver Eventos em Pelotas
             </button>
          </div>
        </div>
      </section>

      {/* City Content Configured by Local Admin */}
      <section className="py-16 px-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="col-span-1 md:col-span-2 space-y-12">
          <div>
             <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
               <span className="w-2 h-8 bg-brand-500 rounded-full block"></span>
               Nossa História Local
             </h2>
             <div className="text-slate-300 leading-loose prose prose-invert bg-dark-surface border border-dark-border p-8 rounded-2xl">
               {city.quemSomosLocal ? (
                 <p>{city.quemSomosLocal}</p>
               ) : (
                 <p className="italic text-slate-500">História ainda não definida pelo coordenador local.</p>
               )}
             </div>
          </div>
          
          <div>
             <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
               <span className="w-2 h-8 bg-brand-500 rounded-full block"></span>
               Últimas Notícias
             </h2>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
               {/* Mockup for News. Will be fetched from backend later */}
               {[1, 2].map(i => (
                 <div key={i} className="group cursor-pointer">
                   <div className="w-full h-48 bg-dark-border rounded-t-xl overflow-hidden relative">
                     <div className="absolute inset-0 bg-gradient-to-t from-dark-surface to-transparent md:group-hover:opacity-50 transition-opacity" />
                   </div>
                   <div className="bg-dark-surface border border-t-0 border-dark-border p-5 rounded-b-xl group-hover:border-brand-500/50 transition-colors">
                     <h3 className="font-bold text-lg mb-2 group-hover:text-brand-500 transition-colors">Encontro marcado para esse fim de semana</h3>
                     <p className="text-sm text-slate-400 line-clamp-2">Neste sábado nos reuniremos para um super momento de partilha...</p>
                   </div>
                 </div>
               ))}
             </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="col-span-1">
          <div className="sticky top-6 space-y-6">
            <div className="bg-dark-surface border border-dark-border rounded-xl p-6">
              <h4 className="font-bold mb-4">Liderança</h4>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-dark-border rounded-full flex items-center justify-center text-slate-500">P</div>
                <div>
                  <p className="font-medium text-slate-200">Coordenação Local</p>
                  <p className="text-sm text-brand-500">Admin</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-brand-600 to-brand-800 rounded-xl p-6 flex flex-col items-center text-center shadow-lg">
              <h4 className="font-bold text-white mb-2">Apoie o Movimento</h4>
              <p className="text-sm text-brand-100 mb-4">Ajude {city.nome} a manter a frente ativa e organizar mais encontros.</p>
              <button className="px-6 py-2 bg-white text-brand-700 font-bold rounded-full w-full hover:bg-slate-100 transition-colors">
                Fazer Doação
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

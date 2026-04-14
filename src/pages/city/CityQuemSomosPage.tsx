import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export const CityQuemSomosPage = () => {
  const { citySlug } = useParams<{ citySlug: string }>();
  const [city, setCity] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/cities/${citySlug}`)
      .then(r => r.json())
      .then(data => { setCity(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [citySlug]);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-dark-bg text-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full" />
          </div>
        ) : (
          <>
            <div className="mb-12">
              <Link to={`/${citySlug}`} className="text-brand-500 text-sm hover:text-brand-400 transition-colors flex items-center gap-2 mb-4">
                ← Voltar para {city?.nome || citySlug}
              </Link>
              <p className="text-brand-500 font-medium text-sm mb-2">{city?.nome} · {city?.uf}</p>
              <h1 className="text-4xl md:text-5xl font-extrabold">Quem Somos</h1>
            </div>

            <div className="bg-dark-surface border border-dark-border rounded-2xl p-10">
              <div className="flex items-center gap-3 mb-8">
                <span className="w-2 h-10 bg-brand-500 rounded-full block"></span>
                <h2 className="text-2xl font-bold">Nossa História em {city?.nome}</h2>
              </div>

              {city?.quemSomosLocal ? (
                <div className="prose prose-invert max-w-none text-slate-300 leading-loose text-lg">
                  <p>{city.quemSomosLocal}</p>
                </div>
              ) : (
                <p className="text-slate-500 italic">Conteúdo ainda não definido pelo coordenador local.</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

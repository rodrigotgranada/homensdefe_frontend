import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

interface NewsItem {
  _id: string;
  titulo: string;
  slug: string;
  conteudo: string;
  createdAt: string;
}

export const CityNewsPage = () => {
  const { citySlug } = useParams<{ citySlug: string }>();
  const [city, setCity] = useState<any>(null);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/cities/${citySlug}`)
      .then(r => r.json())
      .then(async (cityData) => {
        setCity(cityData);
        if (cityData?._id) {
          const newsRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/news?cityId=${cityData._id}`);
          const newsData = await newsRes.json();
          setNews(newsData);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [citySlug]);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-dark-bg text-white">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="mb-12">
          <Link to={`/${citySlug}`} className="text-brand-500 text-sm hover:text-brand-400 transition-colors flex items-center gap-2 mb-4">
            ← Voltar para {city?.nome || citySlug}
          </Link>
          <p className="text-brand-500 font-medium text-sm mb-2">{city?.nome} · {city?.uf}</p>
          <h1 className="text-4xl md:text-5xl font-extrabold">Notícias Locais</h1>
          <p className="text-slate-400 mt-3 text-lg">Acontecimentos do polo de {city?.nome}.</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full" />
          </div>
        ) : news.length === 0 ? (
          <p className="text-slate-500 text-center py-20">Nenhuma notícia local publicada ainda.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {news.map(item => (
              <Link to={`/${citySlug}/noticias/${item.slug}`} key={item._id} className="group bg-dark-surface border border-dark-border rounded-2xl overflow-hidden hover:border-brand-500/50 transition-all">
                <div className="h-48 bg-gradient-to-br from-dark-border to-dark-bg flex items-center justify-center text-slate-600 text-4xl">📰</div>
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-2 group-hover:text-brand-400 transition-colors">{item.titulo}</h2>
                  <p className="text-slate-400 text-sm line-clamp-3">{item.conteudo}</p>
                  <p className="text-xs text-slate-600 mt-4">
                    {new Date(item.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

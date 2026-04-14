import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export const NewsDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [news, setNews] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/news/${slug}`)
      .then(r => r.json())
      .then(data => { setNews(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading) return (
    <div className="min-h-[calc(100vh-4rem)] bg-dark-bg flex items-center justify-center">
      <div className="animate-spin w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full" />
    </div>
  );

  if (!news) return (
    <div className="min-h-[calc(100vh-4rem)] bg-dark-bg flex flex-col items-center justify-center text-white text-center p-6">
      <h2 className="text-2xl font-bold mb-4">Notícia não encontrada</h2>
      <Link to="/noticias" className="text-brand-500 hover:underline">← Voltar às notícias</Link>
    </div>
  );

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-dark-bg text-white">
      <article className="max-w-3xl mx-auto px-6 py-16">
        <Link to="/noticias" className="text-brand-500 text-sm hover:text-brand-400 transition-colors flex items-center gap-2 mb-8">
          ← Voltar às notícias
        </Link>

        <div className="h-64 bg-gradient-to-br from-dark-border to-dark-bg rounded-2xl flex items-center justify-center text-slate-600 text-6xl mb-10">
          📰
        </div>

        <p className="text-xs text-slate-600 mb-3">
          {new Date(news.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
        </p>
        <h1 className="text-3xl md:text-4xl font-extrabold mb-8 leading-tight">{news.titulo}</h1>

        <div className="prose prose-invert max-w-none text-slate-300 leading-loose text-lg">
          <p>{news.conteudo}</p>
        </div>
      </article>
    </div>
  );
};

import { useEffect, useState } from 'react';

export const GlobalQuemSomosPage = () => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/settings/quemSomosGeral`)
      .then(r => r.json())
      .then(data => { setContent(data?.value || ''); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-dark-bg text-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="mb-12">
          <p className="text-brand-500 font-medium text-sm mb-2">Movimento Nacional</p>
          <h1 className="text-4xl md:text-5xl font-extrabold">Quem Somos</h1>
          <p className="text-slate-400 mt-3 text-lg">Conheça a missão e visão do movimento Homens de Fé.</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full" />
          </div>
        ) : (
          <div className="bg-dark-surface border border-dark-border rounded-2xl p-10">
            <div className="flex items-center gap-3 mb-8">
              <span className="w-2 h-10 bg-brand-500 rounded-full block"></span>
              <h2 className="text-2xl font-bold">Nossa História</h2>
            </div>

            {content ? (
              <div className="prose prose-invert max-w-none text-slate-300 leading-loose text-lg">
                <p>{content}</p>
              </div>
            ) : (
              <p className="text-slate-500 italic">Conteúdo ainda não configurado.</p>
            )}

            <div className="mt-12 pt-8 border-t border-dark-border grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              {[
                { icon: '🙏', label: 'Missão', text: 'Reunir homens em torno dos valores cristãos.' },
                { icon: '👁️', label: 'Visão',  text: 'Ser referência nacional em formação espiritual masculina.' },
                { icon: '⚓', label: 'Valores', text: 'Fé, fraternidade, família e compromisso.' },
              ].map(item => (
                <div key={item.label} className="p-6 bg-dark-bg rounded-xl">
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <p className="font-bold text-white mb-2">{item.label}</p>
                  <p className="text-sm text-slate-400">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

interface Event {
  _id: string;
  titulo: string;
  descricao: string;
  data: string;
  local: string;
  limiteVagas: number;
}

export const CityEventsPage = () => {
  const { citySlug } = useParams<{ citySlug: string }>();
  const [city, setCity] = useState<any>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/cities/${citySlug}`)
      .then(r => r.json())
      .then(async (cityData) => {
        setCity(cityData);
        if (cityData?._id) {
          const evRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/events?cityId=${cityData._id}`);
          const evData = await evRes.json();
          setEvents(Array.isArray(evData) ? evData : []);
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
          <h1 className="text-4xl md:text-5xl font-extrabold">Eventos</h1>
          <p className="text-slate-400 mt-3">Próximos encontros presenciais em {city?.nome}.</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full" />
          </div>
        ) : events.length === 0 ? (
          <p className="text-slate-500 text-center py-20">Nenhum evento agendado no momento.</p>
        ) : (
          <div className="space-y-6">
            {events.map(event => {
              const date = new Date(event.data);
              return (
                <div key={event._id} className="bg-dark-surface border border-dark-border rounded-2xl p-8 hover:border-brand-500/50 transition-all flex flex-col sm:flex-row gap-6">
                  {/* Date Box */}
                  <div className="flex flex-col items-center justify-center bg-brand-600/20 border border-brand-500/30 rounded-xl px-6 py-4 text-center min-w-[90px]">
                    <span className="text-3xl font-extrabold text-brand-400">{date.getDate().toString().padStart(2, '0')}</span>
                    <span className="text-xs text-slate-400 uppercase">
                      {date.toLocaleDateString('pt-BR', { month: 'short' })}
                    </span>
                    <span className="text-xs text-slate-500">{date.getFullYear()}</span>
                  </div>

                  <div className="flex-1">
                    <h2 className="text-xl font-bold mb-2">{event.titulo}</h2>
                    <p className="text-slate-400 text-sm mb-4">{event.descricao}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                      <span>📍 {event.local}</span>
                      <span>👥 {event.limiteVagas} vagas</span>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <button className="px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl transition-all whitespace-nowrap shadow-[0_0_12px_rgba(37,99,235,0.3)]">
                      Me inscrever
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

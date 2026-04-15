import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

export const ProfilePage = () => {
  const { token, user: authUser } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/me`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        setProfile(data);
      } catch (error) {
        console.error('Failed to fetch profile', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (token) fetchProfile();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/me`, {
        method: 'PATCH',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nome: profile.nome,
          sobrenome: profile.sobrenome,
          // Note: Add logic for password change here if needed
        }),
      });

      if (!res.ok) throw new Error('Erro ao salvar perfil.');
      setMessage({ type: 'success', text: 'Perfil atualizado com sucesso!' });
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <div className="p-8 text-white">Carregando perfil...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-dark-surface rounded-2xl border border-dark-border p-8 shadow-xl">
        <div className="flex items-center gap-6 mb-8">
          <div className="w-20 h-20 rounded-full bg-brand-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-brand-600/20">
            {profile.nome[0].toUpperCase()}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">{profile.nome} {profile.sobrenome}</h1>
            <p className="text-brand-500 font-medium">{profile.role}</p>
            <p className="text-slate-400 text-sm">{profile.email}</p>
          </div>
        </div>

        {message && (
          <div className={`p-4 rounded-xl mb-6 text-sm ${message.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Nome</label>
              <input
                type="text"
                value={profile.nome}
                onChange={(e) => setProfile({ ...profile, nome: e.target.value })}
                className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-500 transition-colors"
                placeholder="Nome"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Sobrenome</label>
              <input
                type="text"
                value={profile.sobrenome}
                onChange={(e) => setProfile({ ...profile, sobrenome: e.target.value })}
                className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-500 transition-colors"
                placeholder="Sobrenome"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">E-mail (Não pode ser alterado)</label>
            <input
              type="email"
              disabled
              value={profile.email}
              className="w-full bg-dark-bg/50 border border-dark-border/50 rounded-xl px-4 py-3 text-slate-500 cursor-not-allowed"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isSaving}
              className="px-8 py-3 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-brand-600/20 disabled:opacity-50"
            >
              {isSaving ? 'Salvando...' : 'Salvar Alterações'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

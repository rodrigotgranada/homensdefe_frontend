import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/admin');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-600/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <Link to="/" className="inline-block">
            <h1 className="text-3xl font-extrabold bg-gradient-to-br from-white to-brand-400 bg-clip-text text-transparent">
              Homens de Fé
            </h1>
          </Link>
          <p className="text-slate-400 mt-2">Acesse o painel de administração</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-dark-surface border border-dark-border rounded-2xl p-8 space-y-5 shadow-2xl">
          <h2 className="text-xl font-bold text-white">Entrar</h2>

          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder="seu@email.com.br"
              className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Senha</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors"
            />
          </div>

          <div className="flex justify-end">
            <Link to="/admin/esqueci-senha" className="text-sm text-brand-500 hover:text-brand-400 transition-colors">
              Esqueci minha senha
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-brand-600 hover:bg-brand-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)]"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>

          <p className="text-center text-slate-400 text-sm">
            Não tem conta?{' '}
            <Link to="/admin/registro" className="text-brand-500 hover:text-brand-400 font-medium transition-colors">
              Crie uma agora
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

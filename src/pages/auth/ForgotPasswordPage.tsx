import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setSent(true);
    } catch (err: any) {
      setError(err.message || 'Erro ao processar a solicitação.');
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
          <p className="text-slate-400 mt-2">Recuperação de senha</p>
        </div>

        <div className="bg-dark-surface border border-dark-border rounded-2xl p-8 shadow-2xl">
          {sent ? (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-brand-500/20 rounded-full flex items-center justify-center mx-auto text-3xl">
                📧
              </div>
              <h2 className="text-xl font-bold text-white">E-mail enviado!</h2>
              <p className="text-slate-400 text-sm">
                Se o e-mail <strong className="text-white">{email}</strong> estiver cadastrado, você receberá um link para redefinir sua senha em breve.
              </p>
              <Link
                to="/admin/login"
                className="block w-full py-3 bg-dark-border hover:bg-dark-border/70 text-slate-200 font-medium rounded-xl text-center transition-colors mt-4"
              >
                Voltar ao Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <h2 className="text-xl font-bold text-white mb-1">Esqueceu a senha?</h2>
                <p className="text-slate-400 text-sm">Digite seu e-mail e enviaremos um link de recuperação.</p>
              </div>

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

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white font-bold rounded-xl transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)]"
              >
                {loading ? 'Enviando...' : 'Enviar Link de Recuperação'}
              </button>

              <p className="text-center text-slate-400 text-sm">
                Lembrou a senha?{' '}
                <Link to="/admin/login" className="text-brand-500 hover:text-brand-400 font-medium transition-colors">
                  Voltar ao login
                </Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

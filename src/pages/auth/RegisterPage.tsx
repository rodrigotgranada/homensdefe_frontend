import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nome: '', sobrenome: '', cpf: '', email: '',
    password: '', confirmPassword: '', dataNascimento: '', aceitouTermos: false,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
      return setError('As senhas não coincidem.');
    }
    if (!form.aceitouTermos) {
      return setError('Você precisa aceitar os termos para continuar.');
    }

    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: form.nome,
          sobrenome: form.sobrenome,
          cpf: form.cpf.replace(/\D/g, ''),
          email: form.email,
          password: form.password,
          dataNascimento: form.dataNascimento,
          aceitouTermos: form.aceitouTermos,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Erro ao criar conta.');

      localStorage.setItem('hdf_token', data.access_token);
      localStorage.setItem('hdf_user', JSON.stringify(data.user));
      navigate('/admin');
    } catch (err: any) {
      setError(Array.isArray(err.message) ? err.message.join(', ') : err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors";

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-600/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-lg relative z-10 py-8">
        <div className="text-center mb-10">
          <Link to="/" className="inline-block">
            <h1 className="text-3xl font-extrabold bg-gradient-to-br from-white to-brand-400 bg-clip-text text-transparent">
              Homens de Fé
            </h1>
          </Link>
          <p className="text-slate-400 mt-2">Crie sua conta para participar do movimento</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-dark-surface border border-dark-border rounded-2xl p-8 space-y-5 shadow-2xl">
          <h2 className="text-xl font-bold text-white">Criar Conta</h2>

          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Nome</label>
              <input name="nome" value={form.nome} onChange={handleChange} required placeholder="João" className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Sobrenome</label>
              <input name="sobrenome" value={form.sobrenome} onChange={handleChange} required placeholder="Silva" className={inputClass} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">CPF</label>
              <input name="cpf" value={form.cpf} onChange={handleChange} required placeholder="000.000.000-00" className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Data de Nascimento</label>
              <input type="date" name="dataNascimento" value={form.dataNascimento} onChange={handleChange} required className={inputClass} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">E-mail</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="seu@email.com.br" className={inputClass} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Senha</label>
              <input type="password" name="password" value={form.password} onChange={handleChange} required placeholder="••••••••" className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Confirmar Senha</label>
              <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required placeholder="••••••••" className={inputClass} />
            </div>
          </div>

          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" name="aceitouTermos" checked={form.aceitouTermos} onChange={handleChange} className="mt-1 w-4 h-4 accent-brand-500" />
            <span className="text-sm text-slate-400">
              Li e aceito os{' '}
              <span className="text-brand-500 hover:underline cursor-pointer">Termos de Uso</span>{' '}
              e a{' '}
              <span className="text-brand-500 hover:underline cursor-pointer">Política de Privacidade</span> (LGPD).
            </span>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-brand-600 hover:bg-brand-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)]"
          >
            {loading ? 'Criando conta...' : 'Criar Conta'}
          </button>

          <p className="text-center text-slate-400 text-sm">
            Já tem conta?{' '}
            <Link to="/admin/login" className="text-brand-500 hover:text-brand-400 font-medium transition-colors">
              Faça login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

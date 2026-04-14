import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthUser {
  id: string;
  nome: string;
  sobrenome: string;
  email: string;
  role: 'SUPER_ADM' | 'LOCAL_ADM' | 'USER';
}

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('hdf_token');
    const storedUser = localStorage.getItem('hdf_user');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Erro ao fazer login');
    }

    const data = await res.json();
    localStorage.setItem('hdf_token', data.access_token);
    localStorage.setItem('hdf_user', JSON.stringify(data.user));
    setToken(data.access_token);
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem('hdf_token');
    localStorage.removeItem('hdf_user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

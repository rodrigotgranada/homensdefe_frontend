import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Drawer } from '../components/shared/Drawer';

interface City {
  _id: string;
  nome: string;
  uf: string;
  slug: string;
}

export const LandingPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [cities, setCities] = useState<City[]>([]);
  const [loadingCities, setLoadingCities] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isDrawerOpen) {
      setLoadingCities(true);
      fetch(`${import.meta.env.VITE_API_BASE_URL}/cities`)
        .then((res) => res.json())
        .then((data) => {
          setCities(data);
          setLoadingCities(false);
        })
        .catch(() => setLoadingCities(false));
    }
  }, [isDrawerOpen]);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-dark-bg flex flex-col items-center justify-center text-center p-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-500/20 blur-[120px] rounded-full pointer-events-none" />
      
      <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-br from-white via-brand-100 to-brand-500 bg-clip-text text-transparent relative z-10">
        Homens de Fé
      </h1>
      <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mb-12 relative z-10">
        Conectando homens através da fé, organização de encontros e crescimento espiritual. Explore eventos em sua cidade!
      </p>

      <div className="flex gap-4 relative z-10">
        <Link 
          to="/admin" 
          className="px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white rounded-full font-medium transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)]"
        >
          Acessar Painel
        </Link>
        <button 
          onClick={() => setIsDrawerOpen(true)}
          className="px-8 py-4 bg-dark-surface border border-dark-border hover:border-brand-500/50 text-slate-200 rounded-full font-medium transition-all"
        >
          Encontrar Minha Cidade
        </button>
      </div>

      <Drawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)}
        title="Busca por Cidade e Inscrição"
      >
        <p className="text-slate-400 mb-6">Selecione sua cidade abaixo para visualizar os próximos encontros disponíveis e realizar sua inscrição gratuitamente.</p>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Selecione a Cidade</label>
            <select 
              className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-500"
              onChange={(e) => {
                if (e.target.value) {
                  navigate(`/${e.target.value}`);
                }
              }}
              defaultValue=""
            >
              <option value="" disabled>
                {loadingCities ? 'Buscando cidades ativas...' : 'Escolha uma cidade...'}
              </option>
              {cities.map((city) => (
                <option key={city._id} value={city.slug}>
                  {city.nome} - {city.uf}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Drawer>
    </div>
  );
};


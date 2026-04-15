
export const Dashboard = () => {
  return (
    <>
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-slate-100">Visão Geral</h2>
        <p className="text-slate-400 mt-2">Acompanhe as inscrições e eventos por cidade.</p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-dark-surface border border-dark-border rounded-xl p-6 hover:border-brand-500/50 transition-colors cursor-pointer group">
            <h3 className="text-lg font-medium text-slate-300 group-hover:text-brand-500 transition-colors">Estatística {i}</h3>
            <p className="text-3xl font-bold mt-4">1,234</p>
          </div>
        ))}
      </div>
    </>
  );
};


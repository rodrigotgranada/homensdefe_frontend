// AMBIENTE DE DESENVOLVIMENTO - TESTE DE DEPLOY
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AuthGuard } from './components/auth/AuthGuard';
import { PublicLayout } from './components/layout/PublicLayout';
import { LandingPage } from './pages/LandingPage';
import { CityHub } from './pages/CityHub';
import { GlobalNewsPage } from './pages/GlobalNewsPage';
import { GlobalQuemSomosPage } from './pages/GlobalQuemSomosPage';
import { NewsDetailPage } from './pages/NewsDetailPage';
import { CityNewsPage } from './pages/city/CityNewsPage';
import { CityQuemSomosPage } from './pages/city/CityQuemSomosPage';
import { CityEventsPage } from './pages/city/CityEventsPage';
import { AdminLayout } from './components/layout/AdminLayout';
import { Dashboard } from './pages/admin/Dashboard';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Auth routes — NO header */}
          <Route path="/admin/login" element={<LoginPage />} />
          <Route path="/admin/registro" element={<RegisterPage />} />
          <Route path="/admin/esqueci-senha" element={<ForgotPasswordPage />} />

          {/* Admin Panel — protected, only SUPER_ADM and LOCAL_ADM */}
          <Route element={<AuthGuard allowedRoles={['SUPER_ADM', 'LOCAL_ADM']} />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
            </Route>
          </Route>

          {/* Public routes — WITH global header.
              Named routes MUST come before /:citySlug wildcard */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/quemsomos" element={<GlobalQuemSomosPage />} />
            <Route path="/noticias" element={<GlobalNewsPage />} />
            <Route path="/noticias/:slug" element={<NewsDetailPage />} />
            <Route path="/:citySlug" element={<CityHub />} />
            <Route path="/:citySlug/noticias" element={<CityNewsPage />} />
            <Route path="/:citySlug/noticias/:slug" element={<NewsDetailPage />} />
            <Route path="/:citySlug/quemsomos" element={<CityQuemSomosPage />} />
            <Route path="/:citySlug/eventos" element={<CityEventsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;


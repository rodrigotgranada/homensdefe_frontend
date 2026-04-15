import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface Props {
  allowedRoles: Array<'SUPER_ADM' | 'LOCAL_ADM' | 'USER'>;
  redirectTo?: string;
}

export const AuthGuard = ({ allowedRoles, redirectTo = '/admin/login' }: Props) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!user) return <Navigate to={redirectTo} replace />;
  if (!allowedRoles.includes(user.role)) return <Navigate to="/" replace />;

  return <Outlet />;
};


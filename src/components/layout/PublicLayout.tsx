import { PublicHeader } from './PublicHeader';
import { Outlet } from 'react-router-dom';

export const PublicLayout = () => {
  return (
    <>
      <PublicHeader />
      <div className="pt-16">
        <Outlet />
      </div>
    </>
  );
};


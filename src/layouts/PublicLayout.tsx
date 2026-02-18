import { Outlet } from 'react-router-dom';
import type { JSX } from 'react';

const PublicLayout = (): JSX.Element => {
  return (
    <div className='min-h-screen bg-white font-sans text-slate-900 transition-colors duration-200 dark:bg-gray-900 dark:text-slate-100'>
      <Outlet />
    </div>
  );
};

export default PublicLayout;

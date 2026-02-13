import { type JSX, type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';
import { ROUTES } from '../constants';

interface GuestGuardProps {
  children: ReactNode;
}

export const GuestGuard = ({ children }: GuestGuardProps): JSX.Element => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  if (isAuthenticated) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return <>{children}</>;
};

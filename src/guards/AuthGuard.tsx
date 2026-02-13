import { type JSX, type ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useCurrentUser } from '../hooks/queries';
import { ROUTES } from '../constants';

interface AuthGuardProps {
  children: ReactNode;
}

export const AuthGuard = ({ children }: AuthGuardProps): JSX.Element => {
  const { data: user } = useCurrentUser();
  const location = useLocation();

  if (!user) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

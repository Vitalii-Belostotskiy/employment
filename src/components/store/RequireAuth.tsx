import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { RootStatement } from '../types/AuthStateType';

export const RequireAuth = () => {
  const authorized = useSelector(
    (state: RootStatement) => state.auth.authorized,
  );
  const location = useLocation();

  if (!authorized) {
    return (
      <Navigate to="/login" state={{ pathname: location.pathname }} replace />
    );
  }

  return <Outlet />;
};

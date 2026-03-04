import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logout, useCurrentToken } from '../../redux/features/auth/authSlice';
import { verifyToken } from '../../utils/verifyToken';

type TProtectedRoute = {
  children: ReactNode;
  role: string | undefined;
};

const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
  const token = useAppSelector(useCurrentToken);
  const dispatch = useAppDispatch();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const user = verifyToken(token);

  if (role !== undefined && role !== user?.role) {
    dispatch(logout());
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
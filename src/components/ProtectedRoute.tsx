import React, {ReactNode} from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
interface ProtectedRouteProps {
  children: ReactNode; 
}
const ProtectedRoute:React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = useSelector((state:RootState) => state.auth.isAuthenticated);
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

export default ProtectedRoute;

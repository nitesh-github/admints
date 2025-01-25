import React, {ReactNode} from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import AdminLayout from './AdminLayout';
interface ProtectedRouteProps {
  children: ReactNode; 
}
const ProtectedRoute:React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = useSelector((state:RootState) => state.auth.isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return (
    <AdminLayout>
      {children}
    </AdminLayout>
  );
};

export default ProtectedRoute;

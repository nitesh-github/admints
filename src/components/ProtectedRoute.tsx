import React, {ReactNode} from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { logout } from '../store/authSlice';
import AdminLayout from './AdminLayout';
interface ProtectedRouteProps {
  children: ReactNode; 
}
// const ProtectedRoute:React.FC<ProtectedRouteProps> = ({ children }) => {
  const ProtectedRoute= (props:ProtectedRouteProps) => {
    const dispatch = useDispatch();
  const isAuthenticated = useSelector((state:RootState) => state.auth.isAuthenticated);
  const logintime = useSelector((state:RootState) => state.auth.logintime);
  const timeDifference = Date.now() - logintime;
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  const isExpired = timeDifference >= 24 * 60 * 60 * 1000; // 24 hours in milliseconds

        if (isExpired) {
          dispatch(logout()); // Dispatch logout action
        }
  return (
    <AdminLayout>
      {props.children}
    </AdminLayout>
  );
};

export default ProtectedRoute;

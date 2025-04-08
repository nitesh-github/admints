import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Dashboard from '../pages/Dashboard';
import CreateUser from '../pages/users/CreateUser';
import ProtectedRoute from '../components/ProtectedRoute';
import UserList from '../pages/users/UserList';
import NotFound from '../pages/404';
import UploadUserCsv from '../pages/users/UploadUserCsv';
import ProductList from '../pages/products/ProductList';
const RoutesConfig = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user-list"
        element={
          <ProtectedRoute>
            <UserList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/create-user"
        element={
          <ProtectedRoute>
            <CreateUser />
          </ProtectedRoute>
        }
      />
      <Route
        path="/edit-user/:id"
        element={
          <ProtectedRoute>
            <CreateUser />
          </ProtectedRoute>
        }
      />
      <Route
        path="/upload-user-csv"
        element={
          <ProtectedRoute>
            <UploadUserCsv />
          </ProtectedRoute>
        }
      />

      <Route
        path="/products"
        element={
          <ProtectedRoute>
            <ProductList />
          </ProtectedRoute>
        }
      />
      <Route
        path="*"
        element={<NotFound />}
      />
    </Routes>
  );
};

export default RoutesConfig;
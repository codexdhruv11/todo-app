import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = () => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
// Update on 2025-02-12T00:06:26
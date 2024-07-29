import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({ element, roles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // or a loading spinner
  }

  if (!user || (roles && !roles.includes(user.roles[0]))) {
    return <Navigate to="/login" replace />;
  }

  return element;
};

export default ProtectedRoute;

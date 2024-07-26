import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({ element: Component, roles }) => {
  const { user } = useAuth();

  return user && roles.includes(user.role) ? (
    Component
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;

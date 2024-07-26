import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({ component: Component, roles, ...rest }) => {
  const { user } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        user && roles.includes(user.role) ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default ProtectedRoute;

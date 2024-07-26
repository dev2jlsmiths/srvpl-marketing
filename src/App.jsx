import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import UserPage from "./pages/UserPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <ProtectedRoute
            path="/admin"
            component={AdminPage}
            roles={["admin"]}
          />
          <ProtectedRoute
            path="/user"
            component={UserPage}
            roles={["user", "admin"]}
          />
          <Route path="/" component={HomePage} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;

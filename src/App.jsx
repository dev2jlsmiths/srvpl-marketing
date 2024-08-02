import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import UserPage from "./pages/UserPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import BrandDetail from "./components/BrandDetail";
import EditProfile from "./components/EditProfile";
import Settings from "./components/Settings";
import Profile from "./components/Profile";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute
                element={
                  <Layout>
                    <AdminPage />
                  </Layout>
                }
                roles={["admin"]}
              />
            }
          />
          <Route
            path="/user"
            element={
              <ProtectedRoute
                element={
                  <Layout>
                    <UserPage />
                  </Layout>
                }
                roles={["user", "admin"]}
              />
            }
          />
          <Route
            path="/"
            element={
              <Layout>
                <HomePage />
              </Layout>
            }
          />
          <Route
            path="/brand/:id"
            element={
              <Layout>
                <BrandDetail />
              </Layout>
            }
          />
          <Route
            path="/brand/edit/:id"
            element={
              <Layout>
                <EditProfile />
              </Layout>
            }
          />
          <Route
            path="/settings"
            element={
              <Layout>
                <Settings />
              </Layout>
            }
          />
          <Route
            path="/profile"
            element={
              <Layout>
                <Profile />
              </Layout>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

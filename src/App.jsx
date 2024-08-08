import React, { useState } from "react";
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
import OriginalCollateral from "./components/drive/OriginalColleteral";
import AddFolder from "./components/drive/AddFolder";
import AddCollateral from "./components/drive/AddCollateralModal";
import FolderView from "./components/drive/FolderView";
import BrandStrategy from "./components/strategy/BrandStrategy";
import Calendar from "./components/Calendar";
import { Toaster } from "react-hot-toast";
import AddStrategy from "./components/strategy/AddStrategy";


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
          <Route
            path="/add-strategy/:brandid"
            element={
              <Layout>
                <AddStrategy />
              </Layout>
            }
          />

          <Route
            path="/strategy/:id"
            element={
              <Layout>
                <BrandStrategy />
              </Layout>
            }
          />

          <Route
            path="/calendar"
            element={
              <Layout>
                <Calendar />
              </Layout>
            }
          />
          <Route
            path="/originalcollateral/:brandId"
            element={
              <Layout>
                <OriginalCollateral />
              </Layout>
            }
          />
          <Route
            path="/item/:brandId/:parentId"
            element={
              <Layout>
                <FolderView />
              </Layout>
            }
          />
          <Route
            path="/add-collateral"
            element={
              <Layout>
                <AddCollateral />
              </Layout>
            }
          />
          <Route
            path="/add-folder"
            element={
              <Layout>
                <AddFolder />
              </Layout>
            }
          />

          {/* <Route
            path="/"
            element={
              <Layout>
                <Folder folder={folders[0]} onAddFolder={addFolder} />
              </Layout>
            }
          /> */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

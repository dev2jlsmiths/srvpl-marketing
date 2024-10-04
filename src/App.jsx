import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { AuthProvider } from "./contexts/AuthContext";
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

import { Toaster } from "react-hot-toast";
import AddStrategy from "./components/strategy/AddStrategy";

import CalendarComponent from "./components/calender/CalenderComponent";

import StrategyDashboard from "./components/strategy/StrategyDashboard";
import KeywordTags from "./components/strategy/KeywordTags";
import People from "./components/people/People";
import Teams from "./components/teams/Teams";
import TeamProfile from "./components/teams/TeamProfile";
import TeamManager from "./components/teams/TeamManager";
import RoleAccess from "./components/role-and-access/RoleAccess";
import Dashboard from "./components/dashboard/Dashboard";
import TaskView from "./components/dashboard/TaskView";

function App() {
  return (
    <Router>
      <Toaster />
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
          path="/dashboard"
          element={
            <ProtectedRoute
              element={
                <Layout>
                  <Dashboard />
                </Layout>
              }
            />
          }
        />
        <Route
          path="/tasks"
          element={
            <ProtectedRoute
              element={
                <Layout>
                  <TaskView />
                </Layout>
              }
            />
          }
        />
        <Route
          path="/team/people"
          element={
            <Layout>
              <People />
            </Layout>
          }
        />

        <Route
          path="/team/teams"
          element={
            <Layout>
              <Teams />
            </Layout>
          }
        />
        <Route
          path="/team/role-access"
          element={
            <Layout>
              <RoleAccess />
            </Layout>
          }
        />
        <Route
          path="/team/teams/team-profile/:id"
          element={
            <Layout>
              <TeamManager />
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
              <StrategyDashboard />
            </Layout>
          }
        />
        <Route
          path="/keyword-tags"
          element={
            <Layout>
              <KeywordTags />
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

        <Route path="/calendar/:id" element={<CalendarComponent />} />
      </Routes>
    </Router>
  );
}

export default App;

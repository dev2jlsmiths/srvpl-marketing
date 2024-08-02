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
import OriginalCollateral from "./components/OriginalColleteral";
import FileDetails from "./components/FileDetails";
import AddFolder from "./components/AddFolder";
import AddCollateral from "./components/AddCollateral";
import FolderView from "./components/FolderView";

const initialData = [
  {
    id: "root",
    name: "Root Folder",
    subfolders: [],
    files: [],
  },
];

function App() {
  const [folders, setFolders] = useState(initialData);
  const addFolder = (parentId, newFolder) => {
    setFolders((prevFolders) => {
      const addFolderRecursively = (folders) => {
        return folders.map((folder) => {
          if (folder.id === parentId) {
            return {
              ...folder,
              subfolders: [...folder.subfolders, newFolder],
            };
          }
          return {
            ...folder,
            subfolders: addFolderRecursively(folder.subfolders),
          };
        });
      };
      return addFolderRecursively(prevFolders);
    });
  };
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
          \
          <Route
            path="/originalcollateral/:id"
            element={
              <Layout>
                <OriginalCollateral />
              </Layout>
            }
          />
          <Route
            path="/item/:id"
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

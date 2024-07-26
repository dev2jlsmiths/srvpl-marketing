import React from "react";
import { useAuth } from "../hooks/useAuth";

const AdminPage = () => {
  const { user } = useAuth();

  if (!user || user.role !== "admin") {
    return <div>You do not have permission to view this page.</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Admin Page</h1>
      <p>Welcome to the Admin Page, {user.name}!</p>
      {/* Add admin-specific content here */}
    </div>
  );
};

export default AdminPage;

import React from "react";
import { useAuth } from "../hooks/useAuth";
import BrandPage from "../components/BrandPage";

const AdminPage = () => {
  const { user } = useAuth();

  // if (!user || user.role !== "admin") {
  //   return <div>You do not have permission to view this page.</div>;
  // }

  return (
    <div className="p-4">
      <BrandPage />
    </div>
  );
};

export default AdminPage;

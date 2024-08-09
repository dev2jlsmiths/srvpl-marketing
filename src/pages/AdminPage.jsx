import React from "react";

import BrandPage from "../components/BrandPage";

const AdminPage = () => {
  // const { user } = useAuth();

  // if (!user || user.role !== "admin") {
  //   return <div>You do not have permission to view this page.</div>;
  // }

  return (
    <div className="">
      <BrandPage />
    </div>
  );
};

export default AdminPage;

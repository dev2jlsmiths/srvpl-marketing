import React from "react";
// import { useAuth } from "../hooks/useAuth";

const UserPage = () => {
  // const { user } = useAuth();

  // if (!user || (user.role !== "user" && user.role !== "admin")) {
  //   return <div>You do not have permission to view this page.</div>;
  // }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">User Page</h1>
      <p>Welcome to the User Page, {user.name}!</p>
      {/* Add user-specific content here */}
    </div>
  );
};

export default UserPage;

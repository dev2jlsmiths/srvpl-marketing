import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../public/logo.svg";

// Assume you have a way to retrieve your access token, e.g., from local storage
const getAccessToken = () => {
  // Replace this with your actual method of getting the access token
  return localStorage.getItem("access_token");
};

const Sidebar = () => {
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isTeamOpen, setIsTeamOpen] = useState(false);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggleAccount = () => {
    setIsAccountOpen(!isAccountOpen);
  };

  const toggleTeam = () => {
    setIsTeamOpen(!isTeamOpen);
  };

  useEffect(() => {
    const fetchBrands = async () => {
      const token = getAccessToken(); // Get the access token

      if (!token) {
        setError("No access token found");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          "http://192.168.1.38:5000/v1/brand/profile/get?fields=brand_name&limit=100",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the Authorization header
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setBrands(data.data); // Set the brands data
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen w-48 text-xs bg-white shadow-md">
      <div className="p-4 border-b">
        <img src={logo} alt="Logo" className="h-10 w-10 mx-auto" />
      </div>
      <div className="p-4">
        <button
          className="flex items-center justify-between w-full text-left p-2 rounded hover:bg-gray-200"
          onClick={toggleAccount}
          aria-expanded={isAccountOpen}
          aria-controls="account-menu"
        >
          <span className="flex gap-1 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-4 fill-black"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
              />
            </svg>
            Account
          </span>
          <svg
            className={`h-5 w-5 transition-transform transform ${
              isAccountOpen ? "rotate-180" : ""
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        {isAccountOpen && (
          <div id="account-menu" className="pl-8 mt-1">
            {brands.map((brand) => (
              <Link
                key={brand._id}
                to={`/account/${brand.brand_name}`} // Assuming dynamic links
                className="block p-1 hover:bg-gray-200 rounded"
              >
                {brand.brand_name}
              </Link>
            ))}
          </div>
        )}

        <button
          className="flex items-center justify-between w-full text-left p-2 rounded hover:bg-gray-200 mt-2"
          onClick={toggleTeam}
          aria-expanded={isTeamOpen}
          aria-controls="team-menu"
        >
          <span className="flex gap-1 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-4 fill-black"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
              />
            </svg>
            Team
          </span>
          <svg
            className={`h-5 w-5 transition-transform transform ${
              isTeamOpen ? "rotate-180" : ""
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        {isTeamOpen && (
          <div id="team-menu" className="pl-8 mt-2">
            <Link
              to="/team/members"
              className="block p-2 hover:bg-gray-200 rounded"
            >
              Members
            </Link>
            <Link
              to="/team/projects"
              className="block p-2 hover:bg-gray-200 rounded"
            >
              Projects
            </Link>
          </div>
        )}

        <Link
          to="/people"
          className="flex gap-1 items-center p-2 rounded hover:bg-gray-200 mt-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-4 fill-black"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
            />
          </svg>
          People
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;

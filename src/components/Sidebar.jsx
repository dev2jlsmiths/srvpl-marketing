import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../public/logo.svg";

const Sidebar = () => {
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isTeamOpen, setIsTeamOpen] = useState(false);

  const toggleAccount = () => {
    setIsAccountOpen(!isAccountOpen);
  };

  const toggleTeam = () => {
    setIsTeamOpen(!isTeamOpen);
  };

  return (
    <div className="h-screen w-64 bg-white shadow-md">
      <div className="p-4 border-b">
        <img src={logo} alt="Logo" className="h-10 w-10 mx-auto" />
      </div>
      <div className="p-4">
        <button
          className="flex items-center justify-between w-full text-left p-2 rounded hover:bg-gray-200"
          onClick={toggleAccount}
        >
          <span className="flex items-center">
            <svg
              className="h-5 w-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 12H8m0 0H4m4 0V8m0 4v4m0-4h4"
              ></path>
            </svg>
            Account
          </span>
          <svg
            className={`h-5 w-5 transition-transform transform ${
              isAccountOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </button>
        {isAccountOpen && (
          <div className="pl-8 mt-2">
            <Link
              to="/account/settings"
              className="block p-2 hover:bg-gray-200 rounded"
            >
              Settings
            </Link>
            <Link
              to="/account/profile"
              className="block p-2 hover:bg-gray-200 rounded"
            >
              Profile
            </Link>
          </div>
        )}

        <button
          className="flex items-center justify-between w-full text-left p-2 rounded hover:bg-gray-200 mt-2"
          onClick={toggleTeam}
        >
          <span className="flex items-center">
            <svg
              className="h-5 w-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8c1.656 0 3-1.344 3-3s-1.344-3-3-3-3 1.344-3 3 1.344 3 3 3zm0 2c-1.657 0-5 0.836-5 2.5V14h10v-1.5c0-1.664-3.343-2.5-5-2.5z"
              ></path>
            </svg>
            Team
          </span>
          <svg
            className={`h-5 w-5 transition-transform transform ${
              isTeamOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </button>
        {isTeamOpen && (
          <div className="pl-8 mt-2">
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
          className="flex items-center p-2 rounded hover:bg-gray-200 mt-2"
        >
          <svg
            className="h-5 w-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5.121 17.804A3.005 3.005 0 018 17c1.657 0 3 1.343 3 3H5c0-1.656 1.344-3 3-3zm13.657-9.657a7.963 7.963 0 011.657 1.657m0-1.657a7.963 7.963 0 00-1.657-1.657m-1.414 1.414a7.963 7.963 0 01-1.657-1.657m1.657 1.657a7.963 7.963 0 00-1.657 1.657M7.05 6.343a7.963 7.963 0 011.657 1.657M5.121 8.464a7.963 7.963 0 00-1.657-1.657m1.657 1.657a7.963 7.963 0 01-1.657 1.657m1.414-1.414a7.963 7.963 0 001.657 1.657"
            ></path>
          </svg>
          People
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;

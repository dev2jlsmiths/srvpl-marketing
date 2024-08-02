import React, { useState } from "react";

const ProfileSection = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [reportingTo, setReportingTo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="max-w-xs mx-auto p-6 mt-8 bg-white shadow-lg rounded-lg">
      <div className="flex items-center space-x-4 mb-6">
        <img
          className="w-24 h-24 rounded-full object-cover"
          src="https://via.placeholder.com/150"
          alt="Profile"
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Profile</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label
            htmlFor="reportingTo"
            className="block text-sm font-medium text-gray-700"
          >
            Reporting To
          </label>
          <input
            id="reportingTo"
            type="text"
            value={reportingTo}
            onChange={(e) => setReportingTo(e.target.value)}
            className="mt-1 block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-1 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileSection;

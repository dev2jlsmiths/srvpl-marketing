// src/BrandModal.js
import React, { useState } from "react";

const BrandModal = ({ isOpen, onClose }) => {
  const [platforms, setPlatforms] = useState([{ id: Date.now() }]);

  const addPlatform = () => {
    setPlatforms([...platforms, { id: Date.now() }]);
  };

  const removePlatform = (id) => {
    setPlatforms(platforms.filter((platform) => platform.id !== id));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex text-xs items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Add Brand Profile</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <form>
          <div className="grid grid-cols-1 text-left sm:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-xs font-medium text-gray-700">
                Brand Name
              </label>
              <input
                type="text"
                className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
                placeholder="Brand Name"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700">
                Brand Company Name
              </label>
              <input
                type="text"
                className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
                placeholder="Brand Company Name"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700">
                Website Link
              </label>
              <input
                type="text"
                className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
                placeholder="Website Link"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700">
                Logo
              </label>
              <input
                type="file"
                className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
              />
              <a href="#" className="text-blue-500 text-sm">
                View Attachment
              </a>
            </div>
          </div>
          <h3 className="text-lg font-medium mb-4">Social Media</h3>
          {platforms.map((platform, index) => (
            <div
              key={platform.id}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 text-left gap-6 mb-6"
            >
              <div>
                <label className="block text-xs font-medium text-gray-700">
                  Social Media Platform
                </label>
                <select className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm">
                  <option>Select Platform</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700">
                  Account ID
                </label>
                <input
                  type="text"
                  className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
                  placeholder="Account ID"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
                  placeholder="Password"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="text"
                  className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
                  placeholder="Phone Number"
                />
              </div>
              <div className="flex items-end">
                <div>
                  <label className="block text-xs font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
                    placeholder="Email"
                  />
                </div>

                <button
                  type="button"
                  className="ml-2 mb-2 text-red-500 hover:text-red-700"
                  onClick={() => removePlatform(platform.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22m-5-4h-8a2 2 0 00-2 2v1h12V5a2 2 0 00-2-2z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
          <div className="flex items-center justify-center">
            <button
              type="button"
              className=" bg-blue-500 text-white px-2 py-1 rounded-md shadow-md hover:bg-blue-600 transition-colors duration-300"
              onClick={addPlatform}
            >
              + Add Platform
            </button>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 transition-colors duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition-colors duration-300"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BrandModal;

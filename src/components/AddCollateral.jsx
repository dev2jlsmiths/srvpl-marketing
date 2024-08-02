import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddCollateral = () => {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to add the collateral item (e.g., update state or make an API call)
    console.log("Collateral added:", { name, icon });
    // Redirect to the main view or wherever appropriate
    navigate("/");
  };

  return (
    <main className="max-w-full flex">
      <div className="min-h-screen text-xs w-full p-8">
        <header className="mb-8">
          <h1 className="text-xl text-blue-400 font-semibold mb-6">
            Add New Collateral
          </h1>
        </header>
        <div className="bg-white p-8 rounded-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-gray-700 font-medium mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label
                htmlFor="icon"
                className="block text-gray-700 font-medium mb-2"
              >
                Icon URL
              </label>
              <input
                type="text"
                id="icon"
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-full"
            >
              Add Collateral
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default AddCollateral;

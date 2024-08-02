import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddFolder = () => {
  const [folderName, setFolderName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://192.168.1.38:5000/v1/collateral/folder/add",
        {
          name: folderName,
        }
      );
      console.log("Folder added:", response.data);
      navigate("/originalcollateral/:id");
    } catch (error) {
      console.error("Error adding folder:", error);
    }
  };

  return (
    <main className="max-w-full flex">
      <div className="min-h-screen text-xs w-full p-8">
        <header className="mb-8">
          <h1 className="text-xl text-blue-400 font-semibold mb-6">
            Add New Folder
          </h1>
        </header>
        <div className="bg-white p-8 rounded-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="folderName"
                className="block text-gray-700 font-medium mb-2"
              >
                Folder Name
              </label>
              <input
                type="text"
                id="folderName"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-full"
            >
              Add Folder
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default AddFolder;

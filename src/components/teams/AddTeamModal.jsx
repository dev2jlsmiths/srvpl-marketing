import setupAxiosInterceptors from "../../AxiosInterceptor";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

const AddTeamModal = ({ onClose }) => {
  setupAxiosInterceptors()
  const [teamName, setTeamName] = useState("");
  const [teamDesc, setTeamDesc] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("/v1/team/add", {
        team_name: teamName,
        team_desc: teamDesc,
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Team added successfully:", response.data);
      toast.success(response.data.message)
      onClose(); // Close the modal on success
    } catch (error) {
      console.error("Error adding team:", error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex text-xs items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-2xl font-semibold">Add Team</h2>
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
        <form onSubmit={handleSave}>
          <div className="flex flex-col text-left mb-3 p-4 gap-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-700">
                Team Name
              </label>
              <input
                type="text"
                name="Name"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className="w-full mt-1 p-2 block grow bg-gray-50 border-none rounded-md shadow-sm focus:ring-0"
                placeholder="Name"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="Description"
                value={teamDesc}
                onChange={(e) => setTeamDesc(e.target.value)}
                className="mt-1 p-2 bg-gray-50 block w-full border-none rounded-md shadow-sm focus:ring-0 resize-none"
                placeholder="Type Here ...."
                required
              />
            </div>
          </div>

          <div className="flex justify-center gap-x-3 pb-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-white rounded-lg shadow-md hover:bg-gray-200 focus:outline-none"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-6 py-2 text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none ${loading ? "opacity-50" : ""}`}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTeamModal;

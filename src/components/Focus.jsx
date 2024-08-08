import React, { useEffect, useState } from "react";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

const Focus = () => {
  const [contentTypes, setContentTypes] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [newType, setNewType] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [currentTypeId, setCurrentTypeId] = useState(null);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 100,
    totalPages: 1,
  });
  const accessToken = localStorage.getItem("access_token");

  const fetchContentTypes = async (page = 1, limit = 10) => {
    try {
      const response = await axios.get(
        `${apiUrl}/v1/platform/focus/get?page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setContentTypes(response.data.data);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error("Error fetching content types:", error);
    }
  };

  useEffect(() => {
    fetchContentTypes();
  }, [accessToken]);

  const handleAddTypeClick = () => {
    setEditMode(false);
    setNewType("");
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditMode(false);
    setNewType("");
    setCurrentTypeId(null);
  };

  const handleInputChange = (e) => {
    setNewType(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode && currentTypeId) {
        await axios.put(
          `${apiUrl}/v1/platform/focus/edit/${currentTypeId}`,
          { focus_name: newType },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
      } else {
        await axios.post(
          `${apiUrl}/v1/platform/focus/add`,
          { focus_name: newType },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
      }
      setNewType("");
      setModalOpen(false);
      // Refresh the content types list
      fetchContentTypes(pagination.page, pagination.limit);
    } catch (error) {
      console.error("Error adding/updating content type:", error);
    }
  };

  const handleEditClick = (type) => {
    setEditMode(true);
    setCurrentTypeId(type._id);
    setNewType(type.focus_name);
    setModalOpen(true);
  };

  return (
    <div className="w-56 h-72 bg-white border border-gray-300 rounded-xl relative">
      <div className="relative h-full">
        <div className="bg-gray-100 absolute top-0 w-full h-12  rounded-t-xl border-b border-gray-300 flex items-center px-4">
          <div className="font-semibold text-sm text-gray-800">Focus</div>
          <button
            className="ml-auto px-2 py-1 bg-gray-300 text-gray-800 rounded-md text-xs"
            onClick={handleAddTypeClick}
          >
            + Add Focus
          </button>
        </div>
        <div className="absolute top-12 bottom-0 left-0 right-0 overflow-y-auto no-scrollbar px-4 py-2">
          {contentTypes.length > 0 ? (
            contentTypes.map((type) => (
              <div
                key={type._id}
                className="flex items-center justify-between gap-2 px-3 py-1 border-b border-gray-300"
              >
                <div className="text-dark-gray text-sm">{type?.focus_name}</div>
                <svg
                  onClick={() => handleEditClick(type)}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4 h-4 cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500">No Focus available.</div>
          )}
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30">
          <div className="bg-white p-4 rounded-lg shadow-lg w-1/4 max-w-sm">
            <h2 className="text-lg font-semibold mb-4">
              {editMode ? "Edit Focus Type" : "Add Focus Type"}
            </h2>
            <form onSubmit={handleFormSubmit}>
              <input
                type="text"
                value={newType}
                onChange={handleInputChange}
                placeholder="Enter Focus type"
                className="border border-gray-300 rounded-md px-2 py-1 w-full mb-4"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-2 py-1 bg-gray-200 text-gray-800 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-2 py-1 bg-blue-700 text-white rounded-md"
                >
                  {editMode ? "Update Type" : "Add Type"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Focus;

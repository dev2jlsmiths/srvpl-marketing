import React, { useEffect, useState } from "react";
import axios from "axios";

const Department = () => {
  const [departments, setDepartments] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [newDept, setNewDept] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [currentDeptId, setCurrentDeptId] = useState(null);
  const accessToken = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(
          "http://192.168.1.38:8000/v1/platform/department/get?page=1&limit=10",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setDepartments(response.data.data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchDepartments();
  }, [accessToken]);

  const handleAddDeptClick = () => {
    setEditMode(false);
    setNewDept("");
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditMode(false);
    setNewDept("");
    setCurrentDeptId(null);
  };

  const handleInputChange = (e) => {
    setNewDept(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode && currentDeptId) {
        await axios.put(
          `http://192.168.1.38:8000/v1/platform/department/edit/${currentDeptId}`,
          { department_name: newDept },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
      } else {
        await axios.post(
          "http://192.168.1.38:8000/v1/platform/department/add",
          { department_name: newDept },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
      }
      setNewDept("");
      setModalOpen(false);
      // Refresh the departments list
      const response = await axios.get(
        "http://192.168.1.38:8000/v1/platform/department/get?page=1&limit=10",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setDepartments(response.data.data);
    } catch (error) {
      console.error("Error adding/updating department:", error);
    }
  };

  const handleEditClick = (dept) => {
    setEditMode(true);
    setCurrentDeptId(dept._id);
    setNewDept(dept.department_name);
    setModalOpen(true);
  };

  return (
    <div className="w-56 h-72 bg-white rounded-xl overflow-hidden border border-gray-300 relative">
      <div className="relative h-full">
        <div className="absolute top-0 w-full h-15 bg-white rounded-t-xl border-b border-gray-300"></div>
        <div className="absolute top-4 left-4 font-semibold text-sm text-gray-800">
          Department
        </div>
        <button
          className="absolute top-3 right-4 px-2 py-1 bg-gray-100 text-gray-800 rounded-md text-xs"
          onClick={handleAddDeptClick}
        >
          + Add Dept
        </button>
        <div className="flex flex-col gap-1 absolute top-16 left-0 w-full px-4">
          {departments.length > 0 ? (
            departments.map((dept) => (
              <div
                key={dept._id}
                className="flex items-center justify-between gap-2 px-3 py-1 border-b border-gray-300"
              >
                <div className="text-dark-gray text-sm">
                  {dept?.department_name}
                </div>
                <svg
                  onClick={() => handleEditClick(dept)}
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
            <div className="text-center text-gray-500">
              No departments available.
            </div>
          )}
        </div>
      </div>

      {modalOpen && (
        <div className="fixed text-xs z-30 inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-1/4 max-w-sm">
            <h2 className="text-lg font-semibold mb-4">
              {editMode ? "Edit Department" : "Add New Department"}
            </h2>
            <form onSubmit={handleFormSubmit}>
              <input
                type="text"
                value={newDept}
                onChange={handleInputChange}
                placeholder="Enter department name"
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
                  {editMode ? "Update Dept" : "Add Dept"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Department;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import setupAxiosInterceptors from "../../AxiosInterceptor";

const SubDepartment = () => {
  const navigate = useNavigate()
  const [departments, setDepartments] = useState([]);
  const [subdepartments, setSubDepartments] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [newDept, setNewDept] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [currentDeptId, setCurrentDeptId] = useState(null);
  const [selectedDeptId, setSelectedDeptId] = useState("");


  setupAxiosInterceptors()
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(
          `/v1/platform/department/get?page=1&limit=100`,

        );
        setDepartments(response.data.data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchDepartments();
  }, []);

  useEffect(() => {
    const fetchSubDepartments = async () => {
      try {
        const response = await axios.get(
          `/v1/platform/get/sub/department?page=1&limit=10`,
        );
        setSubDepartments(response.data.data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchSubDepartments();
  }, []);

  const handleAddDeptClick = () => {
    setEditMode(false);
    setNewDept("");
    setModalOpen(true);
  };

  const handleDeptChange = (e) => {
    setSelectedDeptId(e.target.value);
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
          `/v1/platform/edit/sub/department/${currentDeptId}`,
          { sub_department_name: newDept },
        );
      } else {
        await axios.post(
          `/v1/platform/sub/department`,
          { 
            department_id: selectedDeptId,
            sub_department_name: newDept
          },
     
        );
      }
      setNewDept("");
      setModalOpen(false);
      navigate(0)
      // Refresh the departments list
      const response = await axios.get(
        `/v1/platform/get/sub/department?page=1&limit=10`,
      );
      setDepartments(response.data.data);
    } catch (error) {
      console.error("Error adding/updating department:", error);
    }
  };

  
  const handleEditClick = (dept) => {
    setEditMode(true);
    setSelectedDeptId(dept.department_id)
    setCurrentDeptId(dept._id);
    setNewDept(dept.sub_department_name);
    setModalOpen(true);
  };

  return (
    <div className="w-56 h-72 bg-white rounded-xl overflow-y-scroll scroll-smooth no-scrollbar border border-gray-300 relative">
      <div className="relative h-full">
        <div className="absolute top-12 w-full h-15 bg-gray-100 rounded-t-xl border-b border-gray-300"></div>
        <div className="absolute top-4 left-4 font-semibold text-sm text-gray-800">
          Sub Department
        </div>
        <button
          className="absolute top-3 right-4 px-2 py-1 bg-gray-100 text-gray-800 rounded-md text-xs"
          onClick={handleAddDeptClick}
        >
          + Add 
        </button>
        <div className="flex flex-col gap-1 absolute top-16 left-0 w-full px-4">
          {subdepartments.length > 0 ? (
            subdepartments.map((dept) => (
              <div
                key={dept._id}
                className="flex items-center justify-between gap-2 px-3 py-1 border-b border-gray-300"
              >
                <div className="text-dark-gray text-sm">
                  {dept?.sub_department_name}
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
            <h2 className="text-sm font-semibold mb-4">
              {editMode ? "Edit Department" : "Add Sub-Department"}
            </h2>
            <form className="space-y-4" onSubmit={handleFormSubmit}>
              <select 
              className="w-full border bg-gray-50 rounded text-xs p-1"
              value={selectedDeptId}
              onChange={handleDeptChange}>
              <option value="">Select a department</option>
                {departments.length > 0 ? (
                  departments.map((dept) => (
                    <option key={dept._id} value={dept._id}>
                      {dept.department_name}
                    </option>
                  ))
                ) : (
                  <option value="">No departments available</option> // Optional: placeholder for no departments
                )}
              </select>
              <input
                type="text"
                value={newDept}
                onChange={handleInputChange}
                placeholder="Enter sub-department name"
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
                  {editMode ? "Update Sub-Dept" : "Add Sub-Dept"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubDepartment;

import axios from "axios";
import React, { useEffect, useState } from "react";
const apiUrl = import.meta.env.VITE_API_URL;

const AddPeopleModal = ({ onClose }) => {
  const [subdepartments, setSubDepartments] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [designations, setdesignations] = useState([]);
  const [formData, setformData] = useState({
    name: "",
    employeeId: "",
    phone: "",
    email: "",
    department: "",
    sub_department: "",
    designation: "",
  });
  const accessToken = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/v1/platform/department/get?page=1&limit=100`,
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

  useEffect(() => {
    const fetchSubDepartments = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/v1/platform/get/sub/department?page=1&limit=10`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setSubDepartments(response.data.data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchSubDepartments();
  }, [accessToken]);

  useEffect(() => {
    const fetchdesignations = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/v1/platform/designation/get?page=1&limit=100`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setdesignations(response.data.data);
      } catch (error) {
        console.error("Error fetching designations:", error);
      }
    };

    fetchdesignations();
  }, [accessToken]);
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex text-xs items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Add People</h2>
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
          <div className="grid grid-cols-4 text-left  gap-6 mb-6">
            <div>
              <label className="block text-xs font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="Name"
                className="mt-1 p-2 block bg-gray-50 w-full border-none rounded-md shadow-sm focus:ring-0"
                placeholder="Name"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700">
                Employee ID
              </label>
              <input
                type="text"
                name="Employee ID"
                className="mt-1 p-2 bg-gray-50 block w-full border-none rounded-md shadow-sm focus:ring-0"
                placeholder="Employee ID"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700">
                Mobile Number
              </label>
              <input
                type="text"
                name="Mobile No"
                className="mt-1 p-2 block bg-gray-50 w-full border-none rounded-md shadow-sm focus:ring-0"
                placeholder="Mobile No"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="brand_logo_dataURI"
                className="mt-1 p-2 block bg-gray-50 w-full border-none rounded-md shadow-sm focus:ring-0"
                placeholder="Email"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700">
                Department
              </label>
              <select 
              className="w-full border bg-gray-50 rounded text-xs p-1"
            //   value={selectedDeptId}
            //   onChange={handleDeptChange}
            >
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
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700">
                Sub Department
              </label>
              <select 
              className="w-full border bg-gray-50 rounded text-xs p-1"
            //   value={selectedDeptId}
            //   onChange={handleDeptChange}
            >
              <option value="">Select a subdepartment</option>
                {subdepartments.length > 0 ? (
                  subdepartments.map((dept) => (
                    <option key={dept._id} value={dept._id}>
                      {dept.sub_department_name}
                    </option>
                  ))
                ) : (
                  <option value="">No subdepartments available</option> // Optional: placeholder for no departments
                )}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700">
                Designation
              </label>
              <select 
              className="w-full border bg-gray-50 rounded text-xs p-1"
            //   value={selectedDeptId}
            //   onChange={handleDeptChange}
            >
              <option value="">Select a designation</option>
                {designations.length > 0 ? (
                  designations.map((dept) => (
                    <option key={dept._id} value={dept._id}>
                      {dept.designation_name}
                    </option>
                  ))
                ) : (
                  <option value="">No designation available</option> // Optional: placeholder for no departments
                )}
              </select>
            </div>
          </div>

          <div className="flex justify-center gap-x-3">
          <button
              type="button"
              onClick={onClose}
              className="px-6 py-2  bg-white rounded-lg shadow-md hover:bg-gray-200 focus:outline-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPeopleModal;

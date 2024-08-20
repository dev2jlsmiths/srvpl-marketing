import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;

const AddPeopleModal = ({ emp_id, modal_name, onClose }) => {
  const navigate = useNavigate()
  const [subdepartments, setSubDepartments] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    emp_id: "",
    mobile: "",
    email: "",
    department_id: "",
    sub_department_id: "",
    designation_id: "",
    avatar: "",
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
        console.error("Error fetching subdepartments:", error);
      }
    };

    fetchSubDepartments();
  }, [accessToken]);

  useEffect(() => {
    const fetchDesignations = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/v1/platform/designation/get?page=1&limit=100`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setDesignations(response.data.data);
      } catch (error) {
        console.error("Error fetching designations:", error);
      }
    };

    fetchDesignations();
  }, [accessToken]);

  useEffect(() => {
    if (emp_id && modal_name === "edit") {
      const fetchPersonDetails = async () => {
        try {
          const response = await axios.get(`${apiUrl}/v1/people/get/${emp_id}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          setFormData(response.data.data); // Prefill the form with the fetched data
        } catch (error) {
          console.error("Error fetching person details:", error);
        }
      };

      fetchPersonDetails();
    }
  }, [emp_id, modal_name, accessToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const dataUri = reader.result;
      setFormData((prevFormData) => ({
        ...prevFormData,
        avatar: dataUri,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = modal_name === "edit" ? "put" : "post";
      const url =
        modal_name === "edit"
          ? `${apiUrl}/v1/people/edit/${emp_id}`
          : `${apiUrl}/v1/people/add`;

          const { _id,designation_name,sub_department_name, department_name, ...dataToSubmit } = formData;

          const body = JSON.stringify(dataToSubmit);
      
      await axios[method](url, body, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      toast.success(`Person ${modal_name === "edit" ? "updated" : "added"} successfully!`);
      onClose();
      navigate(0)
    } catch (error) {
      console.error(`Error ${modal_name === "edit" ? "updating" : "adding"} person:`, error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex text-xs items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg  w-full max-w-4xl">
        <div className="flex justify-between items-center mb-4 border-b p-4">
          <h2 className="text-2xl font-semibold">{modal_name === "edit" ? "Edit Person" : "Add Person"}</h2>
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
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-4 text-left gap-6 mb-6 p-4">
            <div>
              <label className="block text-xs font-medium text-gray-700">
                Profile Image
              </label>
              <input
                type="file"
                name="avatar"
                className="mt-1  block  w-full border-none rounded-md shadow-sm focus:ring-0"
                onChange={handleFileChange}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                className="mt-1 p-2 block bg-gray-50 w-full border-none rounded-md shadow-sm focus:ring-0"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700">
                Employee ID
              </label>
              <input
                type="text"
                name="emp_id"
                className="mt-1 p-2 bg-gray-50 block w-full border-none rounded-md shadow-sm focus:ring-0"
                placeholder="Employee ID"
                value={formData.emp_id}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700">
                Mobile Number
              </label>
              <input
                type="text"
                name="mobile"
                className="mt-1 p-2 block bg-gray-50 w-full border-none rounded-md shadow-sm focus:ring-0"
                placeholder="Mobile No"
                value={formData.mobile}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="-mt-1 p-2 block bg-gray-50 w-full border-none rounded-md shadow-sm focus:ring-0"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700">
                Department
              </label>
              <select
                name="department_id"
                className="w-full border bg-gray-50 rounded text-xs p-1"
                value={formData.department_id}
                onChange={handleChange}
              >
                <option value="">Select a department</option>
                {departments.length > 0 ? (
                  departments.map((dept) => (
                    <option key={dept._id} value={dept._id}>
                      {dept.department_name}
                    </option>
                  ))
                ) : (
                  <option value="">No departments available</option>
                )}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700">
                Sub Department
              </label>
              <select
                name="sub_department_id"
                className="w-full border bg-gray-50 rounded text-xs p-1"
                value={formData.sub_department_id}
                onChange={handleChange}
              >
                <option value="">Select a subdepartment</option>
                {subdepartments.length > 0 ? (
                  subdepartments.map((dept) => (
                    <option key={dept._id} value={dept._id}>
                      {dept.sub_department_name}
                    </option>
                  ))
                ) : (
                  <option value="">No subdepartments available</option>
                )}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700">
                Designation
              </label>
              <select
                name="designation_id"
                className="w-full border bg-gray-50 rounded text-xs p-1"
                value={formData.designation_id}
                onChange={handleChange}
              >
                <option value="">Select a designation</option>
                {designations.length > 0 ? (
                  designations.map((dept) => (
                    <option key={dept._id} value={dept._id}>
                      {dept.designation_name}
                    </option>
                  ))
                ) : (
                  <option value="">No designations available</option>
                )}
              </select>
            </div>
          </div>

          <div className="flex justify-center gap-x-3 p-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-white rounded-lg shadow-md hover:bg-gray-200 focus:outline-none"
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

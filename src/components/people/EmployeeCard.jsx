import React, { useState } from "react";
import AddPeopleModal from "./AddPeopleModal";
import People from "./People";

const EmployeeCard = ({ person }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showModal, setShowModal] = useState(false)

  const { _id,avatar, department_name, designation_name, sub_deprtment_name, email, emp_id, mobile, name } = person;

  console.log("People>>>??",person)
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleAddPeople = () => {
    setShowModal(true);
}

const handleClose = () => {
    setShowModal(false);
}
  return (
    <div className="relative max-w-xs rounded-lg shadow-lg p-4 bg-white flex flex-col justify-start">
      {/* Image Section */}
      <div className="flex justify-between">
        <div className="w-16 h-16 rounded overflow-hidden">
          <img
            src={avatar} 
            alt={name}
            className="object-cover w-full h-full"
          />
        </div>
        <div onClick={toggleDropdown} className="cursor-pointer relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
            />
          </svg>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
              <ul>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={handleAddPeople}>Edit Profile</li>
              </ul>
            </div>
          )}
        </div>
        {showModal && (
          <AddPeopleModal 
          emp_id={_id}
          modal_name="edit"
          onClose={handleClose}
          />
        )}
      </div>
      {/* Employee Info */}
      <div className="text-start mt-4">
        <h2 className="text-sm font-semibold text-gray-800">{name}</h2>
        <p className="text-xs text-gray-500">{email}</p>
      </div>
      {/* Divider */}
      <div className="border-t border-gray-200 my-4 w-full"></div>
      {/* Employee ID and Designation */}
      <div className="flex justify-between w-full text-sm text-gray-600">
        <div className="flex flex-col items-start">
          <span className="text-sm font-medium">EMPLOYEE ID</span>
          <span className="text-xs">{emp_id}</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-sm font-medium">DESIGNATION</span>
          <span className="text-xs">{designation_name}</span>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;

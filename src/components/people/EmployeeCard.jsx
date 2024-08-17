import React from "react";

const EmployeeCard = ({person}) => {
  const {avatar,department_name,designation_name,sub_deprtment_name,email,emp_id,mobile,name} = person
  return (
    <div className="max-w-xs rounded-lg shadow-lg p-4 bg-white flex flex-col justify-start ">
      {/* Image Section */}
      <div className="flex gap-52">
        <div className="w-16 h-16 rounded overflow-hidden">
          <img
            src={avatar} // Replace with the actual image URL
            alt="Lindsey Stroud"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
            />
          </svg>
        </div>
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

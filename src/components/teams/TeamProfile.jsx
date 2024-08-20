import React from "react";

const TeamProfile = () => {
  return (
    <div className="w-full bg-gray-50 h-screen">
      <div className="py-4">
        <h1 className="text-sm font-semibold ml-4">Profile</h1>
      </div>
      <div className="bg-white  p-6 max-w-6xl ml-4 ">
        <div className="flex justify-between">
          <div className="flex gap-x-4">
            <div className="w-16 h-16 rounded overflow-hidden">
              <img
                src="https://via.placeholder.com/150" // Replace with the actual image URL
                alt="Lindsey Stroud"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="text-start ">
              <h2 className="text-sm font-semibold text-gray-800">
                Lindsey Stroud
              </h2>
              <p className="text-xs text-gray-500">lindsey.stroud@gmail.com</p>
              <div className="flex">
                <span className="text-xs font-medium">EMPLOYEE ID -</span>
                <span className="text-xs">ID083543</span>
              </div>
            </div>
          </div>
          <div className="">
            <button className="text-xs text-white bg-blue-900 px-4 py-1">
              Save
            </button>
          </div>
        </div>

        <form>
          <div className="grid grid-cols-4 text-left  gap-6 mb-6 mt-6">
            <div>
              <label className="block text-xs font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="Name"
                className="mt-1 p-1 block bg-gray-50 w-full border-none rounded-md shadow-sm focus:ring-0 placeholder:text-xs"
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
                className="mt-1 p-1 bg-gray-50 block w-full border-none rounded-md shadow-sm focus:ring-0 placeholder:text-xs"
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
                className="mt-1 p-1 block bg-gray-50 w-full border-none rounded-md shadow-sm focus:ring-0 placeholder:text-xs"
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
                className="mt-1 p-1 block bg-gray-50 w-full border-none rounded-md shadow-sm focus:ring-0 placeholder:text-xs"
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
                <option value="">No departments available</option> // Optional:
                placeholder for no departments
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
                <option value="">No subdepartments available</option> //
                Optional: placeholder for no departments
              </select>
            </div>
            <div></div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeamProfile;

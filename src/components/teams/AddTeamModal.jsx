import React, { useState } from "react";

const AddTeamModal = ({ onClose }) => {
  const [people, setPeople] = useState([{ name: "", reporting: "" }]);

  const handleAddPerson = () => {
    setPeople([...people, { name: "", reporting: "" }]);
  };

  const handlePersonChange = (index, field, value) => {
    const updatedPeople = [...people];
    updatedPeople[index][field] = value;
    setPeople(updatedPeople);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex text-xs items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg  w-full max-w-md">
        <div className="flex justify-between items-center mb-4 border-b p-4">
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
        <form>
          <div className="flex flex-col text-left gap-4 mb-6 p-4">
            <div className="flex items-center gap-x-2">
              <label className="block text-xs w-1/5 font-medium text-gray-700">
                Team Name
              </label>
              <input
                type="text"
                name="Name"
                className="mt-1 p-2 block grow bg-gray-50 border-none rounded-md shadow-sm focus:ring-0"
                placeholder="Name"
              />
            </div>
            <div className="flex items-center gap-x-6">
              <label className="block w-1/5 text-xs font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="Description"
                className="mt-1 p-2 bg-gray-50 block w-full border-none rounded-md shadow-sm focus:ring-0 resize-none"
                placeholder="Type Here ...."
              />
            </div>
            <div className="flex items-center gap-x-2">
              <label className="block w-1/5 text-xs font-medium text-gray-700">
                Team Manager
              </label>
              <input
                type="text"
                name="Name"
                className="mt-1 p-2 grow block bg-gray-50 border-none rounded-md shadow-sm focus:ring-0"
                placeholder="Name"
              />
            </div>
            <div className="flex gap-x-36">
            <label className="block text-xs font-medium text-gray-700">
                    Add People
                  </label>
                  <label className="block text-xs font-medium text-gray-700">
                    Reporting
                  </label>
            </div>
            {people.map((person, index) => (
              <div key={index} className="flex justify-between items-center gap-2">
                <div className="flex flex-col w-1/2">
               
                  <input
                    type="text"
                    value={person.name}
                    onChange={(e) => handlePersonChange(index, "name", e.target.value)}
                    className="mt-1 p-2 bg-gray-50 block w-full border-none rounded-md shadow-sm focus:ring-0"
                    placeholder="Person Name"
                  />
                </div>
                <div className="flex flex-col w-1/2">
                
                  <input
                    type="text"
                    value={person.reporting}
                    onChange={(e) => handlePersonChange(index, "reporting", e.target.value)}
                    className="mt-1 p-2 bg-gray-50 block w-full border-none rounded-md shadow-sm focus:ring-0"
                    placeholder="Reporting To"
                  />
                </div>
                {index === people.length - 1 && (
                  <button
                    type="button"
                    onClick={handleAddPerson}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-x-3 pb-4">
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

export default AddTeamModal;

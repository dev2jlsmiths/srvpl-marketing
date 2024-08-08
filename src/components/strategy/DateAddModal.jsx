import React from 'react'

const DateAddModal = ({onClose}) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex text-xs items-center justify-center z-50">
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-base font-semibold">Add Important Date</h2>
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
      <form >
        <div className="flex flex-col text-left  gap-6 mb-6">
            <div className="flex justify-between ">
          <div>
            <label className="block text-xs font-medium text-gray-700">
              Date
            </label>
            <input
              type="date"
              className="mt-1 p-2 block w-full bg-gray-50 border-gray-300 rounded-md shadow-sm"
              placeholder="Date"
            />
      
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="brandCompanyName"
            
              className="mt-1 p-2 block w-full bg-gray-50 border-gray-300 rounded-md shadow-sm"
              placeholder="Name"
            />
    
          </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700">
              Description
            </label>
            <textarea
              type="text"
              name="Description"
              className="mt-1 p-2 block w-full bg-gray-50 border-gray-300 rounded-md shadow-sm"
              placeholder="Description"
            />

          </div>

        </div>
    
        <div className="flex justify-center mt-6">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-200 px-4 py-2 rounded-md shadow-md mr-2 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition-colors duration-300"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
  )
}

export default DateAddModal
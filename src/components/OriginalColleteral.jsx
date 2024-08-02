import React from "react";

const items = [
  { name: "Brochure", icon: "https://via.placeholder.com/50" },
  { name: "Product 1", icon: "https://via.placeholder.com/50" },
  { name: "Product 2", icon: "https://via.placeholder.com/50" },
  { name: "Product 3", icon: "https://via.placeholder.com/50" },
  { name: "Product 4", icon: "https://via.placeholder.com/50" },
];

const OriginalCollateral = () => {
  return (
    <main className="max-w-full  flex">
      <div className="min-h-screen text-sm w-full bg-gray-100 p-8">
        <header className="flex justify-between items-center mb-8">
          <div className="flex space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-2 rounded-full border border-gray-300"
              />
              <svg
                className="w-6 h-6 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-4.35-4.35m1.4-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-blue-500 font-semibold">
              Add Collateral
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-full">
              + Add Folder
            </button>
            <div className="relative">
              <button className="flex items-center space-x-2">
                <span className="text-gray-700">Account</span>
                <img
                  src="https://via.placeholder.com/40"
                  alt="Profile"
                  className="rounded-full w-10 h-10"
                />
              </button>
            </div>
          </div>
        </header>
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-xl text-left text-blue-400 font-semibold mb-6">
            Original Collateral
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {items.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center border border-gray-300 rounded-lg shadow-lg p-6 bg-white hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              >
                <img
                  src={item.icon}
                  alt={item.name}
                  className="h-28 w-28 mb-4"
                />
                <h3 className=" font-semibold">{item.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default OriginalCollateral;

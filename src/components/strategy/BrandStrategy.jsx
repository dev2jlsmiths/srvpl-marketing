import axios from "axios";
import { PlusCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import DateAddModal from "./DateAddModal";
import FileUploadModal from "./FileUploadModal";

const BrandStrategy = () => {
  const [platforms, setPlatforms] = useState([]);
  const [focus, setFocus] = useState([]);
  const token = localStorage.getItem("access_token");
  const [focusGroups, setFocusGroups] = useState([
    { percentage: "", focusType: "Awareness" },
  ]);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [fileUploadModal, setFileUploadModal] = useState(false)

  const handleAddModal = () => {
    setShowModal(true);
    
  };
  const handleFileUploadModal = () => {
    setFileUploadModal(true)
  }
  const handleClose = () => {
    setShowModal(false);
    setFileUploadModal(false)
  };

  const handleAddGroup = () => {
    setFocusGroups([
      ...focusGroups,
      { percentage: "", focusType: "Awareness" },
    ]);
  };

  const months = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
  ];

  const years = Array.from(
    { length: 10 },
    (_, i) => new Date().getFullYear() - i
  );

  const handleInputChange = (index, field, value) => {
    const updatedGroups = focusGroups.map((group, i) =>
      i === index ? { ...group, [field]: value } : group
    );
    setFocusGroups(updatedGroups);
  };

  const handlePlatformChange = (platform) => {
    setSelectedPlatforms((prevSelected) =>
      prevSelected.includes(platform)
        ? prevSelected.filter((p) => p !== platform)
        : [...prevSelected, platform]
    );
  };

  useEffect(() => {
    // Fetch platforms from the API
    const fetchPlatforms = async () => {
      try {
        const response = await fetch(
          `http://192.168.1.38:8000/v1/platform/get`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setPlatforms(data.data); // Assuming the response data is an array of platforms
      } catch (error) {
        console.error("Error fetching platforms:", error);
      }
    };

    fetchPlatforms();
  }, []);

  useEffect(() => {
    const fetchFocus = async () => {
      try {
        const response = await fetch(
          `http://192.168.1.38:8000/v1/platform/focus/get?page=1&limit=100`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setFocus(data.data); // Assuming the response data is an array of focus items
      } catch (error) {
        console.error("Error fetching focus:", error);
      }
    };

    fetchFocus();
  }, [token]);

  console.log("Fetch focus>>", selectedPlatforms);

  return (
    <div>
      <div className="p-4 bg-gray-50">
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-center font-semibold">Strategy</h1>
            <div className="mb-6 flex space-x-2">
              <select
                className="border p-2 rounded bg-gray-50"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
              >
                {months.map((month) => (
                  <option key={month.value} value={month.value}>
                    {month.label}
                  </option>
                ))}
              </select>
              <select
                className="border p-2 rounded bg-gray-50"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="bg-white p-2">
            <h2 className="text-sm font-bold mb-4 uppercase">Platform</h2>
            <div className="flex space-x-4">
              {platforms.map((platform) => (
                <label
                  key={platform._id}
                  className="flex items-center space-x-2"
                >
                  <input
                    type="checkbox"
                    checked={selectedPlatforms.includes(platform.platform_name)}
                    onChange={() =>
                      handlePlatformChange(platform.platform_name)
                    }
                  />
                  <img
                    className="w-6 h-6"
                    src={platform.platform_logo}
                    alt=""
                  />
                  <span>{platform.platform_name}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="bg-white p-2">
            <h2 className="text-sm font-bold mb-2 uppercase">Focus</h2>
            <div className="flex flex-wrap">
              {focusGroups.map((group, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <input
                    type="number"
                    className="border p-1 w-16 rounded bg-gray-50"
                    placeholder="30"
                    value={group.percentage}
                    onChange={(e) =>
                      handleInputChange(index, "percentage", e.target.value)
                    }
                  />
                  <span>%</span>
                  <select
                    className="border p-1 rounded bg-gray-50 text-sm"
                    value={group.focusType}
                    onChange={(e) =>
                      handleInputChange(index, "focusType", e.target.value)
                    }
                  >
                    {focus.map((item) => (
                      <option key={item.id} value={item.focus_name}>
                        {item.focus_name}
                      </option>
                    ))}
                  </select>
                  <PlusCircle onClick={handleAddGroup} height="18" width="18" />
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center items-center bg-white p-2 mt-2">
            <label className="text-sm w-1/6 uppercase font-semibold">
              Product to Focus
            </label>
            <input
              type="text"
              className="border p-2 w-full mt-2 bg-gray-50 rounded"
              placeholder="Type Here"
            />
          </div>
        </div>

        <div className="mb-6">
          <div className="bg-white p-2">
            <h2 className="text-xl font-bold mb-4">Post</h2>
            <div className="flex flex-col space-y-4">
              {selectedPlatforms.map((platform) => (
                <div key={platform} className="flex items-center space-x-4">
                  <span className="text-sm">{platform}</span>
                  <div className="flex justify-center items-center gap-x-2">
                    <label className="text-sm" htmlFor="">
                      Time interval
                    </label>
                    <select className="border bg-gray-50 rounded text-sm p-1">
                      <option>Daily</option>
                      <option>Weekly</option>
                      <option>Monthly</option>
                    </select>
                  </div>
                  <div className="flex justify-center items-center gap-x-4">
                    <label className="text-center text-sm" htmlFor="">
                      Number of Posts
                    </label>
                    <input
                      type="number"
                      className="border p-2 w-16 text-xs bg-gray-50"
                      placeholder="12"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="bg-white p-2">
            <h2 className="text-xl font-bold mb-4">Blogs</h2>
            <div className="flex items-center space-x-4">
              <label className="text-sm" htmlFor="">
                Time interval
              </label>
              <select className="border p-1 rounded bg-gray-50">
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
              </select>
              <div className="flex items-center justify-center gap-x-2">
                <label className="text-sm" htmlFor="">
                  Number of post
                </label>
                <input
                  type="number"
                  className="border p-1 w-16 rounded bg-gray-50 text-xs"
                  placeholder="12"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mb-6">
          <div className="bg-white p-2">
            <h2 className="text-xl font-bold mb-4">Email Marketing</h2>
            <div className="flex items-center space-x-4">
              <label className="text-sm" htmlFor="">
                Time interval
              </label>
              <select className="border p-1 rounded bg-gray-50">
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
              </select>
              <div className="flex items-center justify-center gap-x-2">
                <label className="text-sm" htmlFor="">
                  Number of email
                </label>
                <input
                  type="number"
                  className="border p-1 w-16 rounded bg-gray-50 text-xs"
                  placeholder="12"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mb-6">
          <div className="bg-white p-2">
            <h2 className="text-xl font-bold mb-4">SMS</h2>
            <div className="flex items-center space-x-4">
              <label className="text-sm" htmlFor="">
                Time interval
              </label>
              <select className="border p-1 rounded bg-gray-50">
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
              </select>
              <div className="flex items-center justify-center gap-x-2">
                <label className="text-sm" htmlFor="">
                  Number of SMS
                </label>
                <input
                  type="number"
                  className="border p-1 w-16 rounded bg-gray-50 text-xs"
                  placeholder="12"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mb-6">
          <div className="bg-white p-2">
            <h2 className="text-xl font-bold mb-4">Newsletter</h2>
            <div className="flex items-center space-x-4">
              <label className="text-sm" htmlFor="">
                Time interval
              </label>
              <select className="border p-1 rounded bg-gray-50">
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
              </select>
              <div className="flex items-center justify-center gap-x-2">
                <label className="text-sm" htmlFor="">
                  Number of newsletter
                </label>
                <input
                  type="number"
                  className="border p-1 w-16 rounded bg-gray-50 text-xs"
                  placeholder="12"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center bg-white p-2 mt-2">
          <label className="text-sm w-1/6 uppercase font-semibold">
            This month #tags
          </label>
          <input
            type="text"
            className="border p-2 w-full mt-2 bg-gray-50 rounded"
            placeholder="Type Here"
          />
        </div>

        <div className="mb-6">
          <div className="bg-white p-2">
            <h2 className="text-lg font-bold mb-4 uppercase">Important Date</h2>
            <div className="flex">
              <div className="w-1/3 border bg-blue-100 p-4 rounded">
                <div className="flex items-center mb-4">
                  <div className="mr-3">
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
                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-xl font-bold">12/12/24</p>
                    <a href="#" className="text-blue-600 hover:underline">
                      Independence Day
                    </a>
                    <p className="text-gray-600 text-sm">
                      Adipisci maxime eum aliquid aut laborum in delectus quae
                      eum.
                    </p>
                  </div>
                </div>
              </div>
              <button
                className="mt-4 text-blue-600 hover:underline flex justify-end items-end"
                onClick={handleAddModal}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
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
            </div>
            {showModal && <DateAddModal onClose={handleClose} />}
          </div>
        </div>

        <div className="mb-6">
          <div className="bg-white p-2">
            <div className="flex justify-between items-center">
              <h2 className="text-sm font-semibold mb-4 uppercase">File Upload </h2>
              <button onClick={handleFileUploadModal}>
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
                    d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15"
                  />
                </svg>
              </button>
            </div>
            <div className="flex"></div>
            {fileUploadModal && <FileUploadModal onClose={handleClose} />}
          </div>
        </div>

        <div className="flex justify-start items-center bg-white gap-x-3 p-2 mt-2">
          <label className="text-sm  uppercase font-semibold">Budget</label>
          <input
            type="text"
            className="border p-1 w-1/6 mt-2 bg-gray-50 rounded"
            placeholder="0000"
          />
          <p className="text-sm font-semibold">INR/Monthly</p>
        </div>

        <div className="mt-6">
          <div className="bg-white p-2">
            <h2 className="text-xl font-bold mb-4">Campaign</h2>
            <textarea
              className="w-full bg-gray-50 p-3 rounded"
              placeholder="Type Here"
            />
          </div>
          <div className="bg-white p-2 ">
            <h2 className="text-xl font-bold mb-4 rounded">Remarks</h2>
            <textarea
              className="w-full bg-gray-50 p-3"
              placeholder="Type Here"
            />
          </div>
        </div>
      </div>
      <div className="">
        <button className="bg-blue-500 text-xs text-white px-4 py-2">
          Submit
        </button>
      </div>
    </div>
  );
};

export default BrandStrategy;

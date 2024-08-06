import axios from "axios";
import React, { useEffect, useState } from "react";

const BrandStrategy = () => {
    const [platforms, setPlatforms] = useState([]);
    const token = localStorage.getItem("access_token")
    useEffect(() => {
      // Fetch platforms from the API
      const fetchPlatforms = async () => {
        try {
          const response = await fetch(`http://192.168.1.38:8000/v1/platform/get`,{
            headers:{
                Authorization : `Bearer ${token}`
            }
          });
          const data = await response.json();
          setPlatforms(data.data); // Assuming the response data is an array of platforms
        } catch (error) {
          console.error("Error fetching platforms:", error);
        }
      };
  
      fetchPlatforms();
    }, []);

    console.log("Fetch platform>>",platforms)
  return (
    <div>
      <div className="p-4 bg-gray-50">
        <div className="mb-6">
        <div className="bg-white p-2">
          <h2 className="text-lg font-bold mb-4 uppercase">Platform</h2>
          <div className="flex space-x-4">
              {platforms.map((platform) => (
                <label key={platform._id} className="flex items-center space-x-2">
                  <input type="checkbox" />
                  <img className="w-6 h-6" src={platform.platform_logo} alt="" />
                  <span>{platform.platform_name}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-6">
            <div className="bg-white p-2">
          <h2 className="text-xl font-bold mb-2">Focus</h2>
          <div className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <input
                type="number"
                className="border p-1 w-16 rounded bg-gray-50"
                placeholder="30"
              />
              <span>%</span>
              <select className="border p-1 rounded bg-gray-50 text-sm">
                <option>Awareness</option>
                <option>Engagement</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                className="border p-1 w-16 rounded bg-gray-50"
                placeholder="40"
              />
              <span>%</span>
              <select className="border p-1 rounded bg-gray-50 text-sm">
                <option>Engagement</option>
                <option>Awareness</option>
              </select>
            </div>
            </div>
          </div>
          <div className="flex justify-center items-center bg-white p-2 mt-2">
            <label className="text-lg w-1/5 uppercase font-semibold ">Product to Focus</label>
          <input
            type="text"
            className="border p-2 w-full mt-2 bg-gray-50 rounded"
            placeholder="Type Here"
          />
          </div>
          
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">Post</h2>
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-4">
              <span>Facebook</span>
              <select className="border p-2">
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
              </select>
              <input
                type="number"
                className="border p-2 w-16"
                placeholder="12"
              />
            </div>
            <div className="flex items-center space-x-4">
              <span>LinkedIn</span>
              <select className="border p-2">
                <option>Select Day</option>
                <option>Monday</option>
                <option>Tuesday</option>
                <option>Wednesday</option>
              </select>
              <input
                type="number"
                className="border p-2 w-16"
                placeholder="0"
              />
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">Blogs</h2>
          <div className="flex items-center space-x-4">
            <select className="border p-2">
              <option>Daily</option>
              <option>Weekly</option>
              <option>Monthly</option>
            </select>
            <input type="number" className="border p-2 w-16" placeholder="12" />
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">Email Marketing</h2>
          <div className="flex items-center space-x-4">
            <select className="border p-2">
              <option>Daily</option>
              <option>Weekly</option>
              <option>Monthly</option>
            </select>
            <input type="number" className="border p-2 w-16" placeholder="12" />
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">SMS</h2>
          <div className="flex items-center space-x-4">
            <select className="border p-2">
              <option>Daily</option>
              <option>Weekly</option>
              <option>Monthly</option>
            </select>
            <input type="number" className="border p-2 w-16" placeholder="12" />
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">Newsletter</h2>
          <div className="flex items-center space-x-4">
            <select className="border p-2">
              <option>Daily</option>
              <option>Weekly</option>
              <option>Monthly</option>
            </select>
            <input type="number" className="border p-2 w-16" placeholder="12" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandStrategy;

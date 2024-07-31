import React, { useState, useEffect } from "react";
import axios from "axios";
import BrandModal from "./AddBrandModal";
import Card from "./BrandCard";

function BrandPage() {
  const [brands, setBrands] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const accessToken = localStorage.getItem("access_token");
        const response = await axios.get(
          "http://192.168.1.38:5000/v1/brand/profile/get",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setBrands(response.data.data);
      } catch (error) {
        console.error("Error fetching brand data:", error);
      }
    };

    fetchBrands();
  }, []);

  return (
    <div className="min-h-screen bg-gray-200 min-w-screen text-xs">
      <header className="flex bg-white justify-end border-b pb-1 items-center">
        <button className="flex items-center gap-1 px-2 py-0.5 transition-colors duration-300">
          Settings
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
        </button>
      </header>
      <div className="bg-white min-h-screen pl-2 pt-2">
        <header className="flex justify-between items-center pb-8">
          <h1 className="text-xl text-blue-500 font-semibold pb-6">Account</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white px-3 py-1 rounded-md shadow-md hover:bg-blue-600 transition-colors duration-300"
          >
            Add Brand Profile
          </button>
        </header>
        <main>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6">
            {brands.map((brand) => (
              <Card
                key={brand._id}
                brand={{
                  name: brand.brand_name,
                  logo: brand.brand_logo,
                  id: brand._id,
                }}
              />
            ))}
          </div>
        </main>
      </div>
      <BrandModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

export default BrandPage;

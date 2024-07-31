import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
    <div className="min-h-screen min-w-screen text-xs pl-8 pt-2">
      <header className="flex justify-between items-center mb-4">
        <div className="flex space-x-4"></div>
        <div className="flex items-center space-x-4">
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
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-xl text-blue-500 font-semibold mb-6">Brands</h1>
        <input
          type="text"
          placeholder="Search"
          className="border rounded-md px-4 py-2 w-1/3"
        />
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600 transition-colors duration-300"
        >
          Add Brand Profile
        </button>
      </header>
      <main>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6">
          {brands.map((brand) => (
            <Link key={brand._id} to={`/brand/${brand._id}`}>
              <Card
                brand={{ name: brand.brand_name, logo: brand.brand_logo }}
              />
            </Link>
          ))}
        </div>
      </main>
      <BrandModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

export default BrandPage;

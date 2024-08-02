import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import AddFolderModal from "./AddFolderModal"; // Import the modal component

const OriginalCollateral = () => {
  const { id } = useParams();
  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [parentFolderId, setParentFolderId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem("access_token");
        const response = await axios.get(
          `http://192.168.1.38:5000/v1/collateral/folder/get?brand_id=${id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleFolderAdded = (newFolder) => {
    setItems([...items, newFolder]);
  };

  return (
    <main className="max-w-full flex">
      <div className="min-h-screen text-xs w-full p-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-xl text-left text-blue-400 font-semibold mb-6">
            Original Collateral
          </h1>
          <div className="flex items-center space-x-4">
            <Link to="/add-collateral" className="text-blue-500 font-semibold">
              Add Collateral
            </Link>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-full"
            >
              + Add Folder
            </button>
          </div>
        </header>
        <div className="bg-white p-8 rounded-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {items.map((item) => (
              <Link
                to={`/item/${item._id}`}
                key={item._id}
                className="flex flex-col items-center justify-center border border-gray-300 rounded-lg shadow-lg p-6 bg-white hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              >
                <img
                  src="https://via.placeholder.com/50"
                  alt={item.name}
                  className="h-28 w-28 mb-4"
                />
                <h3 className="font-semibold">{item.name}</h3>
              </Link>
            ))}
          </div>
        </div>
        <AddFolderModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          brandId={id}
          parentFolderId={parentFolderId}
          onFolderAdded={handleFolderAdded}
        />
      </div>
    </main>
  );
};

export default OriginalCollateral;

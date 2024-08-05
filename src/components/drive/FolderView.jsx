import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import AddFolderButton from "./AddFolderButton";
import Folder from "./Folder";

const FolderView = () => {
  const { brandId, parentId } = useParams(); // Retrieve parentId from URL parameters
  const [currentFolder, setCurrentFolder] = useState(null);
  const [folders, setFolders] = useState([]);

  const fetchFolders = async (parentId) => {
    try {
      const response = await axios.get(
        `http://192.168.1.38:8000/v1/collateral/folder/get/${parentId}`,
        {
          params: { brand_id: brandId },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching folders:", error);
      return [];
    }
  };

  useEffect(() => {
    const loadFolders = async () => {
      const fetchedFolders = await fetchFolders(parentId);
      setFolders(fetchedFolders);
    };
    loadFolders();
  }, [parentId, brandId]);

  useEffect(() => {
    if (folders.length > 0) {
      const folder = folders.find((folder) => folder._id === parentId);
      setCurrentFolder(
        folder || { name: "Default Folder", subfolders: [], files: [] }
      );
    }
  }, [folders, parentId]);

  const handleFolderAdded = (newFolder) => {
    const updatedFolders = [...folders, newFolder];
    setFolders(updatedFolders);
  };

  return (
    <main className="max-w-full flex">
      <div className="min-h-screen text-xs w-full p-2">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-xl text-left text-blue-400 font-semibold mb-6">
            Original Collateral
          </h1>
          <div className="flex items-center space-x-4">
            <AddFolderButton
              parentFolderId={parentId}
              brandId={brandId}
              onFolderAdded={handleFolderAdded}
            />
          </div>
        </header>
        <div className="bg-white p-1 rounded-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-8 gap-4">
            {folders.map((folder) => (
              <div
                key={folder._id}
                className="flex flex-col items-center justify-center rounded-lg bg-white hover:shadow-md transition-shadow duration-300 cursor-pointer"
              >
                <Link
                  to={`/item/${brandId}/${folder._id}`}
                  className="flex flex-col items-center justify-center"
                >
                  <img
                    src="https://i.redd.it/cglk1r8sbyf71.png" // Placeholder image
                    alt={folder.name}
                    className="h-16 w-16 mb-4"
                  />
                  <h3 className="font-semibold">{folder.name}</h3>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default FolderView;

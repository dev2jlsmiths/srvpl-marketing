import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Folder from "./Folder";
import AddFolderButton from "./AddFolderButton";

const FolderView = ({ brandId }) => {
  const { id: parentId } = useParams();
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
      const foldersWithSubfolders = await Promise.all(
        fetchedFolders.map(async (folder) => {
          const subfolders = await fetchFolders(folder._id);
          return { ...folder, subfolders };
        })
      );
      setFolders(foldersWithSubfolders);
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
    const updatedFolders = folders.map((folder) => {
      if (folder._id === currentFolder._id) {
        return { ...folder, subfolders: [...folder.subfolders, newFolder] };
      }
      return folder;
    });
    setFolders(updatedFolders);
  };

  return (
    <div>
      <h2 className="text-xl font-bold">
        {currentFolder ? `Folder: ${currentFolder.name}` : "Loading Folder..."}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentFolder && currentFolder.subfolders.length > 0
          ? currentFolder.subfolders.map((subfolder) => (
              <Folder
                key={subfolder._id}
                folder={subfolder}
                onFolderAdded={handleFolderAdded}
              />
            ))
          : currentFolder && <div>No subfolders available.</div>}
      </div>
      <AddFolderButton
        parentFolderId={parentId}
        brandId={brandId}
        onFolderAdded={handleFolderAdded}
      />
    </div>
  );
};

export default FolderView;

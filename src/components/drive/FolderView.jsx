import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Folder from "./Folder";
import AddFolderButton from "./AddFolderButton";

const FolderView = () => {
  const { id } = useParams();
  const [currentFolder, setCurrentFolder] = useState(null);
  const [folders, setFolders] = useState([]);

  const fetchFolders = async (parentId) => {
    try {
      const response = await axios.get(
        `http://192.168.1.38:5000/v1/collateral/folder/get/${parentId}`,
        {
          params: { brand_id: "66ac7c570b8427167081ad9c" },
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
      const fetchedFolders = await fetchFolders(id);
      const foldersWithSubfolders = await Promise.all(
        fetchedFolders.map(async (folder) => {
          const subfolders = await fetchFolders(folder._id);
          return { ...folder, subfolders };
        })
      );
      setFolders(foldersWithSubfolders);
    };
    loadFolders();
  }, [id]);

  useEffect(() => {
    if (folders.length > 0) {
      const folder = folders.find((folder) => folder._id === id);
      setCurrentFolder(
        folder || { name: "Default Folder", subfolders: [], files: [] }
      );
    }
  }, [folders, id]);

  if (!currentFolder) {
    return <div>Loading...</div>;
  }

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
      <h2 className="text-xl font-bold">Folder: {currentFolder.name}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentFolder.subfolders.map((subfolder) => (
          <Folder
            key={subfolder._id}
            folder={subfolder}
            onFolderAdded={handleFolderAdded}
          />
        ))}
      </div>
      <AddFolderButton parentFolderId={id} onFolderAdded={handleFolderAdded} />
    </div>
  );
};

export default FolderView;

import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import AddFolderButton from "./AddFolderButton";
import AddCollateralButton from "./AddCollateralButton";

const FolderView = () => {
  const { id } = useParams(); // Get the current folder ID from URL
  const navigate = useNavigate();
  const [folders, setFolders] = useState([
    {
      id: "1",
      name: "Folder 1",
      subfolders: [],
      files: [{ id: "file1", name: "File 1" }],
    },
    // Add more folders and files here
  ]);

  const currentFolder =
    folders.find((folder) => folder.id === id) || folders[0]; // Default to first folder

  const handleFolderAdded = (newFolder) => {
    const updatedFolders = folders.map((folder) => {
      if (folder.id === currentFolder.id) {
        return { ...folder, subfolders: [...folder.subfolders, newFolder] };
      }
      return folder;
    });
    setFolders(updatedFolders);
  };

  return (
    <div>
      <h2 className="text-xl font-bold">Folder: {currentFolder.name}</h2>
      <div className="mt-4">
        {currentFolder.subfolders.map((folder) => (
          <div
            key={folder.id}
            className="p-2 border border-gray-300 rounded shadow-md bg-white"
          >
            <Link to={`/folder/${folder.id}`} className="text-blue-500">
              {folder.name}
            </Link>
          </div>
        ))}
        {currentFolder.files.map((file) => (
          <div
            key={file.id}
            className="p-2 border border-gray-300 rounded shadow-md bg-white"
          >
            <Link to={`/file/${file.id}`} className="text-blue-500">
              {file.name}
            </Link>
          </div>
        ))}
      </div>
      <div className="flex space-x-4 mt-4">
        <AddFolderButton
          parentFolderId={currentFolder.id}
          brandId="66ac7c570b8427167081ad9c" // Replace with actual brand ID
          onFolderAdded={handleFolderAdded}
        />
        <AddCollateralButton />
      </div>
    </div>
  );
};

export default FolderView;

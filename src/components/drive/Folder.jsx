import React from "react";
import { Link } from "react-router-dom";
import AddFolderButton from "./AddFolderButton";

const Folder = ({ folder, onFolderAdded }) => {
  return (
    <div className="p-4 border border-gray-300 rounded-lg shadow-md bg-white">
      <Link
        to={`/folder/${folder._id}`}
        className="text-blue-500 font-semibold"
      >
        {folder.name}
      </Link>
      <div className="ml-4 mt-2">
        {folder.subfolders && folder.subfolders.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {folder.subfolders.map((subfolder) => (
              <Folder
                key={subfolder._id}
                folder={subfolder}
                onFolderAdded={onFolderAdded}
              />
            ))}
          </div>
        ) : (
          <p>No subfolders</p>
        )}
      </div>
      <div className="mt-4">
        <AddFolderButton
          parentFolderId={folder._id}
          onFolderAdded={onFolderAdded}
        />
      </div>
    </div>
  );
};

export default Folder;

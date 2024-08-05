import React from "react";
import PropTypes from "prop-types";
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
      {/* <div className="mt-4">
        <AddFolderButton
          parentFolderId={folder._id}
          onFolderAdded={onFolderAdded}
        />
      </div> */}
    </div>
  );
};

Folder.propTypes = {
  folder: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    path: PropTypes.string,
    parentFolder: PropTypes.string,
    brand_id: PropTypes.string,
    createdAt: PropTypes.string,
    __v: PropTypes.number,
  }).isRequired,
  onFolderAdded: PropTypes.func.isRequired,
};

export default Folder;

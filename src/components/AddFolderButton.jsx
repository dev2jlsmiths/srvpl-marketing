import React, { useState } from "react";
import AddFolderModal from "./AddFolderModal";

const AddFolderButton = ({ parentFolderId, brandId, onFolderAdded }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded-full"
      >
        + Add Folder
      </button>
      <AddFolderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        parentFolderId={parentFolderId}
        brandId={brandId}
        onFolderAdded={onFolderAdded}
      />
    </>
  );
};

export default AddFolderButton;

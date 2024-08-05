import React, { useState } from "react";
import AddCollateralModal from "./AddCollateralModal";

const AddCollateralButton = ({ onCollateralAdded }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded-full"
      >
        + Add Collateral
      </button>
      <AddCollateralModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCollateralAdded={onCollateralAdded}
      />
    </>
  );
};

export default AddCollateralButton;

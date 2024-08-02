import React from "react";
import { Link } from "react-router-dom";

const AddCollateralButton = () => (
  <Link
    to="/add-collateral"
    className="bg-blue-500 text-white px-4 py-2 rounded-full"
  >
    + Add Collateral
  </Link>
);

export default AddCollateralButton;

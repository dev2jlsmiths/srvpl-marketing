import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ brand }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/brand/${brand.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="flex flex-col items-center text-sm justify-center border border-gray-300 rounded-lg shadow-lg p-6 bg-white hover:shadow-xl transition-shadow duration-300 cursor-pointer"
    >
      <img src={brand.logo} alt={brand.name} className="h-28 w-28 mb-4" />
      <h3 className=" font-semibold">{brand.name}</h3>
    </div>
  );
};

export default Card;

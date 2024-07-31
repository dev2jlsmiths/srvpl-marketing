import React from "react";

const Card = ({ brand }) => {
  const handleClick = () => {
    window.open(`/brand/${brand.id}`, "_blank");
  };

  return (
    <div
      onClick={handleClick}
      className="flex flex-col items-center text-sm justify-center border border-gray-300 rounded-lg shadow-lg p-1 bg-white hover:shadow-xl transition-shadow duration-300 cursor-pointer"
    >
      <img src={brand.logo} alt={brand.name} className="h-16 mb-4" />
      <h3 className="text-xs font-semibold">{brand.name}</h3>
    </div>
  );
};

export default Card;

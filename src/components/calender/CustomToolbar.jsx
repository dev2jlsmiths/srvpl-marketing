import React from "react";

const CustomToolbar = ({ label, onNavigate, onView }) => {
  return (
    <div className="rbc-toolbar flex justify-between items-center">
      <span className="rbc-toolbar-label">{label}</span>
      <div className="rbc-btn-group">
        <button
          onClick={() => onView("month")}
          className="bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-gray-600 mx-1"
        >
          Month
        </button>
        <button
          onClick={() => onView("week")}
          className="bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-gray-600 mx-1"
        >
          Week
        </button>
        <button
          onClick={() => onView("day")}
          className="bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-gray-600 mx-1"
        >
          Day
        </button>
        <button
          onClick={() => onView("agenda")}
          className="bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-gray-600 mx-1"
        >
          Agenda
        </button>
      </div>
    </div>
  );
};

export default CustomToolbar;

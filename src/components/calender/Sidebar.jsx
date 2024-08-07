// Sidebar.js
import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import default styles

const Sidebar = ({ onDateClick }) => {
  return (
    <div className="w-64 bg-gray-100 p-4 h-full">
      <h2 className="text-lg font-semibold mb-4">Mini Calendar</h2>
      <Calendar
        onClickDay={(date) => onDateClick(date)}
        className="react-calendar"
      />
    </div>
  );
};

export default Sidebar;

import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import default styles

const Sidebar = ({ onDateClick }) => {
  return (
    <div className="w-56 flex items-end text-xs bg-gray-100 p-2 h-full">
      {/* <h2 className="text-base mb-4">Mini Calendar</h2> */}
      <Calendar
        onClickDay={(date) => onDateClick(date)}
        className="react-calendar custom-calendar" // Add your custom class
      />
    </div>
  );
};

export default Sidebar;

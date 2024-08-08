import React from "react";

const CustomToolbar = ({ label, onNavigate, onView }) => {
  return (
    <div className="rbc-toolbar flex justify-between items-center">
      <span className="rbc-toolbar-label">{label}</span>
      <div className="rbc-btn-group flex">
        <button onClick={() => onView("month")} className="button mx-1">
          Month
        </button>
        <button onClick={() => onView("week")} className="button mx-1">
          Week
        </button>
        <button onClick={() => onView("day")} className="button mx-1">
          Day
        </button>
        <button onClick={() => onView("agenda")} className="button mx-1">
          Agenda
        </button>
      </div>
    </div>
  );
};

export default CustomToolbar;

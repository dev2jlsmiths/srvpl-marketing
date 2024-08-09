import React from "react";

const CustomToolbar = ({ label, onNavigate, onView }) => {
  return (
    <div className="rbc-toolbar">
      <span className="rbc-toolbar-label">{label}</span>
      <div className="rbc-btn-group">
        <button onClick={() => onView("month")} className="button">
          Month
        </button>
        <button onClick={() => onView("week")} className="button">
          Week
        </button>
        <button onClick={() => onView("day")} className="button">
          Day
        </button>
        <button onClick={() => onView("agenda")} className="button">
          Agenda
        </button>
      </div>
    </div>
  );
};

export default CustomToolbar;

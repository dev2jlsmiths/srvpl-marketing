// CustomToolbar.js
import React from "react";

const CustomToolbar = (toolbar) => {
  const goToBack = () => {
    toolbar.onNavigate("PREV");
  };

  const goToNext = () => {
    toolbar.onNavigate("NEXT");
  };

  const goToCurrent = () => {
    toolbar.onNavigate("TODAY");
  };

  return (
    <div className="rbc-toolbar">
      {/* <span className="rbc-btn-group">
        <button type="button" onClick={goToBack}>
          Back
        </button>
        <button type="button" onClick={goToNext}>
          Next
        </button>
      </span> */}
      <span className="rbc-toolbar-label">{toolbar.label}</span>
    </div>
  );
};

export default CustomToolbar;

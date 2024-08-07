// DraggableEvent.js
import React from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "./ItemTypes"; // Define item types for drag and drop

const DraggableEvent = ({ event, children }) => {
  const [, drag] = useDrag({
    type: ItemTypes.EVENT,
    item: { ...event },
  });

  return (
    <div ref={drag} style={{ cursor: "move", ...event.style }}>
      {children}
    </div>
  );
};

export default DraggableEvent;

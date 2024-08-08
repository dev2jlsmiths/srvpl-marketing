import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Modal = ({ show, onClose, onSave, onDelete, event, onChange }) => {
  if (!show) return null;

  const handleDateChange = (date, field) => {
    onChange({
      target: {
        name: field,
        value: date,
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xs"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4">
          {event?.id ? "Edit Event" : "New Event"}
        </h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Title:
            </label>
            <input
              type="text"
              name="title"
              value={event?.title || ""}
              onChange={onChange}
              className="w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="Enter event title"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Start Date:
            </label>
            <DatePicker
              selected={event?.start}
              onChange={(date) => handleDateChange(date, "start")}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              End Date:
            </label>
            <DatePicker
              selected={event?.end}
              onChange={(date) => handleDateChange(date, "end")}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Color:
            </label>
            <input
              type="color"
              name="color"
              value={event?.color || "#FFEBCC"}
              onChange={onChange}
              className="w-full p-1 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex justify-between">
            {event?.id && (
              <button
                type="button"
                onClick={onDelete}
                className="bg-red-500 text-white px-2 py-1 rounded-md text-xs hover:bg-red-600"
              >
                Delete
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-2 py-1 rounded-md text-xs hover:bg-gray-600"
            >
              Close
            </button>
            <button
              type="button"
              onClick={onSave}
              className="bg-blue-500 text-white px-2 py-1 rounded-md text-xs hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;

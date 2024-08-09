import React, { useState, useEffect } from "react";

const NewEventModal = ({ show, onClose, onSave, event }) => {
  const [eventData, setEventData] = useState({
    title: "",
    date: new Date().toISOString().split("T")[0],
    time: "",
    description: "",
    repeat: "Does not repeat",
    taskList: "My Tasks",
  });

  useEffect(() => {
    if (event) {
      setEventData({
        title: event.title || "",
        date: event.start
          ? new Date(event.start).toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0],
        time: event.start
          ? new Date(event.start).toTimeString().slice(0, 5)
          : "",
        description: event.description || "",
        repeat: event.repeat || "Does not repeat",
        taskList: event.taskList || "My Tasks",
      });
    }
  }, [event]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave({
      ...event,
      title: eventData.title,
      start: new Date(`${eventData.date}T${eventData.time}`),
      end: event.end || new Date(`${eventData.date}T${eventData.time}`),
      description: eventData.description,
      repeat: eventData.repeat,
      taskList: eventData.taskList,
    });
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-gray-900 opacity-50"
        onClick={onClose}
      ></div>
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md z-10">
        <div className="px-4 py-5 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            {event ? "Edit Event" : "Add New Event"}
          </h3>
        </div>
        <div className="px-4 py-5 space-y-4">
          <label className="block text-gray-700">
            Title
            <input
              type="text"
              name="title"
              value={eventData.title}
              onChange={handleInputChange}
              placeholder="Event Title"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </label>
          <label className="block text-gray-700">
            Date
            <input
              type="date"
              name="date"
              value={eventData.date}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </label>
          <label className="block text-gray-700">
            Time
            <input
              type="time"
              name="time"
              value={eventData.time}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </label>
          <label className="block text-gray-700">
            Description
            <textarea
              name="description"
              rows="3"
              value={eventData.description}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            ></textarea>
          </label>
          <label className="block text-gray-700">
            Repeat
            <select
              name="repeat"
              value={eventData.repeat}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option>Does not repeat</option>
              <option>Daily</option>
              <option>Weekly</option>
              <option>Monthly</option>
              <option>Yearly</option>
            </select>
          </label>
          <label className="block text-gray-700">
            Task List
            <select
              name="taskList"
              value={eventData.taskList}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option>My Tasks</option>
              <option>Personal</option>
              <option>Work</option>
              <option>Other</option>
            </select>
          </label>
        </div>
        <div className="flex justify-end px-4 py-3 bg-gray-50 border-t border-gray-200">
          <button
            onClick={onClose}
            className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewEventModal;

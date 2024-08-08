import React, { useState } from "react";

const NewEventModal = ({ show, onClose, onSave, event }) => {
  const [title, setTitle] = useState(event?.title || "");
  const [date, setDate] = useState(
    event?.date || new Date().toISOString().split("T")[0]
  );
  const [time, setTime] = useState("");
  const [showTime, setShowTime] = useState(false);
  const [description, setDescription] = useState(event?.description || "");
  const [repeat, setRepeat] = useState("Does not repeat");
  const [taskList, setTaskList] = useState("My Tasks");
  const [activeTab, setActiveTab] = useState("Task");

  const handleSave = () => {
    onSave({
      id: event?.id || Date.now(),
      title,
      date,
      time,
      description,
      repeat,
      taskList,
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
            Add title and time
          </h3>
        </div>
        <div className="px-4 py-5">
          <div className="space-y-4">
            <label className="block text-gray-700">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Add title and time"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </label>
            <div className="flex items-center space-x-2">
              <div className="flex-1">
                <label className="block text-gray-700">
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </label>
              </div>
              {!showTime && (
                <button
                  onClick={() => setShowTime(true)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Add time
                </button>
              )}
            </div>
            {showTime && (
              <div className="space-y-4">
                <div className="flex space-x-4">
                  <div className="w-full">
                    <label className="block text-gray-700">Time</label>
                    <input
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700">Repeat</label>
                  <select
                    value={repeat}
                    onChange={(e) => setRepeat(e.target.value)}
                    className="mt-1 block w-1/2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option>Does not repeat</option>
                    <option>Daily</option>
                    <option>Weekly</option>
                    <option>Monthly</option>
                    <option>Yearly</option>
                  </select>
                </div>
              </div>
            )}
            <label className="block text-gray-700">
              Add description
              <textarea
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              ></textarea>
            </label>
            <label className="block text-gray-700">
              <span>My Tasks</span>
              <select
                value={taskList}
                onChange={(e) => setTaskList(e.target.value)}
                className="mt-1 block w-1/2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option>My Tasks</option>
                <option>Personal</option>
                <option>Work</option>
                <option>Other</option>
              </select>
            </label>
          </div>
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

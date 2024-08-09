import React, { useState, useEffect } from "react";
import axios from "axios";

const NewEventModal = ({ show, onClose, onSave, event, brandId }) => {
  const [eventData, setEventData] = useState({
    title: "",
    date: new Date().toISOString().split("T")[0],
    time: "",
    description: "",
    repeat: "Does not repeat",
    taskList: "My Tasks",
    allDay: false,
  });

  const [platformData, setPlatformData] = useState([]); // State to store the API data

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
        allDay: event.allDay || false,
      });
    }
  }, [event]);

  // Fetch data from API when the date changes
  useEffect(() => {
    if (eventData.date && brandId) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `https://api.21genx.com:5000/v1/task/current/platfrom/${brandId}/${eventData.date}`
          );
          if (response.data.success) {
            setPlatformData(response.data.data);
          }
        } catch (error) {
          console.error("Error fetching platform data:", error);
        }
      };
      fetchData();
    }
  }, [eventData.date, brandId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    setEventData((prevData) => ({
      ...prevData,
      allDay: e.target.checked,
      time: e.target.checked ? "" : prevData.time, // Clear time if 'All Day' is checked
    }));
  };

  const handleSave = () => {
    const startDatetime = eventData.allDay
      ? new Date(`${eventData.date}T00:00:00`)
      : new Date(`${eventData.date}T${eventData.time}`);

    onSave({
      ...event,
      title: eventData.title,
      start: startDatetime,
      end: event.end || startDatetime,
      description: eventData.description,
      repeat: eventData.repeat,
      taskList: eventData.taskList,
      allDay: eventData.allDay,
    });
  };

  if (!show) return null;

  return (
    <div className="fixed text-xs inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-gray-900 opacity-50"
        onClick={onClose}
      ></div>
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md z-10 text-xs">
        <div className="px-4 py-5 border-b border-gray-200">
          <h3 className="text-sm font-medium text-gray-900">
            {event ? "Edit Task" : "Add New Task"}
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
              placeholder="Title"
              className="mt-1 block w-full rounded-md shadow-sm bg-gray-100 focus:ring-indigo-500 text-xs py-1 px-3 border-none"
            />
          </label>
          {/* Display fetched platform data */}
          <div className="space-y-4">
            {platformData.map((platform, index) => (
              <div key={index}>
                <img
                  src={platform.social_post[0].platform_logo}
                  alt={platform.social_post[0].platform_name}
                />
                <p>{platform.social_post[0].platform_name}</p>
                <p>
                  {platform.social_post[0].number} Posts -{" "}
                  {platform.social_post[0].time_interval}
                </p>
                {platform.social_post[0].types.map((type, i) => (
                  <div key={i}>
                    <p>Content Type: {type.content_type}</p>
                    <p>Size: {type.size}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="flex w-1/2 items-center space-x-4">
            <label className="block text-gray-700 flex-1">
              Date
              <input
                type="date"
                name="date"
                value={eventData.date}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md shadow-sm bg-gray-100 focus:ring-indigo-500 text-xs py-1 px-3 border-none"
              />
            </label>
            {!eventData.allDay && (
              <label className="block text-gray-700">
                Time
                <input
                  type="time"
                  name="time"
                  value={eventData.time}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md shadow-sm bg-gray-100 focus:ring-indigo-500 text-xs py-1 px-3 border-none"
                />
              </label>
            )}
          </div>
          <label className="block text-gray-700 flex-1">
            <input
              type="checkbox"
              name="allDay"
              checked={eventData.allDay}
              onChange={handleCheckboxChange}
              className="mr-2"
            />
            All Day
          </label>
          <label className="block text-gray-700">
            Description
            <textarea
              name="description"
              rows="3"
              value={eventData.description}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md shadow-sm bg-gray-100 focus:ring-indigo-500 text-xs py-1 px-3 border-none"
            ></textarea>
          </label>
          <label className="block text-gray-700">
            Repeat
            <select
              name="repeat"
              value={eventData.repeat}
              onChange={handleInputChange}
              className="mt-1 block w-full text-xs rounded-md shadow-sm bg-gray-100 focus:ring-indigo-500 py-1 px-3 border-none"
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
              className="mt-1 block w-full text-xs rounded-md shadow-sm bg-gray-100 focus:ring-indigo-500 py-1 px-3 border-none"
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
            className="inline-flex justify-center py-1 px-4 border border-transparent rounded-md shadow-sm text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="ml-3 inline-flex justify-center py-1 px-4 border border-transparent rounded-md shadow-sm text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewEventModal;

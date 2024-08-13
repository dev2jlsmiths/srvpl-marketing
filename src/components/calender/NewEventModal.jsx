import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import setupAxiosInterceptors from "../../AxiosInterceptor";

setupAxiosInterceptors();

const NewEventModal = ({ show, onClose, onSave, event }) => {
  const [eventData, setEventData] = useState({
    title: "",
    date: new Date().toISOString().split("T")[0],
    time: "",
    description: "",
    repeat: "Does not repeat",
    taskList: "My Tasks",
  });
  const { id: brandId } = useParams();

  const [platformData, setPlatformData] = useState([]);
  const [selectedPlatformIds, setSelectedPlatformIds] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState({});

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

  const handlePlatformSelect = (platformId) => {
    setSelectedPlatformIds((prevIds) =>
      prevIds.includes(platformId)
        ? prevIds.filter((id) => id !== platformId)
        : [...prevIds, platformId]
    );
    setSelectedTypes((prevTypes) => {
      const newTypes = { ...prevTypes };
      delete newTypes[platformId];
      return newTypes;
    });
  };

  const handleTypeSelect = (platformId, typeId) => {
    setSelectedTypes((prevTypes) => ({
      ...prevTypes,
      [platformId]: typeId,
    }));
  };

  const handleSave = async () => {
    const startDatetime = new Date(`${eventData.date}T${eventData.time}`);

    const requestBody = {
      brand_id: brandId,
      start_date: startDatetime.toISOString(),
      title: eventData.title,
      description: eventData.description,
      color: "#FF5733", // You can customize the color or make it part of the form.
      event_type: eventData.repeat.toLowerCase(), // Assuming event type corresponds to the repeat value.
      platforms: selectedPlatformIds.map((platformId) => ({
        platfrom_id: platformId,
        type_id: selectedTypes[platformId],
      })),
    };

    try {
      const response = await axios.post(
        "https://api.21genx.com:5000/v1/task/add",
        requestBody
      );
      if (response.data.success) {
        onSave(response.data.event); // Pass the saved event back to the parent component.
        onClose(); // Close the modal.
      } else {
        console.error("Failed to save the event:", response.data.message);
      }
    } catch (error) {
      console.error("Error saving the event:", error);
    }
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
          <div className="space-x-2 flex">
            {platformData.map((platform) =>
              platform.social_post.map((post) => (
                <div key={post.social_id} className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id={`platform-${post.social_id}`}
                      name="platform"
                      value={post.social_id}
                      checked={selectedPlatformIds.includes(post.social_id)}
                      onChange={() => handlePlatformSelect(post.social_id)}
                      className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                    />
                    <label
                      htmlFor={`platform-${post.social_id}`}
                      className="ml-3 block text-xs text-gray-700"
                    >
                      <img
                        src={post.platform_logo}
                        alt={post.platform_name}
                        className="h-6 w-6 inline-block"
                      />
                      <span className="ml-2">{post.platform_name}</span>
                    </label>
                  </div>
                  {selectedPlatformIds.includes(post.social_id) && (
                    <div className="flex space-x-2">
                      {post.types.map((type) => (
                        <div key={type._id} className="flex items-center">
                          <input
                            type="radio"
                            id={`type-${type._id}`}
                            name={`type-${post.social_id}`}
                            value={type._id}
                            checked={selectedTypes[post.social_id] === type._id}
                            onChange={() =>
                              handleTypeSelect(post.social_id, type._id)
                            }
                            className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                          />
                          <label
                            htmlFor={`type-${type._id}`}
                            className="ml-1 block text-xs text-gray-700"
                          >
                            {type.content_type}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
          <div className="flex items-center space-x-4">
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
          </div>
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
              <option>Travel</option>
            </select>
          </label>
        </div>
        <div className="flex justify-end px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button
            onClick={onClose}
            className="inline-flex justify-center py-1 px-3 border border-transparent shadow-sm text-xs font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="inline-flex justify-center py-1 px-3 border border-transparent shadow-sm text-xs font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewEventModal;

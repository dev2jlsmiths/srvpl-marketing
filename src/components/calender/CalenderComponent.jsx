import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { Calendar as BigCalendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import "./CalenderComponent.css";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CalendarComponent = () => {
  const [events, setEvents] = useState([
    {
      id: 0,
      title: "Sample Event",
      start: new Date(),
      end: new Date(),
      color: "#FFEBCC", // Pastel shade
    },
  ]);
  const [title, setTitle] = useState("");
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [eventId, setEventId] = useState(null);
  const [eventRows, setEventRows] = useState([
    { work: "", kind: "", type: "", description: "" },
  ]);
  const [miniDate, setMiniDate] = useState(new Date());

  const handleSelectSlot = ({ start, end }) => {
    setTitle("");
    setStart(start);
    setEnd(end);
    setShowModal(true);
    setIsEditing(false);
    setEventRows([{ work: "", kind: "", type: "", description: "" }]);
  };

  const handleSelectEvent = (event) => {
    setTitle(event.title);
    setStart(event.start);
    setEnd(event.end);
    setShowModal(true);
    setIsEditing(true);
    setEventId(event.id);
    setEventRows([{ work: "", kind: "", type: "", description: event.title }]);
  };

  const handleAddEvent = () => {
    const newEvent = {
      id: events.length,
      title,
      start: new Date(start),
      end: new Date(end),
      color: getRandomPastelColor(),
    };
    setEvents([...events, newEvent]);
    resetModal();
  };

  const handleEditEvent = () => {
    const updatedEvents = events.map((event) =>
      event.id === eventId
        ? { ...event, title, start: new Date(start), end: new Date(end) }
        : event
    );
    setEvents(updatedEvents);
    resetModal();
  };

  const resetModal = () => {
    setTitle("");
    setStart(new Date());
    setEnd(new Date());
    setShowModal(false);
    setIsEditing(false);
    setEventId(null);
    setEventRows([{ work: "", kind: "", type: "", description: "" }]);
  };

  const getRandomPastelColor = () => {
    const colors = [
      "#FFEBCC",
      "#CCFFEB",
      "#CCE5FF",
      "#EBCCFF",
      "#FFCCE5",
      "#FFFFCC",
      "#D5CCFF",
      "#CCE5CC",
      "#FFE5CC",
      "#FFD5CC",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const addEventRow = () => {
    setEventRows([
      ...eventRows,
      { work: "", kind: "", type: "", description: "" },
    ]);
  };

  const handleEventRowChange = (index, field, value) => {
    const newEventRows = [...eventRows];
    newEventRows[index][field] = value;
    setEventRows(newEventRows);
  };

  return (
    <div className="p-6 w-full rounded-lg shadow-lg bg-white flex">
      <div className="w-1/4 p-4 border-r border-gray-200">
        <DatePicker
          selected={miniDate}
          onChange={(date) => setMiniDate(date)}
          inline
          className="custom-datepicker text-xs"
        />
      </div>
      <div className="w-3/4 p-1">
        <h2 className="text-2xl font-semibold mb-6">Calendar</h2>
        <BigCalendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          selectable
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          className="custom-calendar" // Add custom class for styling
          eventPropGetter={(event) => ({
            style: {
              backgroundColor: event.color,
            },
          })}
        />
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-3/4 z-10">
              <h3 className="text-xl font-semibold mb-6 text-center">
                {isEditing ? "Edit Event" : "Add Event"}
              </h3>
              {eventRows.map((row, index) => (
                <div className="grid grid-cols-3 gap-4 mb-4" key={index}>
                  <div className="col-span-1">
                    <label className="block mb-2">Scheduled Time:</label>
                    <input
                      type="datetime-local"
                      className="border p-2 rounded w-full"
                      value={format(start, "yyyy-MM-dd'T'HH:mm")}
                      onChange={(e) => setStart(new Date(e.target.value))}
                    />
                  </div>
                  <div className="col-span-2 flex items-end">
                    <div className="w-full">
                      <label className="block mb-2">Work:</label>
                      <select
                        className="border p-2 rounded w-full"
                        value={row.work}
                        onChange={(e) =>
                          handleEventRowChange(index, "work", e.target.value)
                        }
                      >
                        <option>Option 1</option>
                        <option>Option 2</option>
                      </select>
                    </div>
                    <div className="w-full mx-2">
                      <label className="block mb-2">Kind:</label>
                      <select
                        className="border p-2 rounded w-full"
                        value={row.kind}
                        onChange={(e) =>
                          handleEventRowChange(index, "kind", e.target.value)
                        }
                      >
                        <option>Option 1</option>
                        <option>Option 2</option>
                      </select>
                    </div>
                    <div className="w-full">
                      <label className="block mb-2">Type:</label>
                      <select
                        className="border p-2 rounded w-full"
                        value={row.type}
                        onChange={(e) =>
                          handleEventRowChange(index, "type", e.target.value)
                        }
                      >
                        <option>Option 1</option>
                        <option>Option 2</option>
                      </select>
                    </div>
                    {index === eventRows.length - 1 && (
                      <button
                        type="button"
                        className="bg-blue-500 text-white p-2 rounded ml-2"
                        onClick={addEventRow}
                      >
                        +
                      </button>
                    )}
                  </div>
                  <div className="col-span-3">
                    <label className="block mb-2">Description:</label>
                    <textarea
                      className="border p-2 rounded w-full"
                      rows="3"
                      value={row.description}
                      onChange={(e) =>
                        handleEventRowChange(
                          index,
                          "description",
                          e.target.value
                        )
                      }
                    ></textarea>
                  </div>
                </div>
              ))}
              <div className="flex justify-end space-x-2">
                <button
                  className="bg-gray-500 text-white p-2 rounded"
                  onClick={resetModal}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-500 text-white p-2 rounded"
                  onClick={isEditing ? handleEditEvent : handleAddEvent}
                >
                  {isEditing ? "Edit Event" : "Add Event"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarComponent;

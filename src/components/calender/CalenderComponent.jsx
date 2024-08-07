import React, { useState } from "react";
import { Calendar as BigCalendar, dateFnsLocalizer } from "react-big-calendar";
import {
  format,
  parse,
  startOfWeek,
  getDay,
  addMonths,
  subMonths,
  startOfToday,
} from "date-fns";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./CalenderComponent.css"; // Import the custom styles
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Modal from "./Modal"; // Import your custom modal component
import Sidebar from "./Sidebar"; // Import your sidebar component

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
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentDate, setCurrentDate] = useState(startOfToday());

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedEvent(null);
  };

  const handleEventChange = (e) => {
    setSelectedEvent({ ...selectedEvent, [e.target.name]: e.target.value });
  };

  const handleSaveEvent = () => {
    if (selectedEvent.id) {
      setEvents(
        events.map((event) =>
          event.id === selectedEvent.id ? selectedEvent : event
        )
      );
    } else {
      setEvents([...events, selectedEvent]);
    }
    handleModalClose();
  };

  const handleDeleteEvent = () => {
    setEvents(events.filter((event) => event.id !== selectedEvent.id));
    handleModalClose();
  };

  const handleSelectSlot = ({ start, end }) => {
    setSelectedEvent({
      id: null,
      title: "",
      start,
      end,
      color: "#FFEBCC",
    });
    setShowModal(true);
  };

  const moveEvent = ({ event, start, end }) => {
    const updatedEvent = { ...event, start, end };
    setEvents(events.map((e) => (e.id === event.id ? updatedEvent : e)));
  };

  const handleDateClick = (date) => {
    setCurrentDate(date);
  };

  const handleTodayClick = () => {
    setCurrentDate(startOfToday());
  };

  const handleBackClick = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextClick = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-screen">
        <Sidebar onDateClick={handleDateClick} />
        <div className="flex-1 p-4">
          <div className="flex justify-between mb-4">
            <button
              onClick={handleTodayClick}
              className="bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-gray-600"
            >
              Today
            </button>
            <div>
              <button
                onClick={handleBackClick}
                className="bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-gray-600 mr-2"
              >
                Back
              </button>
              <button
                onClick={handleNextClick}
                className="bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-gray-600"
              >
                Next
              </button>
            </div>
          </div>
          <div style={{ height: "calc(100vh - 4rem)" }}>
            <BigCalendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: "100%" }}
              className="custom-calendar" // Add this line
              components={{
                event: (props) => (
                  <div
                    style={{
                      backgroundColor: props.event.color,
                      padding: "5px",
                      borderRadius: "3px",
                    }}
                    onClick={() => handleEventClick(props.event)}
                  >
                    {props.event.title}
                  </div>
                ),
              }}
              onEventDrop={({ event, start, end }) =>
                moveEvent({ event, start, end })
              }
              resizable
              selectable
              onSelectSlot={handleSelectSlot}
              date={currentDate}
            />
          </div>
        </div>
      </div>

      <Modal
        show={showModal}
        onClose={handleModalClose}
        onSave={handleSaveEvent}
        onDelete={handleDeleteEvent}
        event={selectedEvent}
        onChange={handleEventChange}
      />
    </DndProvider>
  );
};

export default CalendarComponent;

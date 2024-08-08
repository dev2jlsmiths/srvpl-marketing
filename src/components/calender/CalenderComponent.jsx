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
import NewEventModal from "./NewEventModal"; // Import the new event modal component
import Sidebar from "./Sidebar"; // Import your sidebar component
import CustomToolbar from "./CustomToolbar"; // Import the custom toolbar

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
  const [showEditModal, setShowEditModal] = useState(false);
  const [showNewEventModal, setShowNewEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentDate, setCurrentDate] = useState(startOfToday());

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowEditModal(true);
  };

  const handleModalClose = () => {
    setShowEditModal(false);
    setShowNewEventModal(false);
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
    setShowNewEventModal(true);
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
            <button onClick={handleTodayClick} className="button">
              Today
            </button>
            <div className="flex">
              <button onClick={handleBackClick} className="button mr-2">
                Back
              </button>
              <button onClick={handleNextClick} className="button">
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
              style={{ height: "98%" }}
              className="custom-calendar"
              components={{
                toolbar: CustomToolbar,
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

      <NewEventModal
        show={showNewEventModal}
        onClose={handleModalClose}
        onSave={handleSaveEvent}
        onChange={handleEventChange}
        event={selectedEvent}
      />
      <Modal
        show={showEditModal}
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

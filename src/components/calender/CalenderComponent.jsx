import React, { useState, useEffect } from "react";
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
import "./CalenderComponent.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Modal from "./Modal";
import NewEventModal from "./NewEventModal";
import Sidebar from "./Sidebar";
import CustomToolbar from "./CustomToolbar";
import axios from "axios";

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

  const apiUrl = "YOUR_API_BASE_URL";

  // Fetch events from API
  const fetchEvents = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/v1/brand/profile/get/66a8726c70be898a1587cc7d`
      );
      const apiEvents = response.data.map((event) => ({
        id: event.id,
        title: event.title,
        start: new Date(event.start_date),
        end: new Date(event.end_date),
        color: event.color,
        description: event.description,
        eventType: event.event_type,
      }));
      setEvents(apiEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSaveEvent = async () => {
    if (selectedEvent.id) {
      // Update existing event
      try {
        await axios.put(
          `${apiUrl}/v1/events/${selectedEvent.id}`,
          selectedEvent
        );
        setEvents(
          events.map((event) =>
            event.id === selectedEvent.id ? selectedEvent : event
          )
        );
      } catch (error) {
        console.error("Error updating event:", error);
      }
    } else {
      // Create new event
      try {
        const response = await axios.post(`${apiUrl}/v1/events`, selectedEvent);
        setEvents([...events, { ...selectedEvent, id: response.data.id }]);
      } catch (error) {
        console.error("Error creating event:", error);
      }
    }
    handleModalClose();
  };

  const handleDeleteEvent = async () => {
    try {
      await axios.delete(`${apiUrl}/v1/events/${selectedEvent.id}`);
      setEvents(events.filter((event) => event.id !== selectedEvent.id));
    } catch (error) {
      console.error("Error deleting event:", error);
    }
    handleModalClose();
  };

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
          <div className="flex justify-between">
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

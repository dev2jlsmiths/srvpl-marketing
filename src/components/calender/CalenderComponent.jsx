import React, { useState, useEffect } from "react";
import { Calendar as BigCalendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay, startOfToday } from "date-fns";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./CalenderComponent.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import NewEventModal from "./NewEventModal";
import Sidebar from "./Sidebar";
import CustomToolbar from "./CustomToolbar";
import axios from "axios";
import { useParams } from "react-router-dom";
import setupAxiosInterceptors from "../../AxiosInterceptor";

setupAxiosInterceptors();

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
  const [view, setView] = useState("month");
  const { id: brandId, eventId } = useParams();

  const fetchEvents = async () => {
    try {
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, "0");
      const response = await axios.get(
        `/v1/task/currect/month?brand_id=${brandId}&year=${year}&month=${month}`
      );
      const apiEvents = response.data.data.map((event) => ({
        id: event._id,
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

  const fetchSingleEvent = async (eventId) => {
    try {
      const response = await axios.get(`/v1/task/get/${eventId}`);
      const event = response.data;
      setSelectedEvent({
        id: event._id,
        title: event.title,
        start: new Date(event.start_date),
        end: new Date(event.end_date),
        color: event.color,
        description: event.description,
        eventType: event.event_type,
        platforms_data: event.platforms_data,
      });
      setShowEditModal(true);
    } catch (error) {
      console.error("Error fetching the event:", error);
    }
  };

  useEffect(() => {
    if (eventId) {
      fetchSingleEvent(eventId);
    } else {
      fetchEvents();
    }
  }, [currentDate, eventId]);

  const handleTodayClick = () => {
    setCurrentDate(startOfToday());
  };

  const handleBackClick = () => {
    const newDate =
      view === "month"
        ? new Date(currentDate.setMonth(currentDate.getMonth() - 1))
        : view === "week"
        ? new Date(currentDate.setDate(currentDate.getDate() - 7))
        : new Date(currentDate.setDate(currentDate.getDate() - 1));
    setCurrentDate(new Date(newDate)); // Wrap in a new Date to force re-render
  };

  const handleNextClick = () => {
    const newDate =
      view === "month"
        ? new Date(currentDate.setMonth(currentDate.getMonth() + 1))
        : view === "week"
        ? new Date(currentDate.setDate(currentDate.getDate() + 7))
        : new Date(currentDate.setDate(currentDate.getDate() + 1));
    setCurrentDate(new Date(newDate)); // Wrap in a new Date to force re-render
  };

  const handleViewChange = (newView) => {
    setView(newView);
  };

  const handleSelectSlot = () => {
    setSelectedEvent(null);
    setShowNewEventModal(true);
  };

  const handleEventClick = (event) => {
    fetchSingleEvent(event.id); // Fetch the clicked event details
  };

  const handleModalClose = () => {
    setShowNewEventModal(false);
    setShowEditModal(false);
  };

  const handleSaveEvent = (savedEvent) => {
    setEvents((prevEvents) => {
      const existingEventIndex = prevEvents.findIndex(
        (e) => e.id === savedEvent.id
      );
      if (existingEventIndex > -1) {
        const updatedEvents = [...prevEvents];
        updatedEvents[existingEventIndex] = savedEvent;
        return updatedEvents;
      } else {
        return [...prevEvents, savedEvent];
      }
    });
    handleModalClose();
  };

  const handleDeleteEvent = async () => {
    if (selectedEvent) {
      try {
        const response = await axios.delete(
          `/v1/task/delete/${selectedEvent.id}`
        );
        if (response.data.success) {
          setEvents((prevEvents) =>
            prevEvents.filter((event) => event.id !== selectedEvent.id)
          );
          handleModalClose();
        } else {
          console.error("Failed to delete the event:", response.data.message);
        }
      } catch (error) {
        console.error("Error deleting the event:", error);
      }
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-screen">
        <Sidebar onDateClick={handleTodayClick} />
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
              date={currentDate}
              onNavigate={(date) => setCurrentDate(date)} // Sync with the calendar navigation
              style={{ height: "98%" }}
              className="custom-calendar"
              components={{
                toolbar: (props) => (
                  <CustomToolbar
                    label={props.label}
                    onNavigate={(direction) => {
                      props.onNavigate(direction);
                      if (direction === "NEXT") handleNextClick();
                      if (direction === "PREV") handleBackClick();
                    }}
                    onView={(newView) => {
                      props.onView(newView);
                      handleViewChange(newView);
                    }}
                  />
                ),
                event: (props) => (
                  <div
                    style={{
                      padding: "2px",
                      borderRadius: "2px",
                      color: "#fff",
                      border: "none",
                      outline: "none",
                    }}
                    onClick={() => handleEventClick(props.event)}
                  >
                    {props.title}
                  </div>
                ),
              }}
              selectable
              onSelectSlot={handleSelectSlot}
            />
          </div>
        </div>
      </div>

      {showNewEventModal && (
        <NewEventModal
          show={showNewEventModal}
          onClose={handleModalClose}
          onSave={handleSaveEvent}
        />
      )}
      {showEditModal && (
        <NewEventModal
          show={showEditModal}
          onClose={handleModalClose}
          onSave={handleSaveEvent}
          event={selectedEvent}
          onDelete={handleDeleteEvent}
        />
      )}
    </DndProvider>
  );
};

export default CalendarComponent;

"use client";

import React, { useState } from 'react';
import withAuth from '@/src/hoc/withAuth';

const Calendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  interface Event {
    id: string;
    name: string;
    title: string;
    start: Date;
    end: Date;
    importance: string;
    date: Date;
  }

  const [events, setEvents] = useState<Event[]>([]);
  const [showAddEventPopup, setShowAddEventPopup] = useState(false);
  const [newEvent, setNewEvent] = useState("");
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const handleAddEvent = () => {
    setShowAddEventPopup(true);
  };

  const handleEventSubmit = async () => {
    // Simulate AI event generation
    const eventJson = {
      "event name": newEvent,
      "timing": { "start": "10:00", "end": "11:00" },
      "importance": "medium"
    };

    const formattedEvent: Event = {
      id: `${newEvent}`,
      name: eventJson["event name"],
      title: eventJson["event name"],
      start: new Date(`${selectedDate.toDateString()} ${eventJson.timing.start}`),
      end: new Date(`${selectedDate.toDateString()} ${eventJson.timing.end}`),
      importance: eventJson.importance,
      date: selectedDate
    };
    setEvents([...events, formattedEvent]);

    setShowAddEventPopup(false);
    setNewEvent("");
  };

  const handleEventClick = (event: Event) => {
    setEditingEvent(event);
  };

  const handleEventEditSubmit = () => {
    if (editingEvent) {
      setEvents(events.map(e => e.id === editingEvent.id ? editingEvent : e));
    }
    setEditingEvent(null);
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents(events.filter(event => event.id !== eventId));
  };

  const onDragStart = (event: React.DragEvent<HTMLDivElement>, eventId: string) => {
    event.dataTransfer.setData("text/plain", eventId);
  };

  const onDrop = (event: React.DragEvent<HTMLDivElement>, hour: number) => {
    const eventId = event.dataTransfer.getData("text/plain");
    const updatedEvents = events.map(e => {
      if (e.id === eventId) {
        const newStart = new Date(e.start);
        newStart.setHours(hour);
        const newEnd = new Date(e.end);
        newEnd.setHours(hour + (e.end.getHours() - e.start.getHours()));
        return { ...e, start: newStart, end: newEnd };
      }
      return e;
    });
    setEvents(updatedEvents);
    event.preventDefault();
  };

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const renderTimeSlots = () => {
    const timeSlots = [];
    for (let hour = 0; hour < 24; hour++) {
      timeSlots.push(
        <div
          key={hour}
          className="time-slot"
          onDrop={(event) => onDrop(event, hour)}
          onDragOver={onDragOver}
        >
          <div className="time-label">{`${hour}:00`}</div>
          <div className="events">
            {events
              .filter(event => new Date(event.date).toDateString() === selectedDate.toDateString() && event.start.getHours() === hour)
              .map((event) => (
                <div
                  key={event.id}
                  draggable
                  onDragStart={(e) => onDragStart(e, event.id)}
                  className={`event ${event.importance}`}
                  onClick={() => handleEventClick(event)}
                >
                  <p>{event.name}</p>
                  <span id="info-row">
                    <p>{event.id}</p>
                    <p>{event.start.toLocaleTimeString()} - {event.end.toLocaleTimeString()}</p>
                    <button onClick={() => handleDeleteEvent(event.id)}>Delete</button>
                  </span>
                </div>
              ))}
          </div>
        </div>
      );
    }
    return timeSlots;
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={() => handleDateChange(new Date(selectedDate.setDate(selectedDate.getDate() - 1)))}>Previous</button>
        <h1 onClick={() => handleDateChange(new Date())}>{selectedDate.toDateString()}</h1>
        <button onClick={() => handleDateChange(new Date(selectedDate.setDate(selectedDate.getDate() + 1)))}>Next</button>
        <button onClick={handleAddEvent}>Add Event</button>
      </div>
      <div className="calendar-body">
        {renderTimeSlots()}
      </div>
      {showAddEventPopup && (
        <div className="popup">
          <textarea value={newEvent} onChange={(e) => setNewEvent(e.target.value)} />
          <button onClick={handleEventSubmit}>Submit</button>
        </div>
      )}
      {editingEvent && (
        <div className="popup">
          <textarea value={JSON.stringify(editingEvent, null, 2)} onChange={(e) => setEditingEvent(JSON.parse(e.target.value))} />
          <button onClick={handleEventEditSubmit}>Submit</button>
        </div>
      )}
    </div>
  );
};

export default withAuth(Calendar);
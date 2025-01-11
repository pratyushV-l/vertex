"use client";

import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import withAuth from '@/src/hoc/withAuth';

const Calendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState<any[]>([]);
  const [showAddEventPopup, setShowAddEventPopup] = useState(false);
  const [newEvent, setNewEvent] = useState("");
  const [editingEvent, setEditingEvent] = useState<any>(null);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const handleAddEvent = () => {
    setShowAddEventPopup(true);
  };

  const handleEventSubmit = async () => {
    const genAI = new GoogleGenerativeAI("AIzaSyDkyivo4KBcmjJN_ZB2qq7_1II34IAI_uk");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const existingEvents = events.filter(event => new Date(event.date).toDateString() === selectedDate.toDateString());
    const existingEventsJson = JSON.stringify(existingEvents);

    const prompt = `You are an AI assistant helping to schedule events. The current date is ${selectedDate.toDateString()}. Here are the existing events for this date: ${existingEventsJson}. Convert the following event description into a JSON object with event name (2-3 words), timing (start and end in HH:MM format), and importance (low, medium, high). Only provide the JSON object and nothing else. Ensure the JSON is valid and properly formatted:\n${newEvent}`;
    const result = await model.generateContent(prompt);
    const responseText = result.response.text().trim();

    try {
      const eventJson = JSON.parse(responseText);
      setEvents([...events, { ...eventJson, date: selectedDate }]);
    } catch (error) {
      console.error("Error parsing JSON:", error);
      console.error("Response text:", responseText);
    }

    setShowAddEventPopup(false);
    setNewEvent("");
  };

  const handleEventClick = (event: any) => {
    setEditingEvent(event);
  };

  const handleEventEditSubmit = () => {
    setEvents(events.map(e => e === editingEvent ? editingEvent : e));
    setEditingEvent(null);
  };

  const renderTimeSlots = () => {
    const timeSlots = [];
    for (let hour = 0; hour < 24; hour++) {
      timeSlots.push(
        <div key={hour} className="time-slot">
          <div className="time-label">{`${hour}:00`}</div>
          <div className="events">
            {events
              .filter(event => new Date(event.date).toDateString() === selectedDate.toDateString() && parseInt(event.start.split(':')[0]) === hour)
              .map((event, index) => (
                <div key={index} className={`event ${event.importance}`} onClick={() => handleEventClick(event)}>
                  <p>{event.name}</p>
                  <p>{event.start} - {event.end}</p>
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
/* eslint-disable no-unused-vars */
import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useState } from "react";
import { v4 as uuid } from "uuid"
import EventItem from './EventItem'
import { useEffect } from 'react'
import '../App.css'

const Calendar = () => {
    const [events, setEvents] = useState([]);

    
    useEffect(() => {
        const storedEvents = JSON.parse(localStorage.getItem('events'));
        if (storedEvents) {
        setEvents(storedEvents);
        }
    }, []);

    const handleSelect =   (info) => {
        const { start, end } = info;
        const eventNamePrompt = prompt("Enter, event name");
        if (eventNamePrompt) {
            let eventNew = [
                ...events,
                {
                    start,
                    end,
                    title: eventNamePrompt,
                    id: uuid(),
                },
            ]
            localStorage.setItem('events', JSON.stringify(eventNew));
            setEvents([
                ...events,
                {
                    start,
                    end,
                    title: eventNamePrompt,
                    id: uuid(),
                },
            ]);
        }
        
    };

    const handleEventDelete = (event) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this event?');
        if (isConfirmed) {
            const newEvents = events.filter((e) => e.id !== event.id);
            localStorage.setItem('events', JSON.stringify(newEvents));
            setEvents(newEvents);
        }
    };
    
    

    const handleEventDrop = (event) => {
        const updatedEvent = {
          id: event.id,
          title: event.title,
          start: event.start,
          end: event.end,
        };
        const updatedEvents = events.map((e) => (e.id === event.id ? updatedEvent : e));
        console.log(updatedEvent)
        localStorage.setItem('events', JSON.stringify(updatedEvents));
        setEvents(updatedEvents);
      };

    

  return (
       <>
        <h1>Monthly Calendar</h1>
        <div className="p-6 bg-gray-100 border border-gray-300 rounded-lg">
            <div className="mb-4 text-lg text-gray-700">Only for Desktop.</div>
            <div className="mb-4 text-lg text-gray-700">To create an event, click on a date.</div>
            <div className="mb-4 text-lg text-gray-700">To delete an event, click on the event.</div>
            <div className="text-lg text-gray-700">To drag an event, pick up the event.</div>
        </div>
        
        <FullCalendar
            editable
            selectable
            events={events}
            select={handleSelect}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView={"dayGridMonth"}
            eventContent={(info) => <EventItem info={info} />}
            eventClick={(info) => handleEventDelete(info.event)}
            eventDrop={(info) => handleEventDrop(info.event)} // Handle event drop
            height={"90vh"}
        />
       </>
   
  )
}

export default Calendar
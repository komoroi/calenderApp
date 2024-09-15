import React, { useState, useEffect } from 'react';
import './Calendar.css';
import Modal from './Modal';
import DeleteModal from './DeleteModal';

const getDaysInMonth = (year: number, month: number): Date[] => {
  const date = new Date(year, month, 1);
  const days: Date[] = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
};

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [days, setDays] = useState<Date[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [events, setEvents] = useState<{ [key: string]: { title: string; color: string; repeat: string }[] }>({});
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedEventIndex, setSelectedEventIndex] = useState<number | null>(null);

  useEffect(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    setDays(getDaysInMonth(year, month));
  }, [currentDate]);

  const handleDayClick = (day: Date) => {
    setSelectedDate(day);
    setShowModal(true);
  };

  const handleEventClick = (day: Date, index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedDate(day);
    setSelectedEventIndex(index);
    setShowDeleteModal(true);
  };

  const handleSaveEvent = () => {
    if (selectedDate && selectedEventIndex !== null) {
      const newEvent = {
        title: 'New Event',
        color: '#ff0000',
        repeat: 'none'
      };
      const dateKey = selectedDate.toDateString();
      setEvents(prevEvents => {
        const newEvents = { ...prevEvents };
        if (!newEvents[dateKey]) {
          newEvents[dateKey] = [];
        }
        if (selectedEventIndex === null) {
          newEvents[dateKey].push(newEvent);
        } else {
          newEvents[dateKey][selectedEventIndex] = newEvent;
        }
        return newEvents;
      });
      setShowModal(false);
    }
  };

  const handleDeleteEvent = () => {
    if (selectedDate && selectedEventIndex !== null) {
      const dateKey = selectedDate.toDateString();
      setEvents(prevEvents => {
        const newEvents = { ...prevEvents };
        if (newEvents[dateKey]) {
          newEvents[dateKey].splice(selectedEventIndex, 1);
          if (newEvents[dateKey].length === 0) {
            delete newEvents[dateKey];
          }
        }
        return newEvents;
      });
      setShowDeleteModal(false);
    }
  };

  return (
    <div className="calendar">
      <div className="header">
        <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}>前月</button>
        <h2>{currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}</h2>
        <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}>次月</button>
      </div>
      <div className="days">
        {days.map(day => (
          <div
            key={day.toDateString()}
            className="day"
            onClick={() => handleDayClick(day)}
          >
            <span>{day.getDate()}</span>
            {events[day.toDateString()] && events[day.toDateString()].map((event, index) => (
              <div
                key={index}
                className="event"
                style={{ backgroundColor: event.color }}
                onClick={(e) => handleEventClick(day, index, e)}
              >
                {event.title}
              </div>
            ))}
          </div>
        ))}
      </div>
      {showModal && <Modal onClose={() => setShowModal(false)} onSave={handleSaveEvent} />}
      {showDeleteModal && <DeleteModal onClose={() => setShowDeleteModal(false)} onDelete={handleDeleteEvent} />}
    </div>
  );
};

export default Calendar;

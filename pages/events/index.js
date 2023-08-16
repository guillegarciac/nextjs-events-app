import { useState, useEffect } from 'react';
import { getAllEvents } from '../../services/eventService';
import EventList from '../../components/events/event-list';

export default function AllEventsPage() {
  const [allEvents, setAllEvents] = useState([]);

  useEffect(() => {
    async function fetchEvents() {
      const events = await getAllEvents();
      setAllEvents(events);
    }

    fetchEvents();
  }, []);

  return (
    <div>
      <EventList items={allEvents} />
    </div>
  )
}

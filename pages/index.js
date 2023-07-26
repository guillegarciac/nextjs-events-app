import { useState, useEffect } from 'react';
import { getFeaturedEvents } from '../services/eventService';
import EventList from '../components/events/event-list';

export default function HomePage() {
  const [featuredEvents, setFeaturedEvents] = useState([]);

  useEffect(() => {
    async function fetchEvents() {
      const events = await getFeaturedEvents();
      setFeaturedEvents(events);
    }

    fetchEvents();
  }, []);

  return (
    <div>
      <EventList items={featuredEvents} />
    </div>
  )
}

import { useState, useEffect, Fragment } from 'react';
import { getAllEvents } from '../../services/eventService';
import EventList from '../../components/events/event-list';
import EventsSearch from '../../components/events/events-search';

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
    <Fragment>
    <EventsSearch />
      <EventList items={allEvents} />
    </Fragment>
  )
}

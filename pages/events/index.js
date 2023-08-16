import { useState, useEffect, Fragment } from 'react';
import { useRouter } from 'next/router';
import { getAllEvents } from '../../services/eventService';
import EventList from '../../components/events/event-list';
import EventsSearch from '../../components/events/events-search';

export default function AllEventsPage() {
  const [allEvents, setAllEvents] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchEvents() {
      const events = await getAllEvents();
      setAllEvents(events);
    }

    fetchEvents();
  }, []);

  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }

  return (
    <Fragment>
    <EventsSearch onSearch={findEventsHandler}/>
      <EventList items={allEvents} />
    </Fragment>
  )
}

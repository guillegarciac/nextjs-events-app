import { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getFilteredEvents } from '../../services/eventService';
import EventList from '../../components/events/event-list';

export default function FilteredEventsPage() {
  const router = useRouter();
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const filterData = router.query.slug;

  useEffect(() => {
    if (!filterData) {
      return; // Don't fetch if the filterData isn't ready yet.
    }

    const year = +filterData[0]; // Convert string to number
    const month = +filterData[1];

    if (isNaN(year) || isNaN(month) || month < 1 || month > 12) {
      return; // Invalid year or month, so return early
    }

    async function fetchFilteredEvents() {
      try {
        const events = await getFilteredEvents({ year, month });
        setFilteredEvents(events);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching filtered events:", error);
        setLoading(false);
      }
    }

    fetchFilteredEvents();
  }, [filterData]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!filteredEvents || filteredEvents.length === 0) {
    return <p>No events found for the chosen filter!</p>;
  }

  return (
    <Fragment>
      <EventList items={filteredEvents} />  
    </Fragment>
  )
}

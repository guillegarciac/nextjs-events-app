import { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getFilteredEvents } from '../../services/eventService';
import EventList from '../../components/events/event-list';

export default function FilteredEventsPage() {
  const router = useRouter();
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null); 

  const filterData = router.query.slug;

  useEffect(() => {
    if (!filterData) {
      setErrorMessage("Loading...");
      return;
    }

    const year = +filterData[0];
    const month = +filterData[1];

    if (isNaN(year) || isNaN(month) || year > 2030 || year < 2020 || month < 1 || month > 12) {
      setLoading(false);
      setErrorMessage("Invalid Filter. Please adjust your values.");
      return;
    }

    async function fetchFilteredEvents() {
      try {
        const events = await getFilteredEvents({ year, month });
        setFilteredEvents(events);
        setLoading(false);
        setErrorMessage(null); // Reset the error message if successful
      } catch (error) {
        console.error("Error fetching filtered events:", error);
        setLoading(false);
      }
    }

    fetchFilteredEvents();
  }, [filterData]);

  if (errorMessage) {
    return <p>{errorMessage}</p>;
  }

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

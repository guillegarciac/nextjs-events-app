import { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getFilteredEvents } from '../../services/eventService';
import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';
import PuffLoader from "react-spinners/PuffLoader";

export default function FilteredEventsPage() {
  const router = useRouter();
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const filterData = router.query.slug;

  useEffect(() => {
    const timer = setTimeout(() => {
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
        } catch (error) {
          console.error("Error fetching filtered events:", error);
          setLoading(false);
          setErrorMessage("Error fetching events. Please try again later.");
        }
      }

      fetchFilteredEvents();
    }, 3000);

    return () => clearTimeout(timer);
  }, [filterData]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <PuffLoader color={"#03be9f"} size={100} />
      </div>
    );
  }

  if (errorMessage) {
    return (
      <Fragment>
        <p style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>{errorMessage}</p>
        <Button link="/events">Show All Events</Button>
      </Fragment>
    );
  }

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <p style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>No events found for the chosen filter!</p>
        <Button link="/events">Show All Events</Button>
      </Fragment>
    );
  }

  const date = new Date(filteredEvents[0].date);

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
}

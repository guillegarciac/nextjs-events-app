import { Fragment } from 'react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getEventById } from '../../services/eventService';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';

export default function EventDetailPage() {
  const router = useRouter();
  const { eventId } = router.query;
  const [event, setEvent] = useState(null);

  useEffect(() => {
    // Fetch the event data when the eventId is available in the query parameters
    if (eventId) {
      getEventById(eventId)
        .then((eventData) => {
          setEvent(eventData);
        })
        .catch((error) => {
          // Handle errors or show a not-found page
          console.error('Error fetching event:', error);
          setEvent(null);
        });
    }
  }, [eventId]);

  if (!event) {
    // You can show a loading spinner or a not-found page while the data is being fetched
    return <div>Loading...</div>;
  }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}

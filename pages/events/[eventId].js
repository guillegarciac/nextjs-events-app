import { Fragment } from 'react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getEventById } from '../../services/eventService';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import ErrorAlert from '../../components/ui/error-alert';
import PuffLoader from "react-spinners/PuffLoader";

export default function EventDetailPage() {
  const router = useRouter();
  const { eventId } = router.query;
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (eventId) {
        getEventById(eventId)
          .then((eventData) => {
            setEvent(eventData);
            setLoading(false);
          })
          .catch((error) => {
            setEvent(null);
            setLoading(false);
          });
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [eventId]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <PuffLoader color={"#03be9f"} size={100} />
      </div>
    );
  }

  if (!event) {
    return (
      <ErrorAlert>
        <p>Event not found.</p>
      </ErrorAlert>
    );
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

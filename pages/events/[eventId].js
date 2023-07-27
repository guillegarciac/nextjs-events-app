import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getEventById } from '../../services/eventService';

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
    <div>
      <h1>{event.title}</h1>
      <p>{event.date}</p>
      <p>{event.location}</p>
      {/* You can render other event details here */}
    </div>
  );
}

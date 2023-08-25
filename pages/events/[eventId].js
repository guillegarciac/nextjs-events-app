import { Fragment } from 'react';
import { useRouter } from 'next/router';  // <-- Don't forget to import useRouter
import { getEventById, getAllEvents } from '../../services/eventService';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import ErrorAlert from '../../components/ui/error-alert';
import PuffLoader from "react-spinners/PuffLoader";

function EventDetailPage(props) {
  const event = props.selectedEvent;
  const router = useRouter(); 

  // If the page is in fallback state, show the loader
  if (router.isFallback) {
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

export async function getStaticProps(context) {
  const eventId = context.params.eventId;
  
  const event = await getEventById(eventId);

  if (!event) {
    return { notFound: true };
  }

  return {
    props: {
      selectedEvent: event,
    },
    revalidate: 60, 
  };
}

export async function getStaticPaths() {
  const allEvents = await getAllEvents();

  if (!allEvents) {
    console.error('No events found');
    return { paths: [], fallback: true };
  }

  const paths = allEvents.map(event => {
    if (!event.id) {
      console.error('Missing id for event:', event);
      return null;
    }
    return { params: { eventId: event.id.toString() } };
  }).filter(Boolean);

  return {
    paths,
    fallback: true,
  };
}


export default EventDetailPage;

import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
});

export async function getFeaturedEvents() {
  try {
    const response = await api.get('/events');
    const events = response.data.data.filter(event => event.isFeatured);
    return events;
  } catch (error) {
    throw error;
  }
}

export async function getAllEvents() {
  try {
    const response = await api.get('/events');
    const events = response.data.data;
    return events;
  } catch (error) {
    throw error;
  }
}

export async function getFilteredEvents(dateFilter) {
  try {
    const { year, month } = dateFilter;
    const response = await api.get('/events');
    const events = response.data.data.filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
    });
    return events;
  } catch (error) {
    throw error;
  }
}

export async function getEventById(id) {
  try {
    console.log("Fetching event with id:", id);
    const response = await api.get(`/events/${id}`);
    console.log("API Response:", response.data);
    const event = response.data.data;
    return event;
  } catch (error) {
    console.error("Error fetching event:", error);
    if (error.response && error.response.status === 404) {
      return null;
    } else {
      throw error;
    }
  }
}

// services/eventService.js
import axios from 'axios';

export async function getFeaturedEvents() {
  try {
    const response = await axios.get('/api/events');
    const events = response.data.data.filter(event => event.isFeatured);
    return events;
  } catch (error) {
    throw error;
  }
}

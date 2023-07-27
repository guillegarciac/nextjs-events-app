// pages/api/events/[eventId].js
import dbConnect from '../../../utils/dbConnect';
import EventModel from '../../../models/Event'; // Import the Mongoose model for events

export default async function handler(req, res) {
  const { eventId } = req.query;

  try {
    // Connect to the database
    await dbConnect();

    // Find the event by ID in the database
    const event = await EventModel.findById(eventId);

    // If the event is not found, return a 404 response
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // If the event is found, return it in the response
    return res.status(200).json({ data: event });
  } catch (error) {
    // Handle any errors that occur during database interaction
    return res.status(500).json({ message: 'Internal server error' });
  }
}

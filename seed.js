require('dotenv').config();

// seed.js
const dbConnect = require('./utils/dbConnect');
const Event = require('./models/Event');

dbConnect();

const seedDB = async () => {
  // Add your event details here
  const newEvent = {
    title: 'Networking for introverts',
    description: "We know: Networking is no fun if you are an introvert person. That's why we came up with this event - it'll be so much easier. Promised!",
    location: 'New Wall Street 5, 98765 New Work',
    date: '2021-05-30',
    image: 'images/introvert-event.jpg',
    isFeatured: true,
  };

  try {
    const event = new Event(newEvent);
    await event.save();

    console.log('Data seeded!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data: ', error);
    process.exit(1);
  }
};

seedDB();

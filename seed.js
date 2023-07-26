require('dotenv').config();

// seed.js
const dbConnect = require('./utils/dbConnect');
const Event = require('./models/Event');

dbConnect();

const seedDB = async () => {
  try {
    // Delete existing events from the database
    await Event.deleteMany();

    // Array of events to be seeded
    const eventsToSeed = [
      {
        title: 'Programming for everyone',
        description:
          'Everyone can learn to code! Yes, everyone! In this live event, we are going to go through all the key basics and get you started with programming as well.',
        location: 'Somestreet 25, 12345 San Somewhereo',
        date: '2021-05-12',
        image: 'images/coding-event.jpg',
        isFeatured: false,
      },
      {
        title: 'Networking for introverts',
        description:
          "We know: Networking is no fun if you are an introvert person. That's why we came up with this event - it'll be so much easier. Promised!",
        location: 'New Wall Street 5, 98765 New Work',
        date: '2021-05-30',
        image: 'images/introvert-event.jpg',
        isFeatured: true,
      },
      {
        title: 'Networking for extroverts',
        description:
          'You probably need no help with networking in general. But focusing your energy correctly - that is something where most people can improve.',
        location: 'My Street 12, 10115 Broke City',
        date: '2022-04-10',
        image: 'images/networking-event.jpg',
        isFeatured: true,
      },
    ];

    // Save each event in the database
    for (const event of eventsToSeed) {
      const newEvent = new Event(event);
      await newEvent.save();
    }

    console.log('Data seeded!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data: ', error);
    process.exit(1);
  }
};

seedDB();

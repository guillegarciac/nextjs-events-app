// models/Event.js
const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for this event.'],
    maxlength: [60, 'Title cannot be more than 60 characters.']
  },
  description: {
    type: String,
    required: [true, 'Please provide a description.'],
  },
  location: {
    type: String,
    required: [true, 'Please provide a location.'],
  },
  date: {
    type: Date,
    required: [true, 'Please provide a date.'],
  },
  image: {
    type: String,
    required: [true, 'Please provide an image.'],
  },
  isFeatured: {
    type: Boolean,
    default: false,
  }
});

module.exports = mongoose.models.Event || mongoose.model('Event', EventSchema);
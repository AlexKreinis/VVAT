const mongoose = require("mongoose");
const EventSchema = new mongoose.Schema({
  start: {
    type: String,
    required: true,
  },
  finish: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    rquired: true,
  },
  ratings: [
    {
      type: Number,
    },
  ],
  atendees: [
    {
      name: { type: String },
      email: { type: String },
    },
  ],
});

module.exports = Event = mongoose.model("event", EventSchema);

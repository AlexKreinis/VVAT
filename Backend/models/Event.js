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
      type: mongoose.Schema.Types.ObjectId,
      ref: "Atendee",
    },
  ],
});

module.exports = Event = mongoose.model("event", EventSchema);

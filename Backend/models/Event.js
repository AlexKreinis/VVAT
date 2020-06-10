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
      type: mongoose.Schema.Types.ObjectId,
      ref: "rating",
    },
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  atendees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "location",
  },
});

module.exports = Event = mongoose.model("event", EventSchema);

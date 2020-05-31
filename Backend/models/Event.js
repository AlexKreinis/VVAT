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
});

module.exports = Event = mongoose.model("event", EventSchema);

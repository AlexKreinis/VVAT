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
  events: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Atendee",
    },
  ],
});

module.exports = User = mongoose.model("Event", EventSchema);

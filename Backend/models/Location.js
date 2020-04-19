const mongoose = require("mongoose");
const LocationSchema = new mongoose.Schema({
  lat: {
    type: String,
    required: true,
  },
  lon: {
    type: String,
    required: true,
  },
  events: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
});

module.exports = Location = mongoose.model("location", LocationSchema);

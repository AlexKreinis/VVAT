const mongoose = require("mongoose");
const RatingSchema = new mongoose.Schema({
  rating: {
    type: Number,
  },
  rater: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "event",
  },
});

module.exports = Rating = mongoose.model("rating", RatingSchema);

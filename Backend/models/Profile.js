const mongoose = require("mongoose");
const ProfileSchema = new mongoose.Schema({
  description: {
    type: String,
  },
  age: {
    type: String,
  },
  facebook: {
    type: String,
  },
  rating: {
    type: String,
  },

  events: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "event",
    },
  ],
  frinedList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);

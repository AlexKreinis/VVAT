const mongoose = require("mongoose");
const SchduleSchema = new mongoose.Schema({
  demo1: {
    type: String,
    required: true,
  },
  demo2: {
    type: String,
    required: true,
  },
});

module.exports = Schdule = mongoose.model("schdule", SchduleSchema);

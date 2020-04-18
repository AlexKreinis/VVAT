const mongoose = require("mongoose");
const AtendeeSchema = new mongoose.Schema({
  id: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
});

module.exports = User = mongoose.model("Atendee", AtendeeSchema);

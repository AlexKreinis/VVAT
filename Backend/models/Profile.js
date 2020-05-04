const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  description: {
    type: String,
    //required: true,
  },
});

module.exports = User = mongoose.model("profile", UserSchema);

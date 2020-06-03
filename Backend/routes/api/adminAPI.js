const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const Profile = require("../../models/Profile");
const auth = require("../../middleware/auth");

router.get("/getuser", async (req, res) => {
  const otherEmail = req.header("user-email");
  try {
    const otherUser = await User.findOne({ email: otherEmail })
      .select("-password")
      .populate("profile");
    res.json({ user: otherUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: [{ msg: err.message }] });
  }
});

router.get("/getallusers/", async (req, res) => {
  try {
    const Users = await User.find().select("-password").populate("profile");

    res.json({ allUsers: Users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: [{ msg: err.message }] });
  }
});

router.get("/getallevents/", async (req, res) => {
  try {
    const Events = await Event.find();

    res.json({ allEvents: Events });
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: [{ msg: err.message }] });
  }
});

module.exports = router;

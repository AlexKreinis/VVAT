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

module.exports = router;

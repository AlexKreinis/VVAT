const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const auth = require("..//../middleware/auth");
const Profile = require("..//../models/Profile");

router.get("/getprofile", async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.send(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: [{ msg: err.message }] });
  }
});

module.exports = router;

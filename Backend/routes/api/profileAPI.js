const express = require("express");
const router = express.Router();
const User = require("../../models/User");

router.get("/getprofile", async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error at getprofile");
  }
});

module.exports = router;

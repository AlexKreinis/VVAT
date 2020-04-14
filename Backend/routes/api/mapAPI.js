const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
var sportdata = require("../../b7data/sport.json");

router.get("/getmaps", async (req, res) => {
  try {
    res.json({ data: sportdata });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const axios = require("axios");

router.get("/getmaps", async (req, res) => {
  try {
    console.log("entered here");
    let maps = await axios.get(
      "https://opendataprod.br7.org.il/dataset/9a88499f-e775-493d-af47-61a3ebb34510/resource/58f26a74-af55-4823-81d8-17715883acc6/download/sport.json"
    );
    res.json(maps);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;

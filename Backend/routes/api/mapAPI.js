const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
var sportdata = require("../../b7data/sport.json");
const Event = require("../../models/Event");
const Location = require("../../models/Location");

router.get("/getmaps", async (req, res) => {
  try {
    console.log("entered\n");
    res.json({ data: sportdata });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/getevents", async (req, res) => {
  try {
    const dummyData = [
      {
        id: "1",
        address: "yehuda ha levi 6",
        date: "13/5/2020",
        time: "13:30 - 14:30",
        type: "football game",
        description:
          "This sport center belongs to a nearby school and blah-blah-blah",
      },
      {
        id: "2",
        address: "yehuda ha levi 7",
        date: "12/5/2020",
        time: "11:30 - 12:30",
        type: "volleyball game",
        description: "This sport center",
      },
    ];

    res.json({ events: dummyData });
  } catch (error) {
    console.log(error);
  }
});

router.post("/addevent", async (req, res) => {
  try {
    const { start, end, lat, lon, name } = req.body;

    let location = await Location.findOne({ lat, lon });
    const newEvent = new Event({
      start: start,
      finish: end,
      name: name,
    });
    await newEvent.save();

    if (location) {
      location.events.push(newEvent._id);
      await location.save();
    } else {
      const newLocation = new Location({
        lat: lat,
        lon: lon,
      });
      newLocation.events.push(newEvent._id);
      await newLocation.save();
    }
    res.json({ msg: "location and event added" });
  } catch (error) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;

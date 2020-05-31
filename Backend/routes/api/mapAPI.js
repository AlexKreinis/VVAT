const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
var sportdata = require("../../b7data/sport.json");
const Event = require("../../models/Event");
const Location = require("../../models/Location");

router.get("/getmaps", async (req, res) => {
  try {
    res.json({ data: sportdata });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: [{ msg: err.message }] });
  }
});

router.get("/getevents/:lat/:lon", async (req, res) => {
  try {
    const { lat, lon } = req.params;
    let location = await Location.findOne({ lat, lon }).populate("events");
    if (location) {
      res.json({ events: location.events });
    } else res.json({ events: [] });
  } catch (err) {
    res.status(500).json({ errors: [{ msg: err.message }] });
  }
});

router.post("/addevent", auth, async (req, res) => {
  try {
    const { start, end, lat, lon, name } = req.body;
    let location = await Location.findOne({ lat, lon });
    const newEvent = new Event({
      start: start,
      finish: end,
      name: name,
      owner: req.user.id,
    });
    await newEvent.save();
    const foundUser = await User.findById(req.user.id);
    const foundProfile = await Profile.findById(foundUser.profile);
    foundProfile.events.push(newEvent._id);
    await foundProfile.save();
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
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: [{ msg: err.message }] });
  }
});

router.post("/addrating", async (req, res) => {
  try {
    //  const { rating, eventId } = req.params;

    const { rating, eventId } = req.body;
    event = await Event.findById(eventId);
    event.ratings.push(rating);
    await event.save();

    events = await Event.findById(eventId);

    res.json(events.ratings);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: [{ msg: err.message }] });
  }
});

router.get("/getratings/:eventid", async (req, res) => {
  try {
    const { eventid } = req.params;

    event = await Event.findById(eventid);
    if (event) res.json({ rating: event.ratings });
    else res.json({ rating: [] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: [{ msg: err.message }] });
  }
});

router.post("/addatendee", auth, async (req, res) => {
  try {
    const { eventid } = req.body;
    foundEvent = await Event.findById(eventid).populate("atendees");
    for (let i = 0; i < foundEvent.atendees.length; i++) {
      if (foundEvent.atendees[i]._id == req.user.id) {
        return res
          .status(500)
          .json({ errors: [{ msg: "You allready registered to this event" }] });
      }
    }
    foundEvent.atendees.push(req.user.id);
    await foundEvent.save();
    res.json({ atendeeList: foundEvent.atendees });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: [{ msg: err.message }] });
  }
});

router.get("/getatendees/:eventid", async (req, res) => {
  try {
    const { eventid } = req.params;
    event = await Event.findById(eventid).populate("atendees");
    res.json({ atendees: event.atendees });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: [{ msg: err.message }] });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
var sportdata = require("../../b7data/sport.json");
const Event = require("../../models/Event");
const Location = require("../../models/Location");
const Rating = require("../../models/Rating");

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
    let location = await Location.findOne({ lat, lon }).populate({
      path: "events",
      model: "event",
      populate: {
        path: "ratings",
        model: "rating",
      },
    });
    if (location) {
      res.json({ events: location.events });
    } else res.json({ events: [] });
  } catch (err) {
    res.status(500).json({ errors: [{ msg: err.message }] });
  }
});

router.post("/addevent", auth, async (req, res) => {
  try {
    let { start, end, lat, lon, name } = req.body;
    let testDate = new Date();
    let testStartDate = new Date(start);
    if (testDate > testStartDate) {
      return res.status(500).json({
        errors: [{ msg: "You cannot create an event on a past date" }],
      });
    }
    let location = await Location.findOne({ lat, lon }).populate("events");
    if (location && location.events) {
      const eventsArr = location.events;
      const userStart = new Date(start).getTime();

      for (let i = 0; i < eventsArr.length; i++) {
        const startTime = new Date(eventsArr[i].start).getTime();
        const endTime = new Date(eventsArr[i].finish).getTime();
        if (userStart >= startTime && userStart <= endTime) {
          return res.status(500).json({
            errors: [{ msg: "There is allready event at this time" }],
          });
        }
      }
    }
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
      newEvent.location = location._id;
      await newEvent.save();
      location.events.push(newEvent._id);
      await location.save();
    } else {
      const newLocation = new Location({
        lat: lat,
        lon: lon,
      });
      newEvent.location = newLocation._id;
      await newEvent.save();
      newLocation.events.push(newEvent._id);
      await newLocation.save();
    }
    res.json({ msg: "location and event added" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: [{ msg: err.message }] });
  }
});

router.post("/addrating", auth, async (req, res) => {
  try {
    const { rating, eventId } = req.body;
    oldRating = await Rating.findOne({ rater: req.user.id, eventId: eventId });
    if (oldRating) {
      oldRating.rating = parseInt(rating, 10);
      await oldRating.save();
      return res.json({ msg: "Rating was added successfully" });
    }
    newRating = new Rating({
      rater: req.user.id,
      rating: parseInt(rating, 10),
      eventId: eventId,
    });
    await newRating.save();
    event = await Event.findById(eventId);
    event.ratings.push(newRating._id);
    await event.save();
    res.json({ msg: "Rating was added successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: [{ msg: err.message }] });
  }
});

router.get("/getratings/:eventid", auth, async (req, res) => {
  try {
    const { eventid } = req.params;
    rating = await Rating.findOne({ rater: req.user.id, eventId: eventid });
    if (rating) res.json({ rating });
    else res.json({ rating: 0 });
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

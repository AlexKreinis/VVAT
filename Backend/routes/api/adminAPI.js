const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const Profile = require("../../models/Profile");
const auth = require("../../middleware/auth");

router.post("/editevent", auth, async (req, res) => {
  try {
    let { id, start, end, name } = req.body;
    const eventToEdit = await Event.findById({ id });
    console.log("eventToedit------", eventToEdit);

    if (eventsArr && eventsArr.length > 0) {
      const userStart = new Date(start).getTime();

      eventsArr.forEach((event) => {
        const startTime = new Date(event.start).getTime();
        const endTime = new Date(event.finish).getTime();
        if (userStart >= startTime && userStart <= endTime) {
          return res.status(500).json({
            errors: [{ msg: "There is allready event at this time" }],
          });
        }
      });
    }

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

router.get("/getuser/:email", auth, async (req, res) => {
  const userEmail = req.params.email;
  try {
    const otherUser = await User.findOne({ email: userEmail })
      .select("-password")
      .populate("profile");
    res.json({ user: otherUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: [{ msg: err.message }] });
  }
});

router.get("/getallusers", async (req, res) => {
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

router.get("/removeevent/:eventID", async (req, res) => {
  const eventID = req.params.eventID;

  try {
    await Event.deleteOne({ _id: eventID });
    res.json({ msg: "Event Deleted Successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: [{ msg: err.message }] });
  }
});

router.post("/saveuserprofile/:editedUser", auth, async (req, res) => {
  const { email, name, desc, facebook, age } = req.body;

  try {
    const editedUser = await User.findOne({ email: req.body.email });

    if (!editedUser.profile) {
      let profile = new Profile({
        description: desc,
        age: age,
        facebook: facebook,
      });
      await profile.save();
    } else {
      profile = await Profile.findById(editedUser.profile);
      profile.description = desc;
      profile.age = age;
      profile.facebook = facebook;
      await profile.save();
    }
    editedUser.name = name;
    await editedUser.save();
    const user = await User.findOne({ email }).populate("profile");
    //console.log("user in adminAPI---------------", user);
    res.json({ user: user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: [{ msg: err.message }] });
  }
});

module.exports = router;

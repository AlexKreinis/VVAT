const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const Event = require("../../models/Event");
const Profile = require("../../models/Profile");
const adminAuth = require("../../middleware/adminAuth");

router.post("/editevent", adminAuth, async (req, res) => {
  try {
    let { id, start, end, name } = req.body;
    const eventToEdit = await Event.findById(id);
    if (!eventToEdit) {
      return res.json({ msg: "Event was not found" });
    }
    const selectedLocation = await Location.findById(
      eventToEdit.location
    ).populate("events");

    if (selectedLocation && selectedLocation.events) {
      const eventsArr = selectedLocation.events;
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

    eventToEdit.start = start;
    eventToEdit.end = end;
    eventToEdit.name = name;
    await eventToEdit.save();

    res.json({ msg: "event has been updated" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: [{ msg: err.message }] });
  }
});

router.get("/getuser/:email", adminAuth, async (req, res) => {
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

router.get("/getallusers", adminAuth, async (req, res) => {
  try {
    const Users = await User.find().select("-password").populate("profile");
    res.json({ allUsers: Users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: [{ msg: err.message }] });
  }
});

router.get("/getallevents/", adminAuth, async (req, res) => {
  try {
    const Events = await Event.find();

    res.json({ allEvents: Events });
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: [{ msg: err.message }] });
  }
});

router.get("/removeevent/:eventID", adminAuth, async (req, res) => {
  const eventID = req.params.eventID;

  try {
    await Event.deleteOne({ _id: eventID });
    res.json({ msg: "Event Deleted Successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: [{ msg: err.message }] });
  }
});

router.post("/saveuserprofile/", adminAuth, async (req, res) => {
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

router.post("/banUser", adminAuth, async (req, res) => {
  try {
    let { email } = req.body;

    const us = await User.findOne({ email });

    if (!us.isBanned) {
      us.isBanned = true;
      await us.save();
      return res.json({ msg: "banned" });
    } else {
      us.isBanned = false;
      await us.save();
      return res.json({ msg: "not banned" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: [{ msg: err.message }] });
  }
});

module.exports = router;

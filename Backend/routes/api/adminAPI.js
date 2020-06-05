const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const Profile = require("../../models/Profile");
const auth = require("../../middleware/auth");

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

router.get("/removeevent/:name", async (req, res) => {
  const eventName = req.params.name;

  try {
    await Event.deleteOne({ name: eventName });
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
    res.json({ user: user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: [{ msg: err.message }] });
  }
});

module.exports = router;

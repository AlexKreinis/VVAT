const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const Profile = require("../../models/Profile");
const auth = require("../../middleware/auth");

router.get("/getprofile", async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select("-password")
      .populate("profile");

    res.json({ user: user });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

router.post("/saveprofile", auth, async (req, res) => {
  try {
    const Finduser = await User.findById(req.user.id);

    const { name, description } = req.body;
    if (!Finduser.profile) {
      let profile = new Profile({ description: description });

      await profile.save();

      Finduser.profile = profile._id;
      await Finduser.save();
    } else {
      profile = await Profile.findById(Finduser.profile);
      profile.description = description;
      await profile.save();
    }

    Finduser.name = name;
    await Finduser.save();
    res.json({ user: Finduser });
  } catch (err) {
    console.log("error");
    res.status(500).send("Server error");
  }
});

module.exports = router;

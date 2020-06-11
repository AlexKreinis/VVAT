const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const Profile = require("../../models/Profile");
const auth = require("../../middleware/auth");

router.get("/", auth, async (req, res) => {
  try {
    const foundUser = await User.findById(req.user.id);
    const foundProfile = await Profile.findById(foundUser.profile)
      .populate("events")
      .populate("friendList")
      .populate("friendRequest");
    res.json({ profile: foundProfile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: [{ msg: err.message }] });
  }
});
router.get("/eventhistory", auth, async (req, res) => {
  try {
    const foundUser = await User.findById(req.user.id);
    const foundProfile = await Profile.findById(foundUser.profile).populate(
      "events"
    );
    if (!foundProfile) {
      return res.json({ eventHistory: [] });
    }
    if (!foundProfile.events) {
      return res.json({ eventHistory: [] });
    }
    res.json({ eventHistory: foundProfile.events });
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: [{ msg: err.message }] });
  }
});

router.post("/acceptfriendrequest", auth, async (req, res) => {
  try {
    const foundUser = await User.findById(req.user.id);
    const foundProfile = await Profile.findById(foundUser.profile);
    const filteredFriendReuqest = foundProfile.friendRequest.filter(
      (request) => request != req.body.id
    );
    foundProfile.friendRequest = filteredFriendReuqest;
    foundProfile.friendList.push(req.body.id);
    const friendRequestSender = await User.findById(req.body.id);
    const friendRequestProfile = await Profile.findById(
      friendRequestSender.profile
    );
    friendRequestProfile.friendList.push(req.user.id);
    await friendRequestProfile.save();
    foundProfile.save();
    res.json({ msg: "accepted the friend request" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ errors: [{ msg: error.message }] });
  }
});

router.post("/deletefriendrequest", auth, async (req, res) => {
  try {
    const foundUser = await User.findById(req.user.id);
    const foundProfile = await Profile.findById(foundUser.profile);
    const filteredFriendReuqest = foundProfile.friendRequest.filter(
      (request) => request != req.body.id
    );
    foundProfile.friendRequest = filteredFriendReuqest;
    foundProfile.save();
    res.json({ msg: "you have deleted the request" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ errors: [{ msg: error.message }] });
  }
});

router.get("/getfriendrequests", auth, async (req, res) => {
  try {
    const foundUser = await User.findById(req.user.id);
    const foundProfile = await Profile.findById(foundUser.profile).populate(
      "friendRequest"
    );
    console.log();
    if (foundProfile.friendRequest.length > 0) {
      res.json({ friendRequests: foundProfile.friendRequest });
    } else {
      res.json({ friendRequests: [] });
    }
  } catch (error) {
    console.error(err);
    res.status(500).json({ errors: [{ msg: err.message }] });
  }
});
router.post("/sendfriendrequest", auth, async (req, res) => {
  try {
    console.log("entered\n");
    const { id } = req.body;
    const FriendRequestUser = await User.findById(id);
    const friendRequestProfile = await Profile.findById(
      FriendRequestUser.profile._id
    );
    console.log(friendRequestProfile);
    for (let i = 0; i < friendRequestProfile.friendRequest.length; i++) {
      if (friendRequestProfile.friendRequest[i].toString() === req.user.id) {
        return res
          .status(500)
          .json({ errors: [{ msg: "You allready sent a friend request" }] });
      }
    }
    console.log(friendRequestProfile);
    for (let i = 0; i < friendRequestProfile.friendList.length; i++) {
      if (friendRequestProfile.friendList[i].toString() === req.user.id) {
        return res
          .status(500)
          .json({ errors: [{ msg: "You are allready friends" }] });
      }
    }
    friendRequestProfile.friendRequest.push(req.user.id);
    await friendRequestProfile.save();
    res.json({ msg: "success" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: [{ msg: err.message }] });
  }
});

router.get("/finduserprofile/:email", async (req, res) => {
  otherEmail = req.params.email;
  try {
    const otherUser = await User.findOne({ email: otherEmail })
      .select("-password")
      .populate("profile");

    res.json({ other: otherUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: [{ msg: err.message }] });
  }
});

router.post("/saveprofile", auth, async (req, res) => {
  try {
    const Finduser = await User.findById(req.user.id);
    const { name, description, age, facebook } = req.body;
    let profile = await Profile.findById(Finduser.profile);
    if (!profile) {
      profile = new Profile({
        description: description,
        age: age,
        facebook: facebook,
      });
      await profile.save();

      Finduser.profile = profile._id;
    } else {
      profile.description = description;
      profile.age = age;
      profile.facebook = facebook;
      await profile.save();
    }
    Finduser.name = name;
    await Finduser.save();
    const user = await User.findById(req.user.id).populate("profile");
    res.json({ user: user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: [{ msg: err.message }] });
  }
});

module.exports = router;

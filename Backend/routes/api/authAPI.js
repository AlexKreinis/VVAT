const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const Profile = require("../../models/Profile");

const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");

router.get("/getuser", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select("-password")
      .populate("profile");

    console.log("entered");
    res.json(user);
  } catch (err) {
    console.log("entered");

    res.status(500).send("Server error");
  }
});

/* router.get("/getuser/:email", async (req, res) => {
  //console.log("mail: ", email);
  try {
    const email = req.params.email;
    const user = await User.findOne({ email });
    //console.log("ho", user);
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
}); */

router.post("/saveprofile", auth, async (req, res) => {
  try {
    const Finduser = await User.findById(req.user.id);

    const { name, email, description } = req.body;
    var query = { email: Finduser.email };
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

    u = await User.findOne({ email });

    console.log(u.profile.description);
    console.log(Finduser.profile.description);

    const update = {
      name: name,
      email: email,
    };

    const user = await User.findOneAndUpdate(query, update);
    res.json(user);
  } catch (err) {
    console.log("error");
    res.status(500).send("Server error");
  }
});

router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required is required").exists(),
  ],
  async (req, res) => {
    // console.log("hi", auth);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Login details" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Login details" }] });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err);
      res.status(500).json({ errors: [{ msg: err.message }] });
    }
  }
);

router.post(
  "/register",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User allready exists" }] });
      }
      user = new User({
        name,
        email,
        password,
      });
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);
      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err);
      res.status(500).json({ errors: [{ msg: err.message }] });
    }
  }
);

router.delete("/delete/:email", async (req, res) => {
  try {
    //console.log(req.params.email);
    await User.deleteOne({ email: req.params.email });
    res.json({ msg: "Deleted Successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: [{ msg: err.message }] });
  }
});

module.exports = router;

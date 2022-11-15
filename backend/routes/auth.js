const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
  res.send("AUTH ROUTER");
});

//Register
router.post("/register", async (req, res) => {
  try {
    //Password Hashing
    const salt = await bcrypt.genSalt(10);
    const hashPW = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      //Required
      username: req.body.username,
      email: req.body.email,
      password: hashPW,

      //Optional
      profilePicture: req.body.profilePicture,
      coverPicture: req.body.coverPicture,
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
});

//Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    !user && res.status(404).send("User not found!");

    const validPW = await bcrypt.compare(req.body.password, user.password);
    !validPW && res.status(400).json("Invalid Credentials!");

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
  res.send("AUTH ROUTER");
});

//Register
router.post("/register", async (req, res) => {
  //Password Hashing
  const salt = await bcrypt.genSalt(10);
  const hashPW = await bcrypt.hash(req.body.password, salt);

  const userExist = await User.findOne({
    email: req.body.email,
  });

  if (userExist) {
    return res.status(400).json({
      message: "User already exists",
    });
  } else {
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      email: req.body.email,
      password: hashPW,
    });

    try {
      const savedUser = await user.save();
      res.send(savedUser);
    } catch (err) {
      res.status(400).json({
        message: err,
      });
    }
  }
});

//Login
router.post("/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });

  try {
    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
    } else {
      const validPW = await bcrypt.compare(req.body.password, user.password);
      if (!validPW) {
        res.status(400).json({
          message: "Wrong Password",
        });
      } else {
        res.status(200).json(user);
      }
    }
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
});

module.exports = router;

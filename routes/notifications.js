const router = require("express").Router();
const Notification = require("../models/Notification");

// Create a Notification
router.post("/create", async (req, res) => {
  const newNotification = new Notification(req.body);
  try {
    const savedNotification = await newNotification.save();
    res.status(200).json(savedNotification);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get messages from a conversation
router.get("/get-notifications/:receiverId", async (req, res) => {
  try {
    const notifications = await Notification.find({
      receiverId: req.params.receiverId,
    });
    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

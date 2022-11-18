const router = require("express").Router();
const Conversation = require("../models/Conversation");

// Create New Conversation
router.post("/create", async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get conversations of a user
router.get("/get-conversations/:userId", async (req, res) => {
  try {
    const conversation = await Conversation.find({
      // Check the parameter(usedId)in the members array of conversation collection
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

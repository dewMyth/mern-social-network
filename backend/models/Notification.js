const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema(
  {
    receiverId: {
      type: String,
    },
    senderId: {
      type: String,
    },
    typeOfNotification: {
      type: String,
    },
    post: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", NotificationSchema);

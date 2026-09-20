const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    title: String,
    message: String,
    senderRole: { type: String, default: "Admin" },
    receiver: { type: String, enum: ["ALL", "WORKER"] },
    workerId: { type: mongoose.Schema.Types.ObjectId, ref: "Workers" },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const NOTIFICATION = mongoose.model("Notification", notificationSchema);

module.exports = NOTIFICATION;

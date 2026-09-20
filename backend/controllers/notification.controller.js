const Notification = require("../models/notification.model");
const { io } = require("../server");

const notify = async (req, res) => {
  res.status(200).send("Hello Notify !!");
};

/* ================================
   SEND TO ALL WORKERS (ADMIN)
================================ */
const sendToAllWorkers = async (req, res) => {
  try {
    const { title, message } = req.body;

    const notification = await Notification.create({
      title,
      message,
      receiver: "ALL",
    });

    // real-time broadcast
    io.emit("new-notification", notification);

    res.status(201).json({
      success: true,
      message: "Notification sent to all workers",
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/* ================================
   SEND TO SINGLE WORKER (ADMIN)
================================ */
const sendToWorker = async (req, res) => {
  try {
    const { workerId } = req.params;
    const { title, message } = req.body;

    const notification = await Notification.create({
      title,
      message,
      receiver: "WORKER",
      workerId,
    });

    // emit to specific worker room
    io.to(workerId).emit("new-notification", notification);

    res.status(201).json({
      success: true,
      message: "Notification sent to worker",
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/* ================================
   GET WORKER NOTIFICATIONS
================================ */
const getWorkerNotifications = async (req, res) => {
  try {
    const { workerId } = req.params;

    const notifications = await Notification.find({
      $or: [{ receiver: "ALL" }, { workerId }],
    }).sort({ createdAt: -1 });

    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/* ================================
   MARK AS READ
================================ */
const markAsRead = async (req, res) => {
  try {
    const { notificationId } = req.params;

    await Notification.findByIdAndUpdate(notificationId, {
      isRead: true,
    });

    res.status(200).json({
      success: true,
      message: "Notification marked as read",
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  notify,
  sendToAllWorkers,
  sendToWorker,
  getWorkerNotifications,
  markAsRead,
};

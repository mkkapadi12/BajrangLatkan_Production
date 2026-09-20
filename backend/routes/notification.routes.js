const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notification.controller");

router.get("/send", notificationController.notify);

// Admin → send notification to ALL workers
router.post("/send/all", notificationController.sendToAllWorkers);

// Admin → send notification to SINGLE worker
router.post("/send/:workerId", notificationController.sendToWorker);

// Worker → get notifications
router.get("/worker/:workerId", notificationController.getWorkerNotifications);

// Worker → mark notification as read
router.patch("/read/:notificationId", notificationController.markAsRead);

module.exports = router;

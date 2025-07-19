const express = require("express");
const router = express.Router();
const { deleteNotification, getUserNotifications, deleteAllNotifications } = require("../controller/notificationController");
const { protectUser } = require("../middleware/authMiddleware");

router.get("/get-notifications", protectUser, getUserNotifications);

router.delete(
  "/delete-notification/:notificationId",
  protectUser,
  deleteNotification
);

router.delete("/delete-all-notifications", protectUser, deleteAllNotifications);

module.exports = router;

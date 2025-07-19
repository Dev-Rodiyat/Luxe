const expressAsyncHandler = require("express-async-handler");
const Notification = require("../model/notificationModel");
const { mongoose } = require("mongoose");

exports.getUserNotifications = async (req, res) => {
  try {
    const userId = req.userId;

    const notifications = await Notification.find({ user: userId })
      .sort({ createdAt: -1 }) 
      .limit(50);

    res.status(200).json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ message: "Failed to get notifications" });
  }
};

exports.deleteNotification = expressAsyncHandler(async (req, res) => {
  const { notificationId } = req.params;

  try {
    const notification = await Notification.findById(notificationId);

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    if (notification.user.toString() !== req.userId.toString()) {
      return res
        .status(403)
        .json({ message: "You can only delete your own notifications" });
    }

    await notification.deleteOne();

    res.status(200).json({ message: "Notification deleted successfully" });
  } catch (error) {
    console.error("Error deleting notification:", error);
    res.status(500).json({ message: "Error deleting notification" });
  }
});

exports.deleteAllNotifications = expressAsyncHandler(async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.userId);

    const result = await Notification.deleteMany({ user: userId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "No notifications found to delete" });
    }

    res.status(200).json({ message: "All notifications deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting notifications:", error);
    res.status(500).json({ message: "Error deleting notifications" });
  }
});
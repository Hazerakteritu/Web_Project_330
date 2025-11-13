const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");
const {
  createFeedback,
  getNotifications,
  markNotificationAsRead
} = require("../controllers/feedbackController");

const router = express.Router();

// Citizen gives feedback for a completed request
router.post("/", protect, authorizeRoles("citizen"), createFeedback);

// Admin gets notifications, optional filter by status
router.get("/notifications", protect, authorizeRoles("admin"), getNotifications);

// Admin marks notification as read
router.put("/notifications/:id/read", protect, authorizeRoles("admin"), markNotificationAsRead);

module.exports = router;

const express = require("express");
const { createRequest, getAllRequests, updateRequestStatus } = require("../controllers/requestController");
const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

const router = express.Router();

// User submits request
router.post("/", protect, authorizeRoles("citizen"), createRequest);

// Admin views all requests
router.get("/", protect, authorizeRoles("admin"), getAllRequests);

// Admin updates status
router.put("/:id", protect, authorizeRoles("admin"), updateRequestStatus);

module.exports = router;

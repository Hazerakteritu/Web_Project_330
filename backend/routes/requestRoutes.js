const express = require("express");
const {
  createRequest,
  getRequests,
  updateRequestStatus,
  cancelRequest,
    workerAction,
  completeTask
} = require("../controllers/requestController");


const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");
const upload = require("../middleware/uploadMiddleware");


const router = express.Router();

// Citizen submits new request
router.post("/", 
            protect, 
            authorizeRoles("citizen"), 
            upload.single("waste_image"),
            createRequest);

// View all requests
router.get("/", protect, getRequests);

// Admin updates status
router.put("/:id", protect, authorizeRoles("admin"), updateRequestStatus);

// Citizen cancels a pending request
router.put("/:id/cancel", protect, authorizeRoles("citizen"), cancelRequest);

// Worker accepts or rejects assigned task
router.put("/:id/worker-action", protect, authorizeRoles("worker"), workerAction);


router.put("/:id/complete", protect, authorizeRoles("worker"), completeTask);

module.exports = router;

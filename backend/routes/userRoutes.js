const express = require("express");
const router = express.Router();

const { getUserRewards } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.get("/rewards", protect, getUserRewards);

module.exports = router;

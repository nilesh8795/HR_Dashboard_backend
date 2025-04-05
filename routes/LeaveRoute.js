const express = require("express");
const router = express.Router();
const {
  applyLeave,
  getAllLeaves,
  getLeaveById,
  updateLeaveStatus,
  deleteLeave,
} = require("../controllers/LeaveController");
const verifyToken = require("../middleware/VerifyToken.js");  // Add this line

router.post("/leave", verifyToken, applyLeave);
router.get("/leave", verifyToken, getAllLeaves);
router.get("/leave/:id", verifyToken, getLeaveById);
router.put("/leave/:id", verifyToken, updateLeaveStatus);
router.delete("/leave/:id", verifyToken, deleteLeave);

module.exports = router;

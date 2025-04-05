const express = require("express");
const { markAttendance, getAttendance } = require("../controllers/AttendenceController.js");
const verifyToken = require('../middleware/VerifyToken.js');

const router = express.Router();

router.get("/getAttendance", verifyToken, getAttendance);
router.put("/markAttendance/:id", verifyToken, markAttendance);

module.exports = router;

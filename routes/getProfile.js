const express = require('express');
const router = express.Router();
const { getProfile } = require('../controllers/UserProfileController');
const verifyToken = require("../middleware/VerifyToken.js");

router.get('/profile/:id', verifyToken, getProfile);

module.exports = router;

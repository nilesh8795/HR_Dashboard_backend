const express = require('express');
const router = express.Router();
const candidateController = require('../controllers/CandidateController');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const verifyToken = require("../middleware/VerifyToken.js");

cloudinary.config({
  cloud_name: 'dcx4eh4kv',
  api_key: '219731774159817',
  api_secret: 'g-2OpsLPjYqA335y3_pwvJ6VzB0'
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed!'), false);
  }
};

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'resumes',
    resource_type: 'auto'
  }
});

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

router.post('/candidates', verifyToken, upload.single('resume'), candidateController.addCandidate);
router.get('/candidates', verifyToken, candidateController.getCandidates);
router.get('/candidates/:id', verifyToken, candidateController.getCandidateById);
router.put('/candidates/:id', verifyToken, upload.single('resume'), candidateController.updateCandidate);
router.delete('/candidates/:id', verifyToken, candidateController.deleteCandidate);
router.patch('/candidates/:id/status', verifyToken, candidateController.updateCandidateStatus);

module.exports = router;

const Candidate = require('../models/Candidates.js');

// Add a new candidate
exports.addCandidate = async (req, res) => {
  try {
    const { name, email, phone, position, experience } = req.body;
    const resumeUrl = req.file ? req.file.path : null; // Get the resume URL from Cloudinary

    const candidate = new Candidate({
      name,
      email,
      phone,
      position,
      experience,
      resume: resumeUrl
    });

    await candidate.save();
    res.status(201).json({ message: 'Candidate added successfully', candidate });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all candidates
exports.getCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.status(200).json(candidates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get candidate by ID
exports.getCandidateById = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate) return res.status(404).json({ message: 'Candidate not found' });
    
    res.status(200).json(candidate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a candidate
exports.updateCandidate = async (req, res) => {
  try {
    const { name, email, phone, position, experience } = req.body;
    const resumeUrl = req.file ? req.file.path : undefined; 

    const updatedCandidate = await Candidate.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, position, experience, ...(resumeUrl && { resume: resumeUrl }) },
      { new: true }
    );

    if (!updatedCandidate) return res.status(404).json({ message: 'Candidate not found' });

    res.status(200).json({ message: 'Candidate updated successfully', updatedCandidate });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a candidate
exports.deleteCandidate = async (req, res) => {
  try {
    const deletedCandidate = await Candidate.findByIdAndDelete(req.params.id);
    if (!deletedCandidate) return res.status(404).json({ message: 'Candidate not found' });

    res.status(200).json({ message: 'Candidate deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCandidateStatus = async (req, res) => {
  try {
    const candidateId = req.params.id;
    const { status } = req.body;

    if (!['Scheduled', 'Pending', 'Rejected', 'Hired'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const updatedCandidate = await Candidate.findByIdAndUpdate(
      candidateId,
      { status },
      { new: true }
    );

    if (!updatedCandidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }

    res.status(200).json(updatedCandidate);
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ message: 'Failed to update status' });
  }
};


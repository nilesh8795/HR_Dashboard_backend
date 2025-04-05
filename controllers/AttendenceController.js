const Candidate = require("../models/Candidates.js");

// ✅ Mark Attendance (Present/Absent)
const markAttendance = async (req, res) => {
  const { id } = req.params;
  const { attendance } = req.body; // expects "Present" or "Absent"

  if (!["Present", "Absent"].includes(attendance)) {
    return res.status(400).json({ message: "Invalid attendance value" });
  }

  try {
    const updated = await Candidate.findByIdAndUpdate(
      id,
      { attendance },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    res.status(200).json({ message: `Marked as ${attendance}`, data: updated });
  } catch (error) {
    res.status(500).json({ message: "Failed to mark attendance", error });
  }
};

// ✅ Get all candidates with attendance info
const getAttendance = async (req, res) => {
  try {
    const candidates = await Candidate.find({ status: "Hired" }); // Only hired
    res.status(200).json(candidates);
  } catch (error) {
    res.status(500).json({ message: "Error fetching attendance", error });
  }
};

module.exports = {
  markAttendance,
  getAttendance
};

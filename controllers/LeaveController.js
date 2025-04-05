const Leave = require("../models/LeaveModal.js");

// Create new leave request
const applyLeave = async (req, res) => {
  try {
    const leave = new Leave(req.body);
    await leave.save();
    res.status(201).json({ message: "Leave request submitted successfully", data: leave });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all leave requests
const getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find().sort({ createdAt: -1 });
    res.status(200).json(leaves);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single leave request by ID
const getLeaveById = async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id);
    if (!leave) return res.status(404).json({ message: "Leave not found" });
    res.status(200).json(leave);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update leave status (Approve/Reject)
const updateLeaveStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const leave = await Leave.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!leave) return res.status(404).json({ message: "Leave not found" });
    res.status(200).json({ message: "Leave status updated", data: leave });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete leave request
const deleteLeave = async (req, res) => {
  try {
    const leave = await Leave.findByIdAndDelete(req.params.id);
    if (!leave) return res.status(404).json({ message: "Leave not found" });
    res.status(200).json({ message: "Leave deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  applyLeave,
  getAllLeaves,
  getLeaveById,
  updateLeaveStatus,
  deleteLeave,
};

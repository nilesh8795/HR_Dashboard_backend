const AuthModel = require("../models/AuthModel");
const createResponse = require("../services/Response"); // adjust path if needed

const getProfile = async (req, res) => {
    try {
        const { id } = req.user;
        const result = await AuthModel.findById(id); 
        if (result) {
            createResponse(res, 200, 'Profile fetched successfully', result, true, false);
        } else {
            createResponse(res, 404, 'User not found', [], false, true);
        }
    } catch (error) {
        console.error("Error in getProfile:", error);
        createResponse(res, 500, 'Internal server error', [], false, true);
    }
};

module.exports = {
    getProfile
};

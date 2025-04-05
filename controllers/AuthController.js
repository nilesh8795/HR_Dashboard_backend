const createResponse = require("../services/Response");
const AuthModel = require("../models/AuthModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await AuthModel.findOne({ email });
        if (existingUser) {
            return createResponse(res, 400, "User already exists", [], false);
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new AuthModel({ name, email, password: hashedPassword });
        await newUser.save();

        return createResponse(res, 201, "User registered successfully", newUser);
    } catch (error) {
        return createResponse(res, 500, "Failed to register user", [], false, error.message);
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await AuthModel.findOne({ email });
        if (!existingUser) return createResponse(res, 404, "User not found", [], false);
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) return createResponse(res, 401, "Invalid credentials", [], false);
        const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        return createResponse(res, 200, "Login successful", { user: existingUser, token });
    } catch (error) {
        return createResponse(res, 500, "Failed to login", [], false, error.message);
    }
};


module.exports = { register , login};

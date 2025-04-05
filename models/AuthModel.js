const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
})
const AuthModel = mongoose.model('Auth', authSchema);
module.exports = AuthModel;
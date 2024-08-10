const mongoose = require('mongoose');

const trackrSchema = new mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
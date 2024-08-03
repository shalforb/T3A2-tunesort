const User = require("../models/User");


const createUser = async (req, res) => {
    console.log('Request body:', req.body);
    const { email, password } = req.body;

    const newUser = new User({ email, password });

    try {
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

module.exports = { createUser };
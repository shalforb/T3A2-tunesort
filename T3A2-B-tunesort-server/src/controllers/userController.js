const User = require('../models/User'); // Import your User model
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getUserInfo = async (req, res) => {
    const authHeader = req.headers.authorization; 
    console.log('Authorization header:', authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log('Authorization header is missing or invalid');
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1]; 
    console.log('Token extracted:', token); 

    try {
      
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded token:', decoded);
        const userId = decoded.userId;

      
        const user = await User.findById(userId);
        if (!user) {
            console.log('User not found with ID:', userId);
            return res.status(404).json({ message: 'User not found' });
        }

 
        const { password, ...userData } = user.toObject();
        console.log('User data:', userData);
        res.status(200).json(userData); 
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(401).json({ message: 'Invalid token' });
    }
};

const createUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Error creating user' });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
    
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

     
        console.log('User found:', user);
        console.log('User password hash:', user.password);


        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Password match result:', isMatch);
        
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

      
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token, message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = { createUser, loginUser, getUserInfo };
const User = require('../models/accountModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const payload = { userId: user._id }; // Include user ID in the payload
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '3d' }); // Set appropriate expiration time

        res.status(200).json({
            message: 'Login successful',
            token,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error logging in user' });
    }
}

const currentUser = async (req, res) => {
    const user = await User.findById(req.user.userId).select('-password -_id'); // Exclude password from response
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json({ user: user });
}

const getUsersList = async (req, res) => {
    try {
        const users = await User.find();
        // Optionally exclude sensitive fields like password before returning
        res.json(users.map(user => ({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            role: user.role,
        })));
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching users' });
    }
}

const get = async (req, res) => {
    try {
        const { username, firstName, lastName, password, role } = req.body;

        // Validate inputs (additional validation as needed)
        if (!username || !firstName || !lastName || !password) {
            return res.status(400).json({ message: 'Required fields are missing' });
        }

        // Check for existing username
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ message: 'Username already exists' });
        }

        const user = new User({ username, firstName, lastName, password, role });
        await user.save();

        // Send success response without sensitive information
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error registering user' });
    }
}

const createUser = async (req, res) => {
    try {
        const { username, firstName, lastName, password, role } = req.body;

        // Validate inputs (additional validation as needed)
        if (!username || !firstName || !lastName || !password) {
            return res.status(400).json({ message: 'Required fields are missing' });
        }

        // Check for existing username
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ message: 'Username already exists' });
        }

        const user = new User({ username, firstName, lastName, password, role });
        await user.save();

        // Send success response without sensitive information
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error registering user' });
    }
}

const getUserByID = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Optionally exclude sensitive fields like password before returning
        res.json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            role: user.role,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching user' });
    }
}

const updateUserByID = async (req, res) => {
    try {
        const userId = req.params.id;
        const updates = req.body;

        // Validate updates (consider using a validation library like Joi)

        const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true }); // Return updated user
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating user' });
    }
}

const deleteUserByID = async (req, res) => {
    try {
        const userId = req.params.id;

        // Implement authorization checks here (e.g., only admins can delete users)
        // You can use middleware or check for admin role in the current user session

        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Optionally handle any post-deletion actions (e.g., deleting associated data)

        res.json({ message: 'User deleted' }); // Informative message
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting user' });
    }
}

module.exports = {
    loginUser,
    currentUser,
    getUsersList,
    createUser,
    getUserByID,
    updateUserByID,
    deleteUserByID
}
const jwt = require('jsonwebtoken');
const User = require('../models/accountModel');

const isAdmin = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        // Check for admin role in the payload
        const user = await User.findById(decoded.userId);
        if (!user || user.role !== 'admin') {
            return res.status(403).json({ message: 'Forbidden (Not admin)' });
        }
        
        req.user = decoded; // Attach decoded user information to the request
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token' });
    }
};

const IsAuthenticated = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1]; // Extract token from 'Bearer '
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded; // Attach decoded user to req.user
        next();
    } catch (error) {
        res.status(403).json({ message: 'Invalid token' });
    }
};

module.exports = {
    isAdmin,
    IsAuthenticated
};
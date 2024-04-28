const { createUser, currentUser, deleteUserByID, getUserByID, getUsersList, loginUser, updateUserByID } = require('../controller/accountController');

const express = require('express');
const router = express.Router();
const { isAdmin, IsAuthenticated } = require('../middleware/authMiddleware');

router.post('/login', loginUser); // [POST][accounts/login]

router.get('/me', IsAuthenticated, currentUser); // [GET][accounts/me]

router.get('/users', isAdmin, getUsersList); // [GET][accounts/users]

router.get('/:id', isAdmin, getUserByID); // [GET][/accounts/:id]

router.post('/create', isAdmin, createUser); // [POST][/accounts/:id]

router.put('/:id', isAdmin, updateUserByID); // [PUT][/accounts/:id]

router.delete('/:id', isAdmin, deleteUserByID); // [DELETE][/accounts/:id]

module.exports = router
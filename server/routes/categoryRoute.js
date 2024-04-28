const express = require('express');
const router = express.Router();
const { isAdmin, IsAuthenticated } = require('../middleware/authMiddleware');
const { getCategoriesList, createNewCategory, deleteCategoryByID } = require('../controller/categoryController');

router.get('/', getCategoriesList);

router.post('/create', isAdmin, createNewCategory);

router.delete('/:id', IsAuthenticated, deleteCategoryByID);

module.exports = router
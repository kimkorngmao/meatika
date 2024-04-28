const express = require('express');
const router = express.Router();
const { isAdmin, IsAuthenticated } = require('../middleware/authMiddleware');
const { getArticlesList, getTrendingArticlesList, searchArticles, getCurrentUserArticlesList, getArticlesListByCategory, createNewArticle, deleteArticleByID, updateArticleByID, getArticleByID } = require('../controller/articleController');


// Get all articles (GET request to /articles)
router.get('/', getArticlesList);

// Get all trending articles (GET request to /articles/trending)
router.get('/trending', getTrendingArticlesList);

// Get all articles by searching (GET request to /articles/search/:query)
router.get('/search/:query', searchArticles);

router.get('/me', IsAuthenticated, getCurrentUserArticlesList);

// Get articles by category (GET request to /articles/category?category=...)
router.get('/category', getArticlesListByCategory);

// Create an article (POST request to /articles/create)
router.post('/create', isAdmin, createNewArticle);

// Get a specific article (GET request to /articles/:id)
router.get('/:id', getArticleByID);

// Update an article (PUT request to /articles/:id)
router.put('/:id', isAdmin, updateArticleByID);

// Delete an article (DELETE request to /articles/:id)
router.delete('/:id', isAdmin, deleteArticleByID);

module.exports = router
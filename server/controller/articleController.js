const mongoose = require('mongoose');
const Article = require('../models/articleModel');
const Category = require('../models/categoryModel');

const getArticlesList = async (req, res) => {
    try {
        const articles = await Article.find()
            .populate('author', 'name email') // Include author details (name and email)
            .sort({ createdAt: -1 }); // Sort by creation date (descending)
        res.json(articles);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }

}

const getTrendingArticlesList = async (req, res) => {
    try {
        const articles = await Article.find()
            .populate('author', 'username') // Include author details (name and email)
            .sort({ views: -1, createdAt: -1 }); // Sort by creation date (descending)
        res.json(articles);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

const searchArticles = async (req, res) => {
    const { query } = req.params;

    const regex = new RegExp(query, 'i');
    try {
        const articles = await Article.find({
            $or: [
                { title: { $regex: regex } },
                { content: { $regex: regex } },
            ],
        });

        res.json(articles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

const getCurrentUserArticlesList = async (req, res) => {
    try {
        const userId = req.user.userId;
        // Find all articles where author matches the user ID
        const articles = await Article.find({ author: userId });
        res.json(articles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

const getArticlesListByCategory = async (req, res) => {
    const category = req.query.category;
    var articles = null;
    if (category === "latest") {
        try {
            articles = await Article.find();
            res.json(articles);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server Error' });
        }
    } else {
        try {
            // Find the category by name
            const foundCategory = await Category.findOne({ code: category });

            if (!foundCategory) {
                return res.status(404).json({ message: 'Category not found' });
            }

            articles = await Article.find({ category: foundCategory._id });

            res.json(articles);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server Error' });
        }
    }
}

const createNewArticle = async (req, res) => {
    const { title, content, image, category } = req.body;

    // Basic validation (can be enhanced)
    if (!title || !content || !image) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    try {
        const authorId = req.user.userId;
        const newArticle = new Article({ title, content, image, author: authorId, category: category });
        const savedArticle = await newArticle.save();
        res.status(201).json(savedArticle);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

const getArticleByID = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: 'Invalid article ID' });
    }

    try {
        const article = await Article.findByIdAndUpdate(id, { $inc: { views: 1 } }, { new: true })
            .populate('author', 'name email'); // Include author details
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }
        res.json(article);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

const updateArticleByID = async (req, res) => {
    const { id } = req.params;
    const { title, content, image, category } = req.body;

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: 'Invalid article ID' });
    }

    // Basic validation (can be enhanced)
    if (!title || !content || !image || !category) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    try {
        const updatedArticle = await Article.findByIdAndUpdate(
            id,
            { title, content, image, category },
            { new: true }
        );
        if (!updatedArticle) {
            return res.status(404).json({ message: 'Article not found' });
        }
        res.json(updatedArticle);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

const deleteArticleByID = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: 'Invalid article ID' });
    }

    try {
        const article = await Article.findById(id);
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }
        if (req.user.userId != article.author.toString()) {
            return res.status(401).json({ message: 'Unauthorized: You can only delete your own articles' });
        }
        await Article.findByIdAndDelete(id);
        res.json({ message: 'Article deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = {
    getArticlesList,
    getTrendingArticlesList,
    searchArticles,
    getCurrentUserArticlesList,
    getArticlesListByCategory,
    createNewArticle,
    getArticleByID,
    updateArticleByID,
    deleteArticleByID
}
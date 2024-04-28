const Category = require('../models/categoryModel');

const getCategoriesList = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

const createNewCategory = async (req, res) => {
    const { name } = req.body;
    const code = name.toLowerCase();
    try {
        // Check for existing category with the same name
        const existingCategory = await Category.findOne({ code });
        if (existingCategory) {
            return res.status(400).json({ message: 'Category already exists' });
        }

        const newCategory = new Category({ name, code });
        const savedCategory = await newCategory.save();
        res.status(201).json(savedCategory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

const deleteCategoryByID = async (req, res) => {
    try {
      const categoryId = req.params.id;
  
      // Use findByIdAndDelete to find and delete the category by ID
      const deletedCategory = await Category.findByIdAndDelete(categoryId);
  
      if (!deletedCategory) {
        return res.status(404).json({ message: 'Category not found' });
      }
  
      res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    getCategoriesList,
    createNewCategory,
    deleteCategoryByID
}
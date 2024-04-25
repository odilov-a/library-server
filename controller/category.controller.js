const Category = require("../models/Category.js");

class CategoryController {
  async getAllCategory(req, res) {
    try {
      const allCategory = await Category.find();
      if (allCategory.length === 0) {
        return res.status(404).json({ data: [] });
      }
      return res.json({
        data: allCategory,
        totalItems: allCategory.length,
      });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async getCategoryById(req, res) {
    try {
      const category = await Category.findById(req.params.categoryId);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      return res.json({ data: category });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async createCategory(req, res) {
    try {
      const newCategory = await Category.create({
        title: req.body.title,
      });
      return res.json({ data: newCategory });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async updateCategory(req, res) {
    try {
      const oldCategory = await Category.findById(req.params.categoryId);
      if (!oldCategory) {
        return res.status(404).json({ message: "Category not found" });
      }
      const updatedCategory = await Category.findByIdAndUpdate(
        req.params.categoryId,
        {
          title: req.body.title,
        },
        { new: true }
      );
      return res.json({ data: updatedCategory });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async deleteCategory(req, res) {
    try {
      const deletedCategory = await Category.findByIdAndDelete(
        req.params.categoryId
      );
      if (!deletedCategory) {
        return res.status(404).json({ message: "Category not found" });
      }
      return res.json({ message: "Category deleted successfully" });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new CategoryController();

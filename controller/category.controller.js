const Category = require("../models/Category.js");

exports.getAllCategory = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const [totalCategory, allCategory] = await Promise.all([
      Category.countDocuments(),
      Category.find()
        .skip((page - 1) * perPage)
        .limit(perPage),
    ]);
    const totalPages = Math.ceil(totalCategory / perPage);
    if (allCategory.length === 0) {
      return res.status(404).json({ data: [] });
    }
    return res.json({
      data: allCategory,
      page,
      totalPages,
      totalItems: totalCategory,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    return res.json({ data: category });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const newCategory = await Category.create({
      title: req.body.title,
    });
    return res.json({ data: newCategory });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.updateCategory = async (req, res) => {
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
};

exports.deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.categoryId);
    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    return res.json({ message: "Category deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
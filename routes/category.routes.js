const { Router } = require("express");
const categoryController = require("../controller/category.controller.js");
const categoryRoutes = Router();

categoryRoutes.get("/", categoryController.getAllCategory);
categoryRoutes.get("/search", categoryController.searchCategories);
categoryRoutes.get("/:categoryId", categoryController.getCategoryById);
categoryRoutes.post("/", categoryController.createCategory);
categoryRoutes.put("/:categoryId", categoryController.updateCategory);
categoryRoutes.delete("/:categoryId", categoryController.deleteCategory);

module.exports = categoryRoutes;
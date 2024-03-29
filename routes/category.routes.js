const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware.js");
const categoryController = require("../controller/category.controller.js");
const categoryRoutes = Router();

categoryRoutes.get("/", categoryController.getAllCategory);
categoryRoutes.get("/:categoryId", categoryController.getCategoryById);
categoryRoutes.post("/", authMiddleware, categoryController.createCategory);
categoryRoutes.put("/:categoryId", authMiddleware, categoryController.updateCategory);
categoryRoutes.delete("/:categoryId", authMiddleware, categoryController.deleteCategory);

module.exports = categoryRoutes;
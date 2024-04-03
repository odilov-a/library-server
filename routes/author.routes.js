const { Router } = require("express");
// const authMiddleware = require("../middlewares/auth.middleware.js");
const uploadMiddleware = require("../middlewares/upload.middleware.js");
const authorController = require("../controller/author.controller.js");
const authorRoutes = Router();

authorRoutes.get("/", authorController.getAllAuthor);
authorRoutes.get("/:authorId", authorController.getAuthorById);
authorRoutes.get("/search", authorController.searchAuthors);
authorRoutes.post("/", uploadMiddleware, authorController.createAuthor);
authorRoutes.put("/:authorId", uploadMiddleware, authorController.updateAuthor);
authorRoutes.delete("/:authorId", uploadMiddleware, authorController.deleteAuthor);

module.exports = authorRoutes;
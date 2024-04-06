const { Router } = require("express");
const authorController = require("../controller/author.controller.js");
const authorRoutes = Router();

authorRoutes.get("/", authorController.getAllAuthor);
authorRoutes.get("/search", authorController.searchAuthors);
authorRoutes.get("/:authorId", authorController.getAuthorById);
authorRoutes.post("/", authorController.createAuthor);
authorRoutes.put("/:authorId", authorController.updateAuthor);
authorRoutes.delete("/:authorId", authorController.deleteAuthor);

module.exports = authorRoutes;
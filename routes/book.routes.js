const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware.js");
const uploadMiddleware = require("../middlewares/upload.middleware.js");
const bookController = require("../controller/book.controller.js");
const bookRoutes = Router();

bookRoutes.get("/", bookController.getAllBook);
bookRoutes.get("/:bookId", bookController.getBookById);
bookRoutes.get("/search", bookController.searchBooks);
bookRoutes.get("/:bookId/like", bookController.likeBook);
bookRoutes.get("/:bookId/dislike", bookController.dislikeBook);
bookRoutes.post("/", authMiddleware, uploadMiddleware, bookController.createBook);
bookRoutes.put("/:bookId", authMiddleware, uploadMiddleware, bookController.updateBook);
bookRoutes.delete("/:bookId", authMiddleware, uploadMiddleware, bookController.deleteBook);

module.exports = bookRoutes;
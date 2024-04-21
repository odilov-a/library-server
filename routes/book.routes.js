const { Router } = require("express");
const uploadMiddleware = require("../middlewares/upload.middleware.js");
const bookController = require("../controller/book.controller.js");
const studentController = require("../controller/student.controller.js");
const bookRoutes = Router();

bookRoutes.get("/", bookController.getAllBook);
bookRoutes.get("/search", bookController.searchBooks);
bookRoutes.get("/:bookId", bookController.getBookById);
bookRoutes.post("/", uploadMiddleware, bookController.createBook);
bookRoutes.put("/:bookId", uploadMiddleware, bookController.updateBook);
bookRoutes.delete("/:bookId", uploadMiddleware, bookController.deleteBook);
bookRoutes.post("/:bookId/book", bookController.bookBook);
bookRoutes.get("/student/:studentId/books", studentController.getBooksForStudent);

module.exports = bookRoutes;
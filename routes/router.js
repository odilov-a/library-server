const { Router } = require("express");
const translationRoutes = require("./translation.routes.js");
const userRoutes = require("./user.routes.js");
const bookRoutes = require("./book.routes.js");
const categoryRoutes = require("./category.routes.js");
const authorRoutes = require("./author.routes.js");
const studentRoutes = require("./student.routes.js");
const router = Router();

router.use("/translations", translationRoutes);
router.use("/users", userRoutes);
router.use("/books", bookRoutes);
router.use("/categories", categoryRoutes);
router.use("/authors", authorRoutes);
router.use("/students", studentRoutes);

module.exports = router;
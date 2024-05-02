const { Router } = require("express");
const userRoutes = require("./user.routes.js");
const bookRoutes = require("./book.routes.js");
const categoryRoutes = require("./category.routes.js");
const authorRoutes = require("./author.routes.js");
const studentRoutes = require("./student.routes.js");
const publisherRoutes = require("./publisher.routes.js");
const orderRoutes = require("./order.routes.js");
const router = Router();

router.use("/users", userRoutes);
router.use("/books", bookRoutes);
router.use("/categories", categoryRoutes);
router.use("/authors", authorRoutes);
router.use("/students", studentRoutes);
router.use("/publishers", publisherRoutes);
router.use("/orders", orderRoutes);

module.exports = router;
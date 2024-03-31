const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware.js");
const publisherController = require("../controller/publisher.controller.js");
const publisherRoutes = Router();

publisherRoutes.get("/", publisherController.getAllPublisher);
publisherRoutes.get("/:publisherId", publisherController.getPublisherById);
publisherRoutes.get("/search", publisherController.searchPublishers);
publisherRoutes.post("/", authMiddleware, publisherController.createPublisher);
publisherRoutes.put("/:publisherId", authMiddleware, publisherController.updatePublisher);
publisherRoutes.delete("/:publisherId", authMiddleware, publisherController.deletePublisher);

module.exports = publisherRoutes;
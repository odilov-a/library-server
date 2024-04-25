const { Router } = require("express");
const publisherController = require("../controller/publisher.controller.js");
const publisherRoutes = Router();

publisherRoutes.get("/", publisherController.getAllPublisher);
publisherRoutes.get("/:publisherId", publisherController.getPublisherById);
publisherRoutes.post("/", publisherController.createPublisher);
publisherRoutes.put("/:publisherId", publisherController.updatePublisher);
publisherRoutes.delete("/:publisherId", publisherController.deletePublisher);

module.exports = publisherRoutes;
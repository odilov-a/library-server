const { Router } = require("express");
const orderController = require("../controller/order.controller.js");
const orderRoutes = Router();

orderRoutes.get("/", orderController.getAllOrder);
orderRoutes.get("/:orderId", orderController.getOrderById);
orderRoutes.post("/", orderController.createOrder);
orderRoutes.put("/:orderId", orderController.updateOrder);
orderRoutes.delete("/:orderId", orderController.deleteOrder);

module.exports = orderRoutes;
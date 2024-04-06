const { Router } = require("express");
const userController = require("../controller/user.controller.js");
const userRoutes = Router();

userRoutes.get("/get-me", userController.getMe);
userRoutes.put("/:userId", userController.update);
userRoutes.post("/login", userController.login);
userRoutes.post("/register", userController.register);

module.exports = userRoutes;
const { Router } = require("express");
const userController = require("../controller/user.controller.js");
const userRoutes = Router();

userRoutes.get("/get-all", userController.getAllUsers);
userRoutes.get("/get-me", userController.getMe);
userRoutes.get("/:userId", userController.getUserById); // Route to get a user by ID
userRoutes.put("/:userId", userController.update); // Route to update a user by ID
userRoutes.post("/login", userController.login);
userRoutes.post("/register", userController.register);
userRoutes.delete("/:userId", userController.deleteUsers);

module.exports = userRoutes;
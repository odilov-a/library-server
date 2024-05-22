const { Router } = require("express");
const superUserController = require("../controller/super.user.controller");
const superUserRoutes = Router();

superUserRoutes.get("/get-me", superUserController.SuperGetMe);
superUserRoutes.put("/:userId", superUserController.SuperUpdate);
superUserRoutes.post("/login", superUserController.SuperLogin);
superUserRoutes.post("/register", superUserController.SuperRegister);

module.exports = superUserRoutes;
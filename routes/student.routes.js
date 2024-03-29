const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware.js");
const uploadMiddleware = require("../middlewares/upload.middleware.js");
const studentController = require("../controller/student.controller.js");
const studentRoutes = Router();

studentRoutes.get("/", studentController.getAllStudent);
studentRoutes.get("/:studentId", studentController.getStudentById);
studentRoutes.get("/search", studentController.searchStudents);
studentRoutes.post("/", authMiddleware, uploadMiddleware, studentController.createStudent);
studentRoutes.put("/:studentId", authMiddleware, uploadMiddleware, studentController.updateStudent);
studentRoutes.delete("/:studentId", authMiddleware, uploadMiddleware, studentController.deleteStudent);

module.exports = studentRoutes;
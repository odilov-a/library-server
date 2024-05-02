const { Router } = require("express");
const uploadMiddleware = require("../middlewares/upload.middleware.js");
const studentController = require("../controller/student.controller.js");
const studentRoutes = Router();

studentRoutes.get("/", studentController.getAllStudent);
studentRoutes.get("/search", studentController.searchStudents);
studentRoutes.get("/:studentId", studentController.getStudentById);
studentRoutes.post("/", uploadMiddleware, studentController.createStudent);
studentRoutes.put("/:studentId", uploadMiddleware, studentController.updateStudent);
studentRoutes.delete("/:studentId", studentController.deleteStudent);

module.exports = studentRoutes;
const { Router } = require("express");
const studentController = require("../controller/student.controller.js");
const studentRoutes = Router();

studentRoutes.get("/", studentController.getAllStudent);
studentRoutes.get("/search", studentController.searchStudents);
studentRoutes.get("/:studentId", studentController.getStudentById);
studentRoutes.post("/", studentController.createStudent);
studentRoutes.put("/:studentId", studentController.updateStudent);
studentRoutes.delete("/:studentId", studentController.deleteStudent);

module.exports = studentRoutes;
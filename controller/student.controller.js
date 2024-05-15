const Student = require("../models/Student.js");

class StudentController {
  async getAllStudent(req, res) {
    try {
      const allStudent = await Student.find()
      if (allStudent.length === 0) {
        return res.status(404).json({ data: [] });
      }
      return res.json({
        data: allStudent,
        totalItems: allStudent.length,
      });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async searchStudents(req, res) {
    try {
      const query = req.query;
      const page = parseInt(query.page) || 1;
      const perPage = parseInt(query.perPage) || 10;
      let searchParams = {};
      if (query.name) {
        searchParams.name = { $regex: new RegExp(query.name, "i") };
      }
      if (query.username) {
        searchParams.username = { $regex: new RegExp(query.username, "i") };
      }
      const [totalStudents, students] = await Promise.all([
        Student.countDocuments(searchParams),
        Student.find(searchParams)
          .skip((page - 1) * perPage)
          .limit(perPage)
      ]);
      const totalPages = Math.ceil(totalStudents / perPage);
      if (students.length === 0) {
        return res.status(404).json({
          data: [],
          message: "No students found matching the search criteria",
        });
      }
      return res.json({
        data: students,
        page,
        totalPages,
        totalItems: totalStudents,
      });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async getStudentById(req, res) {
    try {
      const student = await Student.findById(req.params.studentId);
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }
      return res.json({ data: student });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async createStudent(req, res) {
    try {
      const existingStudent = await Student.findOne({
        username: req.body.username,
      });
      if (existingStudent) {
        return res.status(400).json({ error: "Username already exists" });
      }
      req.body.image = req.images;
      const newStudent = await Student.create({
        name: req.body.name,
        username: req.body.username,
        image: req.body.image,
      });
      return res.json({ data: newStudent });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async updateStudent(req, res) {
    try {
      const oldStudent = await Student.findById(req.params.studentId);
      if (!oldStudent) {
        return res.status(404).json({ message: "Student not found" });
      }
      req.body.image = req.images;
      const updatedStudent = await Student.findByIdAndUpdate(
        req.params.studentId,
        {
          name: req.body.name,
          username: req.body.username,
          image: req.body.image,
        },
        { new: true }
      );
      return res.json({ data: updatedStudent });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async deleteStudent(req, res) {
    try {
      const deletedStudent = await Student.findByIdAndDelete(
        req.params.studentId
      );
      if (!deletedStudent) {
        return res.status(404).json({ message: "Student not found" });
      }
      return res.json({ message: "Student deleted successfully" });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new StudentController();

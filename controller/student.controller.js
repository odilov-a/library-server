const Student = require("../models/Student.js");
const Book = require("../models/Book.js");

class StudentController {
  async getAllStudent(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const perPage = parseInt(req.query.perPage) || 10;
      const [totalStudent, allStudent] = await Promise.all([
        Student.countDocuments(),
        Student.find()
          .skip((page - 1) * perPage)
          .limit(perPage),
      ]);
      const totalPages = Math.ceil(totalStudent / perPage);
      if (allStudent.length === 0) {
        return res.status(404).json({ data: [] });
      }
      return res.json({
        data: allStudent,
        page,
        totalPages,
        totalItems: totalStudent,
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
          .limit(perPage),
      ]);
      const totalPages = Math.ceil(totalStudents / perPage);
      if (students.length === 0) {
        return res.status(404).json({ data: [], message: "No students found matching the search criteria" });
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
      const newStudent = await Student.create({
        name: req.body.name,
        username: req.body.username,
        booked: req.body.booked,
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
      const updatedStudent = await Student.findByIdAndUpdate(
        req.params.studentId,
        {
          name: req.body.name,
          username: req.body.username,
          booked: req.body.booked,
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

  async bookBookForStudent(req, res) {
    try {
      const { studentId, bookId } = req.params;
      const student = await Student.findById(studentId);
      const book = await Book.findById(bookId);
      if (!student || !book) {
        return res.status(404).json({ message: "Student or book not found" });
      }
      if (student.booked.includes(bookId)) {
        return res.status(400).json({ message: "Book already booked by the student" });
      }
      if (book.count <= 0) {
        return res.status(400).json({ message: "Book is out of stock" });
      }
      student.booked.push(bookId);
      await student.save();
      book.count--;
      await book.save();
      return res.json({ message: "Booked successfully" });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async getBooksForStudent(req, res) {
    try {
      const { studentId } = req.params;
      const student = await Student.findById(studentId).populate("booked");
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }
      return res.json({ data: student.booked });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new StudentController();
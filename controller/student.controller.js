const Student = require("../models/Student.js");

exports.getAllStudent = async (req, res) => {
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
};

exports.searchStudents = async (req, res) => {
  try {
    const query = req.query;
    const page = parseInt(query.page) || 1;
    const perPage = parseInt(query.perPage) || 10;
    let searchParams = {};
    if (query.name) {
      searchParams.name = { $regex: new RegExp(query.name, "i") };
    }
    if (query.login) {
      searchParams.login = { $regex: new RegExp(query.login, "i") };
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
};

exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    return res.json({ data: student });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.createStudent = async (req, res) => {
  try {
    req.body.image = req.images;
    const hashedPassword = await bcrypt.hash(req.body.password, 10); 
    const newStudent = await Student.create({
      name: req.body.name,
      description: req.body.description,
      login: req.body.login,
      password: hashedPassword,
      image: req.body.image,
    });
    return res.json({ data: newStudent });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const oldStudent = await Student.findById(req.params.studentId);
    if (!oldStudent) {
      return res.status(404).json({ message: "Student not found" });
    }
    req.body.image = req.images;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.studentId,
      {
        name: req.body.name,
        description: req.body.description,
        login: req.body.login,
        password: hashedPassword, 
        image: req.body.image,
      },
      { new: true }
    );
    return res.json({ data: updatedStudent });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.deleteStudent = async (req, res) => {
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
};

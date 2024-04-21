const Book = require("../models/Book.js");
const Student = require("../models/Student.js");

class BookController {
  async getAllBook(req, res) {
    try {
      const allBook = await Book.find();
      if (allBook.length === 0) {
        return res.status(404).json({ data: [] });
      }
      return res.json({
        data: allBook,
        totalItems: allBook.length,
      });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async searchBooks(req, res) {
    try {
      const query = req.query;
      const page = parseInt(query.page) || 1;
      const perPage = parseInt(query.perPage) || 10;
      let searchParams = {};
      if (query.author) {
        searchParams.author = { $regex: new RegExp(query.author, "i") };
      }
      if (query.category) {
        searchParams.category = { $regex: new RegExp(query.category, "i") };
      }
      if (query.title) {
        searchParams.title = { $regex: new RegExp(query.title, "i") };
      }
      if (query.publisher) {
        searchParams.publisher = { $regex: new RegExp(query.publisher, "i") };
      }
      if (query.year) {
        searchParams.year = query.year;
      }
      if (query.startYear && query.endYear) {
        searchParams.year = {
          $gte: parseInt(query.startYear),
          $lte: parseInt(query.endYear),
        };
      }
      const [totalBooks, books] = await Promise.all([
        Book.countDocuments(searchParams),
        Book.find(searchParams)
          .skip((page - 1) * perPage)
          .limit(perPage),
      ]);
      const totalPages = Math.ceil(totalBooks / perPage);
      if (books.length === 0) {
        return res
          .status(404)
          .json({
            data: [],
            message: "No books found matching the search criteria",
          });
      }
      return res.json({
        data: books,
        page,
        totalPages,
        totalItems: totalBooks,
      });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async getBookById(req, res) {
    try {
      const book = await Book.findById(req.params.bookId);
      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }
      return res.json({ data: book });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async createBook(req, res) {
    try {
      req.body.image = req.images;
      const newBook = await Book.create({
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        author: req.body.author,
        count: req.body.count,
        year: req.body.year,
        image: req.body.image,
        publisher: req.body.publisher,
      });
      return res.json({ data: newBook });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async updateBook(req, res) {
    try {
      const oldBook = await Book.findById(req.params.bookId);
      if (!oldBook) {
        return res.status(404).json({ message: "Book not found" });
      }
      req.body.image = req.images;
      const updatedBook = await Book.findByIdAndUpdate(
        req.params.bookId,
        {
          title: req.body.title,
          description: req.body.description,
          category: req.body.category,
          author: req.body.author,
          count: req.body.count,
          year: req.body.year,
          image: req.body.image,
          publisher: req.body.publisher,
        },
        { new: true }
      );
      return res.json({ data: updatedBook });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async deleteBook(req, res) {
    try {
      const deletedBook = await Book.findByIdAndDelete(req.params.bookId);
      if (!deletedBook) {
        return res.status(404).json({ message: "Book not found" });
      }
      return res.json({ message: "Book deleted successfully" });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async bookBook(req, res) {
    try {
      const { studentId, bookId } = req.params;
      const student = await Student.findById(studentId);
      const book = await Book.findById(bookId);
      if (!student || !book) {
        return res.status(404).json({ message: "Student or book not found" });
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

  async getBooksByStudent(req, res) {
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

module.exports = new BookController();
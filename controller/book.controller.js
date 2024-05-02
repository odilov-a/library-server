const Book = require("../models/Book.js");

class BookController {
  async getAllBook(req, res) {
    try {
      const allBook = await Book.find().populate(["author", "category", "publisher"]);
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
        searchParams.author = query.author; // Assuming author is an exact match
      }
      if (query.category) {
        searchParams.category = query.category; // Assuming category is an exact match
      }
      if (query.title) {
        searchParams.title = { $regex: new RegExp(query.title, "i") };
      }
      if (query.publisher) {
        searchParams.publisher = query.publisher; // Assuming publisher is an exact match
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
          .limit(perPage)
          .populate(["author", "category", "publisher"])
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
        category: req.body.category,
        author: req.body.author,
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
          category: req.body.category,
          author: req.body.author,
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
}

module.exports = new BookController();
const Book = require("../models/Book.js");

exports.getAllBook = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const [totalBook, allBook] = await Promise.all([
      Book.countDocuments(),
      Book.find()
        .skip((page - 1) * perPage)
        .limit(perPage),
    ]);
    const totalPages = Math.ceil(totalBook / perPage);
    if (allBook.length === 0) {
      return res.status(404).json({ data: [] });
    }
    return res.json({
      data: allBook,
      page,
      totalPages,
      totalItems: totalBook,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.searchBooks = async (req, res) => {
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
      searchParams.year = { $gte: parseInt(query.startYear), $lte: parseInt(query.endYear) };
    }
    const [totalBooks, books] = await Promise.all([
      Book.countDocuments(searchParams),
      Book.find(searchParams)
        .skip((page - 1) * perPage)
        .limit(perPage),
    ]);
    const totalPages = Math.ceil(totalBooks / perPage);
    if (books.length === 0) {
      return res.status(404).json({ data: [], message: "No books found matching the search criteria" });
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
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.json({ data: book });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.createBook = async (req, res) => {
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
};

exports.updateBook = async (req, res) => {
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
};

exports.deleteBook = async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.bookId);
    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.json({ message: "Book deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
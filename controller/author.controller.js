const Author = require("../models/Author.js");

class AuthorController {
  async getAllAuthor(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const perPage = parseInt(req.query.perPage) || 10;
      const [totalAuthor, allAuthor] = await Promise.all([
        Author.countDocuments(),
        Author.find()
          .skip((page - 1) * perPage)
          .limit(perPage),
      ]);
      const totalPages = Math.ceil(totalAuthor / perPage);
      if (allAuthor.length === 0) {
        return res.status(404).json({ data: [] });
      }
      return res.json({
        data: allAuthor,
        page,
        totalPages,
        totalItems: totalAuthor,
      });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async searchAuthors(req, res) {
    try {
      const query = req.query;
      const page = parseInt(query.page) || 1;
      const perPage = parseInt(query.perPage) || 10;
      let searchParams = {};
      if (query.name) {
        searchParams.name = { $regex: new RegExp(query.name, "i") };
      }
      const [totalAuthors, authors] = await Promise.all([
        Author.countDocuments(searchParams),
        Author.find(searchParams)
          .skip((page - 1) * perPage)
          .limit(perPage),
      ]);
      const totalPages = Math.ceil(totalAuthors / perPage);
      if (authors.length === 0) {
        return res.status(404).json({ data: [], message: "No authors found matching the search criteria" });
      }
      return res.json({
        data: authors,
        page,
        totalPages,
        totalItems: totalAuthors,
      });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async getAuthorById(req, res) {
    try {
      const author = await Author.findById(req.params.authorId);
      if (!author) {
        return res.status(404).json({ message: "Author not found" });
      }
      return res.json({ data: author });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async createAuthor(req, res) {
    try {
      const newAuthor = await Author.create({
        title: req.body.title,
      });
      return res.json({ data: newAuthor });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async updateAuthor(req, res) {
    try {
      const oldAuthor = await Author.findById(req.params.authorId);
      if (!oldAuthor) {
        return res.status(404).json({ message: "Author not found" });
      }
      const updatedAuthor = await Author.findByIdAndUpdate(
        req.params.authorId,
        {
          title: req.body.title,
        },
        { new: true }
      );
      return res.json({ data: updatedAuthor });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async deleteAuthor(req, res) {
    try {
      const deletedAuthor = await Author.findByIdAndDelete(req.params.authorId);
      if (!deletedAuthor) {
        return res.status(404).json({ message: "Author not found" });
      }
      return res.json({ message: "Author deleted successfully" });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new AuthorController();
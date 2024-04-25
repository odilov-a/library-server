const Publisher = require("../models/Publisher.js");

class PublisherController {
  async getAllPublisher(req, res) {
    try {
      const allPublisher = await Publisher.find();
      if (allPublisher.length === 0) {
        return res.status(404).json({ data: [] });
      }
      return res.json({
        data: allPublisher,
        totalItems: allPublisher.length,
      });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async getPublisherById(req, res) {
    try {
      const publisher = await Publisher.findById(req.params.publisherId);
      if (!publisher) {
        return res.status(404).json({ message: "Publisher not found" });
      }
      return res.json({ data: publisher });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async createPublisher(req, res) {
    try {
      const newPublisher = await Publisher.create({
        title: req.body.title,
      });
      return res.json({ data: newPublisher });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async updatePublisher(req, res) {
    try {
      const oldPublisher = await Publisher.findById(req.params.publisherId);
      if (!oldPublisher) {
        return res.status(404).json({ message: "Publisher not found" });
      }
      const updatedPublisher = await Publisher.findByIdAndUpdate(
        req.params.publisherId,
        {
          title: req.body.title,
        },
        { new: true }
      );
      return res.json({ data: updatedPublisher });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async deletePublisher(req, res) {
    try {
      const deletedPublisher = await Publisher.findByIdAndDelete(
        req.params.publisherId
      );
      if (!deletedPublisher) {
        return res.status(404).json({ message: "Publisher not found" });
      }
      return res.json({ message: "Publisher deleted successfully" });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new PublisherController();

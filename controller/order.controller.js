const Order = require("../models/Order.js");

class OrderController {
  async getAllOrder(req, res) {
    try {
      const allOrder = await Order.find().populate(["student", "book"]);
      if (allOrder.length === 0) {
        return res.status(404).json({ data: [] });
      }
      return res.json({
        data: allOrder,
        totalItems: allOrder.length,
      });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }  

  async getOrderById(req, res) {
    try {
      const order = await Order.findById(req.params.orderId);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      return res.json({ data: order });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async createOrder(req, res) {
    try {
      const newOrder = await Order.create({
        student: req.body.student,
        book: req.body.book,
        take: req.body.take,
        give: req.body.give,
      });
      return res.json({ data: newOrder });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async updateOrder(req, res) {
    try {
      const oldOrder = await Order.findById(req.params.orderId);
      if (!oldOrder) {
        return res.status(404).json({ message: "Order not found" });
      }
      const updatedOrder = await Order.findByIdAndUpdate(
        req.params.orderId,
        {
          student: req.body.student,
          book: req.body.book,
          take: req.body.take,
          give: req.body.give,
        },
        { new: true }
      );
      return res.json({ data: updatedOrder });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async deleteOrder(req, res) {
    try {
      const deletedOrder = await Order.findByIdAndDelete(req.params.orderId);
      if (!deletedOrder) {
        return res.status(404).json({ message: "Order not found" });
      }
      return res.json({ message: "Order deleted successfully" });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new OrderController();

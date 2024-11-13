const express = require('express');
const router = express.Router();
const { Order } = require('../models');

// GET all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET an order by order_no
router.get('/:order_no', async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.order_no);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST a new order
router.post('/', async (req, res) => {
  const { order_date, customer_id, total_amount, status } = req.body;
  try {
    const newOrder = await Order.create({ order_date, customer_id, total_amount, status });
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT update an existing order
router.put('/:order_no', async (req, res) => {
  const { order_date, customer_id, total_amount, status } = req.body;
  try {
    const [updated] = await Order.update(
      { order_date, customer_id, total_amount, status },
      { where: { order_no: req.params.order_no } }
    );
    if (!updated) {
      return res.status(404).json({ error: 'Order not found' });
    }
    const updatedOrder = await Order.findByPk(req.params.order_no);
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE an order by order_no
router.delete('/:order_no', async (req, res) => {
  try {
    const deleted = await Order.destroy({ where: { order_no: req.params.order_no } });
    if (!deleted) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.status(204).json({ message: 'Order deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

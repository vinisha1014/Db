// controllers/inventoryController.js
const { Inventory } = require('../models');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const items = await Inventory.findAll();
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const item = await Inventory.findByPk(req.params.id);
        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const { stock_name, stock_quantity } = req.body;
        const newItem = await Inventory.create({ stock_name, stock_quantity });
        res.status(201).json(newItem);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/:id',async (req, res) => {
    try {
        const { stock_name, stock_quantity } = req.body;
        const [updated] = await Inventory.update(
            { stock_name, stock_quantity },
            { where: { stock_id: req.params.id } }
        );
        if (!updated) {
            return res.status(404).json({ error: 'Item not found' });
        }
        const updatedItem = await Inventory.findByPk(req.params.id);
        res.json(updatedItem);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:id',async (req, res) => {
    try {
        const deleted = await Inventory.destroy({ where: { stock_id: req.params.id } });
        if (!deleted) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.status(204).json({ message: 'Item deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

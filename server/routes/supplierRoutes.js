// routes/suppliers.js
const express = require('express');
const router = express.Router();
const { Supplier } = require('../models');

// Get all suppliers
router.get('/', async (req, res) => {
    try {
        const suppliers = await Supplier.findAll();
        res.json(suppliers);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve suppliers', error });
    }
});

// Get a single supplier by ID
router.get('/:id', async (req, res) => {
    try {
        const supplier = await Supplier.findByPk(req.params.id);
        if (!supplier) {
            return res.status(404).json({ message: 'Supplier not found' });
        }
        res.json(supplier);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve supplier', error });
    }
});

// Create a new supplier
router.post('/', async (req, res) => {
    try {
        const { supplier_name, contact_person, email, phone_number, address, city, state, postal_code, country, items_supplied} = req.body;
        const newSupplier = await Supplier.create({
            supplier_name,
            contact_person,
            email,
            phone_number,
            address,
            city,
            state,
            postal_code,
            country,
            items_supplied,
            createdAt: new Date(),
            updatedAt: new Date()            
        });
        res.status(201).json(newSupplier);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create supplier', error });
    }
});

// Update a supplier by ID
router.put('/:id', async (req, res) => {
    try {
        const supplier = await Supplier.findByPk(req.params.id);
        if (!supplier) {
            return res.status(404).json({ message: 'Supplier not found' });
        }
        await supplier.update(req.body);
        res.json(supplier);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update supplier', error });
    }
});

// Delete a supplier by ID
router.delete('/:id', async (req, res) => {
    try {
        const supplier = await Supplier.findByPk(req.params.id);
        if (!supplier) {
            return res.status(404).json({ message: 'Supplier not found' });
        }
        await supplier.destroy();
        res.json({ message: 'Supplier deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete supplier', error });
    }
});

module.exports = router;

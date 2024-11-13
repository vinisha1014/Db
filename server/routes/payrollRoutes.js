// routes/payrollRoutes.js
const express = require('express');
const router = express.Router();
const { Payroll } = require('../models'); // Adjust based on your models folder structure

// CREATE a payroll entry
router.post('/', async (req, res) => {
    try {
//                 createdAt: new Date(),
//                 updatedAt: new Date()
// to append these fielids before adding 
        

        const newPayroll = await Payroll.create(req.body);
        res.status(201).json(newPayroll);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create payroll entry', details: error.message });
    }
});

// READ all payroll entries
router.get('/', async (req, res) => {
    try {
        const payrollEntries = await Payroll.findAll({ include: 'employee' }); // Include associated employee data
        res.status(200).json(payrollEntries);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve payroll entries', details: error.message });
    }
});

// READ a single payroll entry by ID
router.get('/:id', async (req, res) => {
    try {
        const payrollEntry = await Payroll.findByPk(req.params.id, { include: 'employee' });
        if (!payrollEntry) {
            return res.status(404).json({ error: 'Payroll entry not found' });
        }
        res.status(200).json(payrollEntry);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve payroll entry', details: error.message });
    }
});

// UPDATE a payroll entry by ID
router.put('/:id', async (req, res) => {
    try {
        const [updated] = await Payroll.update(req.body, { where: { payroll_id: req.params.id } });
        if (!updated) {
            return res.status(404).json({ error: 'Payroll entry not found' });
        }
        const updatedPayroll = await Payroll.findByPk(req.params.id);
        res.status(200).json(updatedPayroll);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update payroll entry', details: error.message });
    }
});

// DELETE a payroll entry by ID
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Payroll.destroy({ where: { payroll_id: req.params.id } });
        if (!deleted) {
            return res.status(404).json({ error: 'Payroll entry not found' });
        }
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete payroll entry', details: error.message });
    }
});

module.exports = router;

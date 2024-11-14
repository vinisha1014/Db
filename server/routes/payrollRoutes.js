const express = require('express');
const router = express.Router();
const { Payroll, Employee } = require('../models'); // Adjust based on your models folder structure

// CREATE a payroll entry
router.post('/', async (req, res) => {
    try {
        const { emp_id, pay_period, pay_date, salary, bonus } = req.body;

        const newPayroll = await Payroll.create({
            emp_id,
            pay_period,
            pay_date,
            salary,
            bonus,
        });

        res.status(201).json(newPayroll);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create payroll entry', details: error.message });
    }
});

// READ all payroll entries
router.get('/', async (req, res) => {
    try {
        const payrollEntries = await Payroll.findAll({
            include: {
                model: Employee,
                as: 'employee',
                attributes: ['first_name', 'last_name', 'email'], // Adjust attributes as needed
            },
        });

        res.status(200).json(payrollEntries);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve payroll entries', details: error.message });
    }
});

// READ a single payroll entry by ID
router.get('/:id', async (req, res) => {
    try {
        const payrollEntry = await Payroll.findByPk(req.params.id, {
            include: {
                model: Employee,
                as: 'employee',
                attributes: ['first_name', 'last_name', 'email'],
            },
        });

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
        const {
            salary,
            bonus,
            net_salary,
            gross_salary,
            pay_date,
            pay_period,
        } = req.body; // Destructure the fields being sent in the request body

        // Find the payroll entry by ID
        const payrollEntry = await Payroll.findByPk(req.params.id);
        if (!payrollEntry) {
            return res.status(404).json({ error: 'Payroll entry not found' });
        }

        // Validate and process inputs
        const updatedData = {};

        if (salary !== undefined) {
            
            updatedData.salary = Number.parseFloat(salary).toFixed(2);
        }

        if (bonus !== undefined) {
            
            updatedData.bonus = Number.parseFloat(bonus).toFixed(2);
        }

        if (pay_date !== undefined) {
            updatedData.pay_date = pay_date; // Assuming the date is sent in a valid format
        }

        if (pay_period !== undefined) {
            updatedData.pay_period = pay_period; // Assuming the period is a valid string or format
        }

        // Update the record
        await payrollEntry.update(updatedData);

        // Return the updated record
        res.status(200).json({
            message: 'Payroll entry updated successfully',
            data: payrollEntry,
        });
    } catch (error) {
        console.error('Error updating payroll:', error.message);
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

const express = require('express');
const router = express.Router();
const { Department } = require('../models');

// GET all departments
router.get('/', async (req, res) => {
    try {
        const departments = await Department.findAll();
        res.json(departments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET a single department by ID
router.get('/:id', async (req, res) => {
    try {
        const department = await Department.findByPk(req.params.id);
        if (department) {
            res.json(department);
        } else {
            res.status(404).json({ error: 'Department not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST a new department
router.post('/', async (req, res) => {
    const { dep_name, dep_email, emp_id } = req.body;
    try {
        const newDepartment = await Department.create({ dep_name, dep_email, emp_id });
        res.status(201).json(newDepartment);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// PUT to update a department by ID
router.put('/:id', async (req, res) => {
    const { dep_name, dep_email, emp_id } = req.body;
    try {
        const department = await Department.findByPk(req.params.id);
        if (department) {
            department.dep_name = dep_name;
            department.dep_email = dep_email;
            department.emp_id = emp_id;
            await department.save();
            res.json(department);
        } else {
            res.status(404).json({ error: 'Department not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE a department by ID
router.delete('/:id', async (req, res) => {
    try {
        const department = await Department.findByPk(req.params.id);
        if (department) {
            await department.destroy();
            res.json({ message: 'Department deleted' });
        } else {
            res.status(404).json({ error: 'Department not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

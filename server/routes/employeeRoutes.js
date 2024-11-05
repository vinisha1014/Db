const express = require('express');
const { Employee } = require('../models');
const router = express.Router();

// CREATE an employee
router.post('/', async (req, res) => {
  try {
    const employee = await Employee.create(req.body);
    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ all employees
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.findAll();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ a single employee by ID
router.get('/:emp_id', async (req, res) => {
  try {
    const employee = await Employee.findOne({ where: { emp_id: req.params.emp_id } });
    if (employee) {
      res.json(employee);
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE an employee by ID
router.put('/:emp_id', async (req, res) => {
  try {
    const updated = await Employee.update(req.body, { where: { emp_id: req.params.emp_id } });
    if (updated[0]) {
      res.json({ message: 'Employee updated' });
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE an employee by ID
router.delete('/:emp_id', async (req, res) => {
  try {
    const deleted = await Employee.destroy({ where: { emp_id: req.params.emp_id } });
    if (deleted) {
      res.json({ message: 'Employee deleted' });
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

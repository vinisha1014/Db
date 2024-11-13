const express = require('express');
const router = express.Router();
const { sequelize } = require('../models');

router.get('/employee-payroll', async (req, res) => {
  try {
    const [results] = await sequelize.query('SELECT * FROM EmployeePayrollView');
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch employee payroll details' });
  }
});

module.exports = router;

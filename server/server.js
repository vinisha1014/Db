const express = require('express');
const cors = require('cors');
const app = express();


// Enable CORS for all routes
app.use(cors());
app.use(cors({
    origin: 'http://localhost:5173', // Allow only this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed methods
    credentials: true, // Include credentials (cookies, etc.)
}));


const { sequelize } = require('./models');
const employeeRoutes = require('./routes/employeeRoutes');
const supplierRoutes = require('./routes/supplierRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const orderRoutes = require('./routes/orderRoutes');
const customerRoutes = require('./routes/customerRoutes');
const payrollRoutes = require('./routes/payrollRoutes');
require('dotenv').config();

app.use(express.json()); // Parse JSON request bodies

app.use('/api/employees', employeeRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/payrolls', payrollRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await sequelize.authenticate();
  console.log('Database connected!');
});

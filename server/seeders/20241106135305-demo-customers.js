'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Customers', [
      {
        customer_name: 'John Doe',
        address: '123 Main St',
        phone: '123-456-7890',
        email: 'john@example.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        customer_name: 'Jane Smith',
        address: '456 Elm St',
        phone: '987-654-3210',
        email: 'jane@example.com',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Customers', null, {});
  }
};

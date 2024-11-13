'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Orders', [
      {
        order_no: 1,
        order_date: new Date(),
        customer_id: 101,
        total_amount: 250.75,
        status: 'Shipped',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        order_no: 2,
        order_date: new Date(),
        customer_id: 102,
        total_amount: 499.50,
        status: 'Pending',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        order_no: 3,
        order_date: new Date(),
        customer_id: 103,
        total_amount: 100.00,
        status: 'Delivered',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Orders', null, {});
  }
};

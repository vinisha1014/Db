// seeders/xxxx-seed-inventory.js
module.exports = {
  up: async (queryInterface) => {
      await queryInterface.bulkInsert('Inventory', [
          { stock_name: 'Item A', stock_quantity: 100 },
          { stock_name: 'Item B', stock_quantity: 50 },
          { stock_name: 'Item C', stock_quantity: 150 },
      ], {});
  },
  down: async (queryInterface) => {
      await queryInterface.bulkDelete('Inventory', null, {});
  }
};

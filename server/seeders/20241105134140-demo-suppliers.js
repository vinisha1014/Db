// seeders/XXXXXX-demo-suppliers.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('Suppliers', [
          {
              supplier_name: 'ABC Supplies',
              contact_person: 'John Doe',
              email: 'contact@abcsupplies.com',
              phone_number: '123-456-7890',
              address: '123 Main St',
              city: 'Metropolis',
              state: 'NY',
              postal_code: '10001',
              country: 'USA',
              items_supplied: 'Office Supplies, Stationery',
  
              createdAt: new Date(),
              updatedAt: new Date()
          },
          {
              supplier_name: 'XYZ Manufacturing',
              contact_person: 'Jane Smith',
              email: 'jane@xyzmanufacturing.com',
              phone_number: '987-654-3210',
              address: '456 Industrial Way',
              city: 'Gotham',
              state: 'CA',
              postal_code: '90210',
              country: 'USA',
              items_supplied: 'Machinery, Tools',

              createdAt: new Date(),
              updatedAt: new Date()
          },
          // Add more entries as needed
      ], {});
  },

  down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('Suppliers', null, {});
  }
};

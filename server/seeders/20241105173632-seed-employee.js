'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Employees', [
      {
        first_name: 'John',
        last_name: 'Doe',
        email: 'johndoe@example.com',
        dob: '1990-01-01',
        salary: 50000.0,
      },
      {
        first_name: 'Jane',
        last_name: 'Smith',
        email: 'janesmith@example.com',
        dob: '1985-05-15',
        salary: 60000.0,
      },
      {
        first_name: 'Alice',
        last_name: 'Johnson',
        email: 'alicejohnson@example.com',
        dob: '1992-09-23',
        salary: 55000.0,
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Employees', null, {});
  }
};

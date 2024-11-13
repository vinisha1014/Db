'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Departments', [
      {
        dep_name: 'Human Resources',
        dep_email: 'hr@company.com',
        emp_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        dep_name: 'Engineering',
        dep_email: 'engineering@company.com',
        emp_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Departments', null, {});
  }
};

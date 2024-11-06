'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Payroll', [
            {
                emp_id: 1,
                pay_period: '2024-01',
                pay_date: new Date(),
                salary: 5000.00,
                bonus: 250.00,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                emp_id: 2,
                pay_period: '2024-02',
                pay_date: new Date(),
                salary: 4500.00,
                bonus: 200.00,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Payroll', null, {});
    }
};

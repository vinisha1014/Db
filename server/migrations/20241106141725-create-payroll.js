'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Payroll', {
            payroll_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            emp_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Employees', // name of Target model
                    key: 'emp_id', // key in Target model
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            pay_period: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            pay_date: {
                type: Sequelize.DATE,
                allowNull: false
            },
            salary: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: false
            },
            bonus: {
                type: Sequelize.DECIMAL(10, 2),
                defaultValue: 200
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.fn('NOW')
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.fn('NOW')
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Payroll');
    }
};

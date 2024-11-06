'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Departments', {
      dep_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      dep_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dep_email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      emp_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Employees', // Matches the Employee table name in the database
          key: 'emp_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Departments');
  }
};

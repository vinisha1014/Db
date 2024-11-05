'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('Suppliers', {
          supplier_id: {
              type: Sequelize.INTEGER,
              primaryKey: true,
              autoIncrement: true
          },
          supplier_name: {
              type: Sequelize.STRING,
              allowNull: false
          },
          contact_person: {
              type: Sequelize.STRING
          },
          email: {
              type: Sequelize.STRING,
              allowNull: false,
              unique: true
          },
          phone_number: {
              type: Sequelize.STRING
          },
          address: {
              type: Sequelize.STRING
          },
          city: {
              type: Sequelize.STRING
          },
          state: {
              type: Sequelize.STRING
          },
          postal_code: {
              type: Sequelize.STRING
          },
          country: {
              type: Sequelize.STRING
          },
          items_supplied: {
              type: Sequelize.TEXT
          },
          createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        
      });
  },
  down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('Suppliers');
  }
};

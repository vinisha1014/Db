// models/supplier.js
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Supplier extends Model {
    static associate(models) {
      // define association here if needed
    }
  }
  Supplier.init({
    supplier_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    supplier_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    contact_person: {
      type: DataTypes.STRING(100),
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    phone_number: {
      type: DataTypes.STRING(20),
    },
    address: {
      type: DataTypes.STRING(255),
    },
    city: {
      type: DataTypes.STRING(50),
    },
    state: {
      type: DataTypes.STRING(50),
    },
    postal_code: {
      type: DataTypes.STRING(20),
    },
    country: {
      type: DataTypes.STRING(50),
    },
    items_supplied: {
      type: DataTypes.TEXT,
    },

  }, {
    sequelize,
    modelName: 'Supplier',
    timestamps: false, // or true if you want Sequelize to manage createdAt/updatedAt
  });
  return Supplier;
};

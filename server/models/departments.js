'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Department extends Model {
    static associate(models) {
      // Define association here
      Department.belongsTo(models.Employee, {
        foreignKey: 'emp_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }
  Department.init({
    dep_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    dep_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dep_email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    emp_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Employees', // Make sure this matches the Employee table name
        key: 'emp_id'
      }
    }
  }, {
    sequelize,
    modelName: 'Department',
    tableName: 'Departments'
  });
  return Department;
};

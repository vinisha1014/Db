// models/inventory.js
module.exports = (sequelize, DataTypes) => {
  const Inventory = sequelize.define('Inventory', {
      stock_id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
      },
      stock_name: {
          type: DataTypes.STRING(50),
          allowNull: false,
          unique: true,
      },
      stock_quantity: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
      },
  }, {
      tableName: 'Inventory',
      timestamps: false,
  });
  return Inventory;
};

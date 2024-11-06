'use strict';
module.exports = (sequelize, DataTypes) => {
    const Payroll = sequelize.define('Payroll', {
        payroll_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        emp_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        pay_period: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        pay_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        salary: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        bonus: {
            type: DataTypes.DECIMAL(10, 2),
            defaultValue: 200
        }
    }, {
        tableName: 'Payroll',
        timestamps: true
    });

    Payroll.associate = (models) => {
        Payroll.belongsTo(models.Employee, {
            foreignKey: 'emp_id',
            as: 'employee'
        });
    };

    return Payroll;
};

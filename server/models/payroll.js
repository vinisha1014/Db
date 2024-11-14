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
        },
        net_salary: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        },
        gross_salary: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        }
    }, {
        tableName: 'Payroll',
        timestamps: false
    });

    Payroll.associate = (models) => {
        Payroll.belongsTo(models.Employee, {
            foreignKey: 'emp_id',
            as: 'employee'
        });
    };

    Payroll.beforeCreate((payroll) => {
        payroll.net_salary = payroll.salary - (payroll.salary * 0.1); // Example tax deduction of 10%
        payroll.gross_salary = payroll.salary + payroll.bonus;
    });

    Payroll.beforeUpdate((payroll) => {
        payroll.net_salary = payroll.salary - (payroll.salary * 0.1); // Example tax deduction of 10%
        payroll.gross_salary = payroll.salary + payroll.bonus;
    });

    return Payroll;
};

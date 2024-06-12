'use strict';

const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Customer extends Model {
        static associate(models) {
            Customer.hasMany(models.Quote, { foreignKey: 'customerId', as: 'dataCustomer' })
            Customer.hasMany(models.Invoice, { foreignKey: 'customerId', as: 'dataCustomerInvoice' })
        }
    };
    Customer.init({
        customerId: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        fullName: DataTypes.STRING,
        email: DataTypes.STRING,
        phone: DataTypes.STRING,
        gender: DataTypes.STRING,
        status: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Customer',
        tableName: 'customers'
    });
    return Customer;
};
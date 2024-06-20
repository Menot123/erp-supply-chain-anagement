'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Invoice extends Model {
        static associate(models) {
            Invoice.belongsTo(models.AllCode, { foreignKey: 'paymentPolicy', targetKey: 'id', as: 'invoicePaymentPolicy' })
            Invoice.belongsTo(models.Customer, { foreignKey: 'customerId', targetKey: 'customerId', as: 'dataCustomerInvoice' })
        }
    };
    Invoice.init({
        invoiceId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        customerId: DataTypes.STRING,
        createdDate: DataTypes.STRING,
        paymentPolicy: DataTypes.STRING,
        productList: DataTypes.TEXT,
        policyAndCondition: DataTypes.STRING,
        priceBeforeTax: DataTypes.STRING,
        tax: DataTypes.STRING,
        totalPrice: DataTypes.STRING,
        status: DataTypes.STRING,
        createdUser: DataTypes.INTEGER,
        updatedUser: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Invoice',
        tableName: 'invoices'
    });
    return Invoice;
};
'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Invoice extends Model {
        static associate(models) {
            Invoice.belongsTo(models.AllCode, { foreignKey: 'paymentPolicy', targetKey: 'id', as: 'invoicePaymentPolicy' })
        }
    };
    Invoice.init({
        invoiceId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        providerId: DataTypes.STRING,
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
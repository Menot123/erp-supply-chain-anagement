'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class InvoicePaid extends Model {
        static associate(models) {
            // InvoicePaid.belongsTo(models.Customer, { foreignKey: 'customerId', targetKey: 'customerId', as: 'dataCustomerInvoice' })
        }
    };
    InvoicePaid.init({
        invoiceId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        datePaid: DataTypes.STRING,
        createdDate: DataTypes.STRING,
        total: DataTypes.STRING,
        paymentMethod: DataTypes.STRING,
        delete_flag: DataTypes.BOOLEAN,
        createdUser: DataTypes.INTEGER,
        updatedUser: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'InvoicePaid',
        tableName: 'invoice_paid'
    });
    return InvoicePaid;
};
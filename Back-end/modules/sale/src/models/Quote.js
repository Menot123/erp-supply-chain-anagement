'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Quote extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Quote.belongsTo(models.AllCode, { foreignKey: 'currency', targetKey: 'id', as: 'dataCurrency' })
            Quote.belongsTo(models.AllCode, { foreignKey: 'paymentPolicy', targetKey: 'id', as: 'dataPaymentPolicy' })
        }
    };
    Quote.init({
        quoteId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        customerId: DataTypes.STRING,
        employeeId: DataTypes.INTEGER,
        expirationDay: DataTypes.STRING,
        signature: DataTypes.TEXT('long'),
        currency: DataTypes.STRING,
        paymentPolicy: DataTypes.STRING,
        productList: DataTypes.TEXT,
        policyAndCondition: DataTypes.STRING,
        priceBeforeTax: DataTypes.STRING,
        tax: DataTypes.STRING,
        totalPrice: DataTypes.STRING,
        deliveryDate: DataTypes.STRING,
        status: DataTypes.STRING,
        createdUser: DataTypes.INTEGER,
        updatedUser: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Quote',
        tableName: 'quotes'
    });
    return Quote;
};
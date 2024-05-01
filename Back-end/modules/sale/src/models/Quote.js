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
            // define association here
        }
    };
    Quote.init({
        customer: DataTypes.STRING,
        expirationDay: DataTypes.STRING,
        currency: DataTypes.STRING,
        paymentPolicy: DataTypes.STRING,
        productList: DataTypes.TEXT,
        policyAndStament: DataTypes.STRING,
        totalPrice: DataTypes.STRING,
        status: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Quote',
        tableName: 'quotes'
    });
    return Quote;
};
'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Customer extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
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
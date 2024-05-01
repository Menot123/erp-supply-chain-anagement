'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Customer extends Model {
        static associate(models) {
            ////
            Customer.hasMany(models.StockDelivery, { foreignKey: 'customerId' })
        }
    };
    Customer.init({
        customerId: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        nameVi: DataTypes.STRING,
        nameEn: DataTypes.STRING,
        addressVi: DataTypes.STRING,
        addressEn: DataTypes.STRING,
        logo: DataTypes.STRING,
        contact: DataTypes.STRING,
        website: DataTypes.STRING,
        status: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Customer',
        freezeTableName: true
    });
    return Customer;
};
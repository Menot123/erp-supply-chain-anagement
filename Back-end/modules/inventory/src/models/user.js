'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.hasMany(models.StockDeliveryItem, { foreignKey: 'stockDeliveryId' })
            User.hasMany(models.StockEntry, { foreignKey: 'stockEntryId' })
        }
    };
    User.init({
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        status: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'User',
        tableName: 'users',
    });
    return User;
};
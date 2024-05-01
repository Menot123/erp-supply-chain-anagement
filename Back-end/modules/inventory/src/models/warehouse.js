'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Warehouse extends Model {
        static associate(models) {
            ////
            Warehouse.hasMany(models.Stock, { foreignKey: 'stockId' })
            Warehouse.hasMany(models.StockDelivery, { foreignKey: 'stockDeliveryId' })
            Warehouse.hasMany(models.StockEntry, { foreignKey: 'stockEntryId' })
        }
    };
    Warehouse.init({
        keyType: DataTypes.STRING,
        type: DataTypes.STRING,
        valueVi: DataTypes.STRING,
        valueEn: DataTypes.STRING,
        status: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Warehouse',
        freezeTableName: true
    });
    return Warehouse;
};
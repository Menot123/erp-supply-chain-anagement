'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class StockDelivery extends Model {
        static associate(models) {
            ////
            StockDelivery.belongsTo(models.Customer)
            StockDelivery.belongsTo(models.Warehouse)
            StockDelivery.hasMany(models.StockDeliveryItem, { foreignKey: 'stockDeliveryId' })
        }
    };
    StockDelivery.init({
        stockDeliveryId: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        warehouseId: DataTypes.STRING,
        customerId: DataTypes.STRING,
        transactionType: DataTypes.STRING,
        transactionDate: DataTypes.DATE,
        status: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'StockDelivery',
        freezeTableName: true
    });
    return StockDelivery;
};
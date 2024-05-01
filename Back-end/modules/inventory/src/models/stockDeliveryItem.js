'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class StockDeliveryItem extends Model {
        static associate(models) {
            ////
            StockDeliveryItem.belongsTo(models.StockDelivery)
            StockDeliveryItem.belongsTo(models.Product)
        }
    };
    StockDeliveryItem.init({
        stockDeliveryItemId: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        stockDeliveryId: DataTypes.STRING,
        productId: DataTypes.STRING,
        quantity: DataTypes.INTEGER,
        status: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'StockDeliveryItem',
        freezeTableName: true
    });
    return StockDeliveryItem;
};
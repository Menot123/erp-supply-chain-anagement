'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class StockEntryItem extends Model {
        static associate(models) {
            ////
            StockEntryItem.belongsTo(models.StockEntry)
            StockEntryItem.belongsTo(models.Product)
        }
    };
    StockEntryItem.init({
        stockEntryItemId: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        stockDeliveryId: DataTypes.STRING,
        productId: DataTypes.STRING,
        quantity: DataTypes.INTEGER,
        status: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'StockEntryItem',
        freezeTableName: true
    });
    return StockEntryItem;
};
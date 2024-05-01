'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Stock extends Model {
        static associate(models) {
            ////
            Stock.belongsTo(models.Warehouse)
            Stock.belongsTo(models.Product)
        }
    };
    Stock.init({
        stockId: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        productId: DataTypes.STRING,
        warehouseId: DataTypes.STRING,
        quantity: DataTypes.INTEGER,
        status: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Stock',
        freezeTableName: true
    });
    return Stock;
};
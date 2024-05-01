'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class StockEntry extends Model {
        static associate(models) {
            ////
            StockEntry.belongsTo(models.Provider)
            StockEntry.belongsTo(models.Warehouse)
            StockEntry.hasMany(models.StockEntryItem, { foreignKey: 'stockEntryId' })
        }
    };
    StockEntry.init({
        stockEntryId: {
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
        modelName: 'StockEntry',
        freezeTableName: true
    });
    return StockEntry;
};
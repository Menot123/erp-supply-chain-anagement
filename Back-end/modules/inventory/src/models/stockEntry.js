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
        static generateId() {
            // Logic to generate stockEntryId based on type and group
            // You can modify this logic to suit your requirements
            return `STE001`;
        }

        static async getNextId() {
            const lastItem = await this.findOne({
                order: [
                    ['createdAt', 'DESC']
                ],
            });

            if (lastItem) {
                const lastItemId = lastItem.stockEntryId;
                const numericPart = parseInt(lastItemId.slice(-4));
                const nextNumericPart = (numericPart + 1).toString().padStart(4, '0');
                return `WH/IN/${nextNumericPart}`;
            }

            return this.generateId();
        }
    };
    StockEntry.init({
        stockEntryId: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        warehouseId: DataTypes.STRING,
        providerId: DataTypes.STRING,
        transactionType: DataTypes.STRING,
        transactionDate: DataTypes.DATE,
        status: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'StockEntry',
        freezeTableName: true,
        hooks: {
            beforeCreate: async(instance) => {
                instance.stockEntryId = await StockEntry.getNextId();
            },
        }
    });
    return StockEntry;
};
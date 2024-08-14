'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class StockEntry extends Model {
        static associate(models) {
            ////
            // StockEntry.belongsTo(models.Provider, { foreignKey: 'providerId', targetKey: 'providerId', as: 'providerData' })
            StockEntry.belongsTo(models.Warehouse, { foreignKey: 'warehouseId', targetKey: 'warehouseId', as: 'warehouseData' })
                // StockEntry.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'userId', as: 'userData' })
            StockEntry.hasMany(models.StockEntryItem, { foreignKey: 'stockEntryId', as: 'items' })
        }
        static generateId() {
            // Logic to generate stockEntryId based on type and group
            // You can modify this logic to suit your requirements
            return `WH/IN/0001`;
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
        providerId: DataTypes.STRING,
        warehouseId: DataTypes.STRING,
        userId: DataTypes.STRING,
        scheduledDate: DataTypes.DATE,
        note: DataTypes.STRING,
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
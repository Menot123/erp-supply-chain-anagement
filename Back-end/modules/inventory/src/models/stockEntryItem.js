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
        static generateId() {
            // Logic to generate stockEntryItemId based on type and group
            // You can modify this logic to suit your requirements
            return `STEI001`;
        }

        static async getNextId() {
            const lastItem = await this.findOne({
                order: [
                    ['createdAt', 'DESC']
                ],
            });

            if (lastItem) {
                const lastItemId = lastItem.stockEntryItemId;
                const numericPart = parseInt(lastItemId.slice(-4));
                const nextNumericPart = (numericPart + 1).toString().padStart(4, '0');
                return `STEI${nextNumericPart}`;
            }

            return this.generateId();
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
        freezeTableName: true,
        hooks: {
            beforeCreate: async(instance) => {
                instance.stockEntryItemId = await StockEntryItem.getNextId();
            },
        }
    });
    return StockEntryItem;
};
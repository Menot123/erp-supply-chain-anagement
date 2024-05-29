'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class StockEntryItem extends Model {
        static associate(models) {
            ////
            StockEntryItem.belongsTo(models.StockEntry, { foreignKey: 'stockEntryId', targetKey: 'stockEntryId', as: 'stockEntryData' })
            StockEntryItem.belongsTo(models.Product, { foreignKey: 'productId', targetKey: 'productId', as: 'productData' })
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
        stockEntryId: DataTypes.STRING,
        productId: DataTypes.STRING,
        description: DataTypes.STRING,
        scheduledDate: DataTypes.DATE,
        deadline: DataTypes.DATE,
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
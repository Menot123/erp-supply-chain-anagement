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
        static generateId() {
            // Logic to generate stockDeliveryItemId based on type and group
            // You can modify this logic to suit your requirements
            return `STDI001`;
        }

        static async getNextId() {
            const lastItem = await this.findOne({
                order: [
                    ['createdAt', 'DESC']
                ],
            });

            if (lastItem) {
                const lastItemId = lastItem.stockDeliveryItemId;
                const numericPart = parseInt(lastItemId.slice(-3));
                const nextNumericPart = (numericPart + 1).toString().padStart(3, '0');
                return `STDI${nextNumericPart}`;
            }

            return this.generateId();
        }
    };
    StockDeliveryItem.init({
        stockDeliveryItemId: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        stockDeliveryItemId: DataTypes.STRING,
        productId: DataTypes.STRING,
        quantity: DataTypes.INTEGER,
        status: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'StockDeliveryItem',
        freezeTableName: true,
        hooks: {
            beforeCreate: async(instance) => {
                instance.stockDeliveryItemId = await StockDeliveryItem.getNextId();
            },
        }
    });
    return StockDeliveryItem;
};
'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class StockDeliveryItem extends Model {
        static associate(models) {
            ////
            StockDeliveryItem.belongsTo(models.StockDelivery, { foreignKey: 'stockDeliveryId', targetKey: 'stockDeliveryId', as: 'stockDeliveryData' })
            StockDeliveryItem.belongsTo(models.Product, { foreignKey: 'productId', targetKey: 'productId', as: 'productData' })
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
                const numericPart = parseInt(lastItemId.slice(-4));
                const nextNumericPart = (numericPart + 1).toString().padStart(4, '0');
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
        stockDeliveryId: DataTypes.STRING,
        productId: DataTypes.STRING,
        description: DataTypes.STRING,
        scheduledDate: DataTypes.DATE,
        deadline: DataTypes.DATE,
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
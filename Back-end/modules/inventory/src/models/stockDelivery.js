'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class StockDelivery extends Model {
        static associate(models) {
            ////
            StockDelivery.belongsTo(models.Customer)
            StockDelivery.belongsTo(models.Warehouse)
            StockDelivery.hasMany(models.StockDeliveryItem, { foreignKey: 'stockDeliveryId' })
        }
        static generateId() {
            // Logic to generate stockDeliveryId based on type and group
            // You can modify this logic to suit your requirements
            return `STD001`;
        }

        static async getNextId() {
            const lastItem = await this.findOne({
                order: [
                    ['createdAt', 'DESC']
                ],
            });

            if (lastItem) {
                const lastItemId = lastItem.stockDeliveryId;
                const numericPart = parseInt(lastItemId.slice(-3));
                const nextNumericPart = (numericPart + 1).toString().padStart(3, '0');
                return `STD${nextNumericPart}`;
            }

            return this.generateId();
        }
    };
    StockDelivery.init({
        stockDeliveryId: {
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
        modelName: 'StockDelivery',
        freezeTableName: true,
        hooks: {
            beforeCreate: async(instance) => {
                instance.stockDeliveryId = await StockDelivery.getNextId();
            },
        }
    });
    return StockDelivery;
};
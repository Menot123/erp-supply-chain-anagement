'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class StockDelivery extends Model {
        static associate(models) {
            StockDelivery.belongsTo(models.Warehouse, { foreignKey: 'warehouseId', targetKey: 'warehouseId', as: 'warehouseData' })
            // StockDelivery.belongsTo(models.User, { foreignKey: 'warehouseId', targetKey: 'warehouseId', as: 'warehouseData' })
            StockDelivery.hasMany(models.StockDeliveryItem, { foreignKey: 'stockDeliveryId', as: 'items' })
        }
        static generateId() {
            // Logic to generate stockDeliveryId based on type and group
            // You can modify this logic to suit your requirements
            return `WH/OUT/0001`;
        }

        static async getNextId() {
            const lastItem = await this.findOne({
                order: [
                    ['createdAt', 'DESC']
                ],
            });

            if (lastItem) {
                const lastItemId = lastItem.stockDeliveryId;
                const numericPart = parseInt(lastItemId.slice(-4));
                const nextNumericPart = (numericPart + 1).toString().padStart(4, '0');
                return `WH/OUT/${nextNumericPart}`;
            }

            return this.generateId();
        }
    };
    StockDelivery.init({
        stockDeliveryId: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        customerId: DataTypes.STRING,
        warehouseId: DataTypes.STRING,
        userId: DataTypes.STRING,
        scheduledDate: DataTypes.DATE,
        note: DataTypes.STRING,
        status: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'StockDelivery',
        tableName: 'stockdelivery',
        freezeTableName: true,
        hooks: {
            beforeCreate: async (instance) => {
                instance.stockDeliveryId = await StockDelivery.getNextId();
            },
        }
    });
    return StockDelivery;
};
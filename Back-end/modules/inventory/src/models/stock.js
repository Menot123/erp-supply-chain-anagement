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
        static generateId() {
            // Logic to generate stockId based on type and group
            // You can modify this logic to suit your requirements
            return `ST001`;
        }

        static async getNextId() {
            const lastItem = await this.findOne({
                order: [
                    ['createdAt', 'DESC']
                ],
            });

            if (lastItem) {
                const lastItemId = lastItem.stockId;
                const numericPart = parseInt(lastItemId.slice(-3));
                const nextNumericPart = (numericPart + 1).toString().padStart(3, '0');
                return `ST${nextNumericPart}`;
            }

            return this.generateId();
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
        freezeTableName: true,
        hooks: {
            beforeCreate: async(instance) => {
                instance.stockId = await Stock.getNextId();
            },
        }
    });
    return Stock;
};
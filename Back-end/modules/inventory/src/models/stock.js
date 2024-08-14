'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Stock extends Model {
        static associate(models) {
            ////
            Stock.belongsTo(models.Warehouse, { foreignKey: 'warehouseId', targetKey: 'warehouseId', as: 'warehouseData' })
            Stock.belongsTo(models.Product, { foreignKey: 'productId', targetKey: 'productId', as: 'productData' })
        }
        static generateId() {
            // Logic to generate stockId based on type and group
            // You can modify this logic to suit your requirements
            return `ST0001`;
        }

        static async getNextId() {
            const lastItem = await this.findOne({
                order: [
                    ['stockId', 'DESC']
                ],
            });

            if (lastItem) {
                const lastItemId = lastItem.stockId;
                const numericPart = parseInt(lastItemId.slice(-4));
                const nextNumericPart = (numericPart + 1).toString().padStart(4, '0');
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
        // tableName: 'stock',
        freezeTableName: true,
        hooks: {
            beforeCreate: async (instance) => {
                instance.stockId = await Stock.getNextId();
            },
        }
    });
    return Stock;
};
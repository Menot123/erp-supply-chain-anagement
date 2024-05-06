'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Warehouse extends Model {
        static associate(models) {
            ////
            Warehouse.hasMany(models.Stock, { foreignKey: 'stockId' })
            Warehouse.hasMany(models.StockDelivery, { foreignKey: 'stockDeliveryId' })
            Warehouse.hasMany(models.StockEntry, { foreignKey: 'stockEntryId' })
        }
        static generateId() {
            // Logic to generate warehouseId based on type and group
            // You can modify this logic to suit your requirements
            return `WH001`;
        }

        static async getNextId() {
            const lastItem = await this.findOne({
                order: [
                    ['createdAt', 'DESC']
                ],
            });

            if (lastItem) {
                const lastItemId = lastItem.warehouseId;
                const numericPart = parseInt(lastItemId.slice(-3));
                const nextNumericPart = (numericPart + 1).toString().padStart(3, '0');
                return `WH${nextNumericPart}`;
            }

            return this.generateId();
        }
    };
    Warehouse.init({
        warehouseId: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        nameVi: DataTypes.STRING,
        nameEn: DataTypes.STRING,
        location: DataTypes.STRING,
        capacity: DataTypes.INTEGER,
        status: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Warehouse',
        freezeTableName: true,
        hooks: {
            beforeCreate: async(instance) => {
                instance.warehouseId = await Warehouse.getNextId();
            },
        }
    });
    return Warehouse;
};
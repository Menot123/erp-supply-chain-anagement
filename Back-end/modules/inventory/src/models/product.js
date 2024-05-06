'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        static associate(models) {
            Product.belongsTo(models.all_code, { foreignKey: 'type', targetKey: 'keyType', as: 'typeData' })
            Product.belongsTo(models.all_code, { foreignKey: 'group', targetKey: 'keyType', as: 'groupData' })
            Product.belongsTo(models.all_code, { foreignKey: 'unit', targetKey: 'keyType', as: 'unitData' })

            Product.hasMany(models.Stock, { foreignKey: 'productId' })
            Product.hasMany(models.StockEntryItem, { foreignKey: 'productId' })
            Product.hasMany(models.StockDeliveryItem, { foreignKey: 'productId' })
        }

        static generateProductId() {
            // Logic to generate productId based on type and group
            // You can modify this logic to suit your requirements
            return `PO001`;
        }

        static async getNextProductId() {
            const lastProduct = await this.findOne({
                order: [
                    ['createdAt', 'DESC']
                ],
            });

            if (lastProduct) {
                const lastProductId = lastProduct.productId;
                const numericPart = parseInt(lastProductId.slice(-3));
                const nextNumericPart = (numericPart + 1).toString().padStart(3, '0');
                return `PO${nextNumericPart}`;
            }

            return this.generateProductId();
        }

    };
    Product.init({
        productId: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        barCode: {
            type: DataTypes.STRING,
            unique: true
        },
        nameVi: DataTypes.STRING,
        nameEn: DataTypes.STRING,
        type: DataTypes.STRING,
        group: DataTypes.STRING,
        image: DataTypes.TEXT('long'),
        cost: DataTypes.INTEGER,
        unit: DataTypes.STRING,
        descriptionVi: DataTypes.STRING,
        descriptionEn: DataTypes.STRING,
        expiry: DataTypes.INTEGER,
        status: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Product',
        freezeTableName: true,
        hooks: {
            beforeCreate: async(instance) => {
                instance.productId = await Product.getNextProductId();
            },
        }
    });
    return Product;
};
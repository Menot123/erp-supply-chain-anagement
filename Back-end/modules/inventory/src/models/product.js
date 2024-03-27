'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        static associate(models) {
            // define association here
        }

        static generateProductId(type, group) {
            // Logic to generate productId based on type and group
            // You can modify this logic to suit your requirements
            const prefix = `${type}${group}`;
            return `${prefix}001`;
        }

        static async getNextProductId(type, group) {
            const lastProduct = await this.findOne({
                where: { type, group },
                order: [
                    ['createdAt', 'DESC']
                ],
            });

            if (lastProduct) {
                const lastProductId = lastProduct.productId;
                const numericPart = parseInt(lastProductId.slice(-3));
                const nextNumericPart = (numericPart + 1).toString().padStart(3, '0');
                return `${type}${group}${nextNumericPart}`;
            }

            return this.generateProductId(type, group);
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
                instance.productId = await Product.getNextProductId(
                    instance.type,
                    instance.group
                );
            },
        }
    });
    return Product;
};
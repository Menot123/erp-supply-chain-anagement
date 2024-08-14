'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Provider extends Model {
        static associate(models) {
            ////
            Provider.hasMany(models.StockEntry, { foreignKey: 'providerId' })
            Provider.hasMany(models.ProductProvider, { foreignKey: 'providerId' })
        }
        static generateId() {
            // Logic to generate providerId based on type and group
            // You can modify this logic to suit your requirements
            return `PRO001`;
        }

        static async getNextId() {
            const lastItem = await this.findOne({
                order: [
                    ['createdAt', 'DESC']
                ],
            });

            if (lastItem) {
                const lastItemId = lastItem.providerId;
                const numericPart = parseInt(lastItemId.slice(-3));
                const nextNumericPart = (numericPart + 1).toString().padStart(3, '0');
                return `PRO${nextNumericPart}`;
            }

            return this.generateId();
        }
    };
    Provider.init({
        providerId: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        nameVi: DataTypes.STRING,
        nameEn: DataTypes.STRING,
        addressVi: DataTypes.STRING,
        addressEn: DataTypes.STRING,
        logo: DataTypes.STRING,
        contact: DataTypes.STRING,
        website: DataTypes.STRING,
        status: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Provider',
        // tableName: 'provider',
        freezeTableName: true,
        hooks: {
            beforeCreate: async (instance) => {
                instance.providerId = await Provider.getNextId();
            },
        }
    });
    return Provider;
};
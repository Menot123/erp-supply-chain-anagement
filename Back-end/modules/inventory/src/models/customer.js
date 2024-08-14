'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Customer extends Model {
        static associate(models) {
            ////
        }
        static generateId() {
            // Logic to generate customerId based on type and group
            // You can modify this logic to suit your requirements
            return `CU001`;
        }

        static async getNextId() {
            const lastItem = await this.findOne({
                order: [
                    ['createdAt', 'DESC']
                ],
            });

            if (lastItem) {
                const lastItemId = lastItem.customerId;
                const numericPart = parseInt(lastItemId.slice(-3));
                const nextNumericPart = (numericPart + 1).toString().padStart(3, '0');
                return `CU${nextNumericPart}`;
            }

            return this.generateId();
        }
    };
    Customer.init({
        customerId: {
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
        modelName: 'Customer',
        // tableName: 'customer',
        freezeTableName: true,
        hooks: {
            beforeCreate: async (instance) => {
                instance.customerId = await Customer.getNextId();
            },
        }
    });
    return Customer;
};
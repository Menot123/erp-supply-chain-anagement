'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Customer extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
                // define association here
            }
            // static generateId() {
            //   // Logic to generate customerId based on type and group
            //   // You can modify this logic to suit your requirements
            //   return `CU001`;
            // }

        // static async getNextId() {
        //   const lastItem = await this.findOne({
        //     order: [
        //       ['createdAt', 'DESC']
        //     ],
        //   });

        //   if (lastItem) {
        //     const lastItemId = lastItem.id;
        //     const numericPart = parseInt(lastItemId.slice(-3));
        //     const nextNumericPart = (numericPart + 1).toString().padStart(3, '0');
        //     return `CU${nextNumericPart}`;
        //   }

        //   return this.generateId();
        // }

        static async getLastNumericId() {
            const lastCustomer = await Customer.findOne({
                order: [
                    ['id', 'DESC']
                ]
            });
            const lastId = lastCustomer ? parseInt(lastCustomer.id.slice(2), 10) : 0; // Bỏ phần 'CU' và lấy phần số
            return lastId;
        }

        // Phương thức để tạo ID tiếp theo
        static async getNextId() {
            const lastNumericId = await this.getLastNumericId();
            const nextNumericPart = (lastNumericId + 1).toString().padStart(3, '0');
            return `CU${nextNumericPart}`;
        }

    };
    Customer.init({
        id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        fullName: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        phone: DataTypes.STRING,
        address: DataTypes.STRING,
        gender: DataTypes.STRING,
        createdBy: DataTypes.INTEGER,
        updatedBy: DataTypes.INTEGER,
        deleteFlag: DataTypes.BOOLEAN,
    }, {
        sequelize,
        modelName: 'Customer',
        tableName: 'customers',
        freezeTableName: true,
        hooks: {
            // beforeCreate: async (instance) => {
            //   instance.id = await Customer.getNextId();
            // },
            beforeBulkCreate: async(instances) => {
                let lastId = await Customer.getLastNumericId(); // Lấy phần số lớn nhất hiện tại
                for (const instance of instances) {
                    lastId += 1;
                    instance.id = `CU${lastId.toString().padStart(3, '0')}`; // Tạo ID mới với định dạng CUxxx
                }
            }
        }
    });
    return Customer;
};
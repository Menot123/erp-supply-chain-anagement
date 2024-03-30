'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Inventory extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Inventory.init({
        productId: DataTypes.STRING,
        supplierId: DataTypes.STRING,
        quantity: DataTypes.INTEGER,
        minimum_quantity: DataTypes.INTEGER,
        maximum_quantity: DataTypes.INTEGER,
        discount: DataTypes.FLOAT,
        status: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Inventory',
    });
    return Inventory;
};
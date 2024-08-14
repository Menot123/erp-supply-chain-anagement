'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ProductProvider extends Model {
        static associate(models) {
            ProductProvider.belongsTo(models.Product, { foreignKey: 'productId', targetKey: 'productId', as: 'productData' })
                // ProductProvider.belongsTo(models.Provider, { foreignKey: 'providerId', targetKey: 'providerId', as: 'providerData' })
        }
    };
    ProductProvider.init({
        productId: DataTypes.STRING,
        providerId: DataTypes.STRING,
        status: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'ProductProvider',
        // tableName: 'productprovider',
        freezeTableName: true
    });
    return ProductProvider;
};
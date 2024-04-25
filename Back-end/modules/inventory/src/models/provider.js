'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Provider extends Model {
        static associate(models) {
            ////
            Provider.hasMany(models.StockEntry, { foreignKey: 'providerId' })
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
        freezeTableName: true
    });
    return Provider;
};
'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class AllCode extends Model {
        static associate(models) {
            AllCode.hasMany(models.Quote, { foreignKey: 'currency', as: 'dataCurrency' })
            AllCode.hasMany(models.Quote, { foreignKey: 'paymentPolicy', as: 'dataPaymentPolicy' })
        }
    };
    AllCode.init({
        keyType: DataTypes.STRING,
        type: DataTypes.STRING,
        valueVi: DataTypes.STRING,
        valueEn: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'AllCode',
        tableName: 'all_codes',
        freezeTableName: true
    });
    return AllCode;
};
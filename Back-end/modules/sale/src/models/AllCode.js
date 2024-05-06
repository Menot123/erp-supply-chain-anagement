'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class AllCode extends Model {
        static associate(models) {

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
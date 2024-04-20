'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class all_code extends Model {
        static associate(models) {
            all_code.hasMany(models.Product, { foreignKey: 'type', as: 'typeData' })
            all_code.hasMany(models.Product, { foreignKey: 'group', as: 'groupData' })
            all_code.hasMany(models.Product, { foreignKey: 'unit', as: 'unitData' })
        }
    };
    all_code.init({
        keyType: DataTypes.STRING,
        type: DataTypes.STRING,
        valueVi: DataTypes.STRING,
        valueEn: DataTypes.STRING,
        status: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'all_code',
        freezeTableName: true
    });
    return all_code;
};
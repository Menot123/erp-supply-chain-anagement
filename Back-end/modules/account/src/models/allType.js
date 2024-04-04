'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class all_type extends Model {
        static associate(models) {
            all_type.hasMany(models.User, { foreignKey: 'role', as: 'positionData' })
            all_type.hasMany(models.User, { foreignKey: 'department', as: 'departmentData' })
        }
    };
    all_type.init({
        keyType: DataTypes.STRING,
        type: DataTypes.STRING,
        valueVi: DataTypes.STRING,
        valueEn: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'all_type',
        freezeTableName: true
    });
    return all_type;
};
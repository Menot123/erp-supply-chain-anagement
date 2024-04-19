'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.belongsTo(models.all_type, { foreignKey: 'role', targetKey: 'keyType', as: 'positionData' })
            User.belongsTo(models.all_type, { foreignKey: 'department', targetKey: 'keyType', as: 'departmentData' })
        }
    };
    User.init({
        role: DataTypes.STRING,
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        department: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        phone: DataTypes.STRING,
        gender: DataTypes.STRING,
        birth: DataTypes.STRING,
        address: DataTypes.STRING,
        avatar: DataTypes.TEXT('long'),
        status: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'User',
        tableName: 'users',
    });
    return User;
};
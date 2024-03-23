'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            // define association here
        }
    };
    User.init({
        idCard: DataTypes.STRING,
        role: DataTypes.STRING,
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
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
    });
    return User;
};
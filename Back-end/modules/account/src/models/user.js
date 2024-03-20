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
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        phone: DataTypes.STRING,
        gender: DataTypes.STRING,
        birth: DataTypes.STRING,
        address: DataTypes.STRING,
        avatar: DataTypes.BLOB('long'),
        status: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};
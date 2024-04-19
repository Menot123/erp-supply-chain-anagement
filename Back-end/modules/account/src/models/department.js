'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Department extends Model {
        static associate(models) {

        }
    };
    Department.init({
        nameVi: DataTypes.STRING,
        nameEn: DataTypes.STRING,
        departmentCode: DataTypes.STRING,
        managerId: DataTypes.INTEGER,
        status: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Department',
        tableName: 'departments',
    });
    return Department;
};
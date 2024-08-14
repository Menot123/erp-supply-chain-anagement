'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Branches extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Branches.init({
    mainCompanyId: DataTypes.STRING,
    idCompany: DataTypes.STRING,
    name: DataTypes.STRING,
    logo: DataTypes.TEXT('long'),
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    taxId: DataTypes.STRING,
    email: DataTypes.STRING,
    money: DataTypes.STRING,
    website: DataTypes.STRING,
    status: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Branches',
    tableName: 'branches'
  });
  return Branches;
};
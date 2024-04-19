'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CompanyInfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  CompanyInfo.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    taxId: DataTypes.STRING,
    email: DataTypes.STRING,
    money: DataTypes.STRING,
    website: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CompanyInfo',
    tableName: 'company_info'
  });
  return CompanyInfo;
};
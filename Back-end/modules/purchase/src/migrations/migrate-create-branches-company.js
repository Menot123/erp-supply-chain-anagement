'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('branches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      mainCompanyId: {
        type: Sequelize.STRING
      },
      idCompany: {
        type: Sequelize.STRING
      },
      logo: {
        type: Sequelize.TEXT('long')
      },
      address: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      taxId: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      money: {
        type: Sequelize.STRING
      },
      website: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('branches');
  }
};
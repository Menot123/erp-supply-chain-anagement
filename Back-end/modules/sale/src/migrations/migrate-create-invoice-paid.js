'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('invoice_paid', {
      invoiceId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      datePaid: {
        type: Sequelize.STRING
      },
      createdDate: {
        type: Sequelize.STRING
      },
      total: {
        type: Sequelize.STRING
      },
      paymentMethod: {
        type: Sequelize.TEXT,
      },
      delete_flag: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdUser: {
        type: Sequelize.STRING
      },
      updatedUser: {
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
    await queryInterface.dropTable('invoice_paid');
  }
};
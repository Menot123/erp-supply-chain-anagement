'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('StockDelivery', {
            stockDeliveryId: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING
            },
            warehouseId: {
                allowNull: false,
                type: Sequelize.STRING
            },
            customerId: {
                allowNull: false,
                type: Sequelize.STRING
            },
            transactionType: {
                type: Sequelize.STRING
            },
            transactionDate: {
                allowNull: false,
                type: Sequelize.DATE
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            status: {
                type: Sequelize.STRING,
                defaultValue: 'active'
            },
        });
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('StockDelivery');
    }
};
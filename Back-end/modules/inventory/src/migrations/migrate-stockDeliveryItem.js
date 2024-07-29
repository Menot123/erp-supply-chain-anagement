'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('StockDeliveryItem', {
            stockDeliveryItemId: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING
            },
            stockDeliveryId: {
                allowNull: false,
                type: Sequelize.STRING
            },
            productId: {
                allowNull: false,
                type: Sequelize.STRING
            },
            description: {
                allowNull: true,
                type: Sequelize.STRING
            },
            scheduledDate: {
                allowNull: false,
                type: Sequelize.DATE
            },
            deadline: {
                allowNull: true,
                type: Sequelize.DATE
            },
            quantity: {
                defaultValue: 0,
                type: Sequelize.INTEGER
            },
            trueQuantity: {
                allowNull: true,
                defaultValue: 0,
                type: Sequelize.INTEGER
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
        await queryInterface.dropTable('StockDeliveryItem');
    }
};
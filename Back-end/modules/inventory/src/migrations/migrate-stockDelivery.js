'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('stockdelivery', {
            stockDeliveryId: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING
            },
            customerId: {
                allowNull: false,
                type: Sequelize.STRING
            },
            warehouseId: {
                allowNull: false,
                type: Sequelize.STRING
            },
            userId: {
                allowNull: false,
                type: Sequelize.STRING
            },
            scheduledDate: {
                allowNull: false,
                type: Sequelize.DATE
            },
            note: {
                allowNull: true,
                type: Sequelize.STRING
            },
            saleId: {
                allowNull: true,
                defaultValue: '',
                type: Sequelize.STRING
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
                defaultValue: 'draft'
            },
        });
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('stockdelivery');
    }
};
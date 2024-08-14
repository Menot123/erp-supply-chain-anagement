'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('stock', {
            stockId: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING
            },
            productId: {
                allowNull: false,
                type: Sequelize.STRING
            },
            warehouseId: {
                allowNull: false,
                type: Sequelize.STRING
            },
            quantity: {
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
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('stock');
    }
};
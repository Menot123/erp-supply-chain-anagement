'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('StockEntryItem', {
            stockEntryItemId: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING
            },
            stockEntryId: {
                allowNull: false,
                type: Sequelize.STRING
            },
            productId: {
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
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('StockEntryItem');
    }
};
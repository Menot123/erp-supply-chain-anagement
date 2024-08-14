'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('stockentry', {
            stockEntryId: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING
            },
            providerId: {
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
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('stockentry');
    }
};
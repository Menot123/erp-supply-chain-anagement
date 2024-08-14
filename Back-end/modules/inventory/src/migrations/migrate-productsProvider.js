'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('productprovider', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            productId: {
                allowNull: false,
                type: Sequelize.STRING
            },
            providerId: {
                allowNull: false,
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
                defaultValue: 'active'
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('productprovider');
    }
};
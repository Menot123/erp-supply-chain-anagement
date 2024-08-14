'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('product', {
            productId: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING
            },
            barCode: {
                type: Sequelize.STRING,
                unique: true
            },
            nameVi: {
                type: Sequelize.STRING
            },
            nameEn: {
                type: Sequelize.STRING
            },
            type: {
                allowNull: false,
                type: Sequelize.STRING
            },
            group: {
                allowNull: false,
                type: Sequelize.STRING
            },
            image: {
                type: Sequelize.TEXT('long')
            },
            cost: {
                type: Sequelize.INTEGER
            },
            unit: {
                type: Sequelize.STRING
            },
            descriptionVi: {
                type: Sequelize.STRING
            },
            descriptionEn: {
                type: Sequelize.STRING
            },
            expiry: {
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
        await queryInterface.dropTable('product');
    }
};
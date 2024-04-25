'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Provider', {
            providerId: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING
            },
            nameVi: {
                type: Sequelize.STRING
            },
            nameEn: {
                type: Sequelize.STRING
            },
            addressVi: {
                type: Sequelize.STRING
            },
            addressEn: {
                type: Sequelize.STRING
            },
            logo: {
                type: Sequelize.TEXT('long')
            },
            contact: {
                type: Sequelize.STRING
            },
            website: {
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
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('Provider');
    }
};
'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('all_code', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            keyType: {
                type: Sequelize.STRING
            },
            type: {
                type: Sequelize.STRING
            },
            valueVi: {
                type: Sequelize.STRING
            },
            valueEn: {
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
        await queryInterface.dropTable('all_code');
    }
};
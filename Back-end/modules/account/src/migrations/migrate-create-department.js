'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('departments', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            nameVi: {
                allowNull: false,
                type: Sequelize.STRING
            },
            nameEn: {
                type: Sequelize.STRING
            },
            departmentCode: {
                type: Sequelize.STRING
            },
            managerId: {
                type: Sequelize.INTEGER
            },
            status: {
                type: Sequelize.STRING,
                defaultValue: 'active'
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('departments');
    }
};
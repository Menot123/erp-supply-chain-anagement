'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Inventorys', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            productId: {
                type: Sequelize.STRING,
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            supplierId: {
                type: Sequelize.STRING
            },
            quantity: {
                type: Sequelize.INTEGER
            },
            minimum_quantity: {
                type: Sequelize.INTEGER
            },
            maximum_quantity: {
                type: Sequelize.INTEGER
            },
            discount: {
                type: Sequelize.FLOAT,
                allowNull: false,
                defaultValue: 0,
                validate: {
                    min: 0,
                    max: 1
                }
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
        await queryInterface.dropTable('Inventorys');
    }
};
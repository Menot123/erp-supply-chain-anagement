'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('quotes', {
            quoteId: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            providerId: {
                type: Sequelize.STRING
            },
            employeeId: {
                type: Sequelize.INTEGER
            },
            expirationDay: {
                type: Sequelize.STRING
            },
            currency: {
                type: Sequelize.STRING
            },
            paymentPolicy: {
                type: Sequelize.STRING
            },
            productList: {
                type: Sequelize.TEXT,
            },
            policyAndCondition: {
                type: Sequelize.STRING
            },
            priceBeforeTax: {
                type: Sequelize.STRING
            },
            tax: {
                type: Sequelize.STRING
            },
            totalPrice: {
                type: Sequelize.STRING
            },
            deliveryDate: {
                type: Sequelize.STRING
            },
            status: {
                type: Sequelize.STRING,
                defaultValue: 'active'
            },
            createdUser: {
                type: Sequelize.STRING
            },
            updatedUser: {
                type: Sequelize.STRING
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
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('quotes');
    }
};
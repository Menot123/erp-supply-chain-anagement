'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {

        const db = require("../models/index"); // Import the product model

        // Generate productId based on type and group
        const generateProductId = (type, group) => {
            // Your logic to generate productId here
            const prefix = `${type}${group}`;
            return `${prefix}001`;
        };

        // Fetch the last product with the same type and group
        const getLastProduct = async(type, group) => {
            const lastProduct = await db.Product.findOne({
                where: { type, group },
                order: [
                    ['createdAt', 'DESC']
                ],
            });

            return lastProduct;
        };

        const type = 'T1';
        const group = 'G1';

        const lastProduct = await getLastProduct(type, group);

        let productId;
        if (lastProduct) {
            const lastProductId = lastProduct.productId;
            const numericPart = parseInt(lastProductId.slice(-3));
            const nextNumericPart = (numericPart + 1).toString().padStart(3, '0');
            productId = `${type}${group}${nextNumericPart}`;
        } else {
            productId = generateProductId(type, group);
        }

        return queryInterface.bulkInsert('Products', [{
            barCode: '123456789',
            nameVi: 'Iphone 11 Plus',
            nameEn: 'Iphone 11 Plus',
            type: 'T1',
            group: 'G1',
            image: 'https://e3.365dm.com/19/09/2048x1152/skynews-iphone-11-apple_4770640.jpg',
            cost: 11000000,
            unit: 'U1',
            descriptionVi: 'Đây là Iphone 11 Plus',
            descriptionEn: 'This i Iphone 11 Plus',
            expiry: 8,
            createdAt: new Date(),
            updatedAt: new Date()
        }]);
    },

    down: async(queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    }
};
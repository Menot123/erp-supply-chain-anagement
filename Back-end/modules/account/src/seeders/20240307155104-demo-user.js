'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Users', [{
            idCard: '089202012345',
            role: 'admin',
            name: 'John Doe',
            email: 'admin@gmail.com',
            password: '123456',
            phone: '0123456789',
            gender: 'Male',
            birth: new Date('2000-01-01'),
            address: 'Ho Chi Minh City',
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
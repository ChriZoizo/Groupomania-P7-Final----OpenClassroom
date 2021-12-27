'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      email: 'aaa@aaa.com',
      password: 'aaa',
      firstName: 'carl',
      lastName: 'sagan',
      isAdmin: true

    }]),
    await queryInterface.bulkInsert('Users', [{
      email: 'chris@gogole.com',
      password: 'aaa',
      firstName: 'chris',
      lastName: 'boyr',
      isAdmin: true

    }]),
    await queryInterface.bulkInsert('Users', [{
      email: 'chriss@gogole.com',
      password: 'aaaaa',
      firstName: 'chris',
      lastName: 'boyr',
      isAdmin: true

    }])
    
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Jokes', [{
        quote: 'John',
        author: 'Doe',
        origin: 'example@example.com',
        createdAt: new Date(),
        updatedAt: new Date()
      }]);
    },
  },

  down: async (queryInterface, Sequelize) => {
    (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Jokes', null, {});
  }
},
}

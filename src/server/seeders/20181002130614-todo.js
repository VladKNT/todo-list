'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Todos', [{
        title: 'Test list 1',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        title: 'Test list 2',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        title: 'Test list 3',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('TodoItems', [{
        content: 'Initial item 1',
        todoId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        content: 'Initial item 2',
        todoId: 1,
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

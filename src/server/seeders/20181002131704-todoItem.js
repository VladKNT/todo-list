'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('TodoItems', [{
        content: 'Test item 1',
        todoId: 1,
        complete: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        content: 'Test item 2',
        todoId: 1,
        complete: false,
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

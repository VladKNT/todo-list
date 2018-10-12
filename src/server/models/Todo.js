'use strict';

module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define('Todo', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true }
    },
  }, {});

  Todo.associate = function(models) {
    Todo.hasMany(models.TodoItem, {
      foreignKey: 'todoId',
      as: 'todoItems'
    });
  };

  return Todo;
};

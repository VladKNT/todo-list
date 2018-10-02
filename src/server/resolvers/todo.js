import { Todo, TodoItem } from '../models';

export default {
  Mutation: {
    createTodo: (parent, { title }) => Todo.create(title),

    updateTodo: async (parent, args) => {
      let todo = await Todo.findById(args.id, {
        include: [{
          model: TodoItem,
          as: 'todoItems'
        }]
      });

      return todo.update(args, { fields: Object.keys(args) });
    },

    deleteTodo: async (parent, { id }) => {
      let todo = await Todo.findById(id);
      await todo.destroy();

      return true;
    }
  },

  Query: {
    getTodoById: (parent, { id }) => Todo.findById(id, {
      include: [{
        model: TodoItem,
        as: 'todoItems'
      }]
    }),

    getAllTodos: () => Todo.findAll({
      include: [{
        model: TodoItem,
        as: 'todoItems'
      }]
    })
  },
};
import { Todo, TodoItem } from '../models';
import pubsub, { EVENTS } from "../subscriptions";

export default {
  Mutation: {
    createTodo: async (parent, { title }) => {
      const todo = await Todo.create({ title });

      pubsub.publish(EVENTS.TODO.LIST_SAVED, {
        todoSaved: todo
      });

      return todo;
    },

    updateTodo: async (parent, args) => {
      let todo = await Todo.findById(args.id, {
        include: [{
          model: TodoItem,
          as: 'todoItems'
        }]
      });

      await todo.update(args, { fields: Object.keys(args) });

      pubsub.publish(EVENTS.TODO.LIST_SAVED, {
        todoSaved: todo
      });

      return todo;
    },

    deleteTodo: async (parent, { id }) => {
      let todo = await Todo.findById(id);
      await todo.destroy();

      pubsub.publish(EVENTS.TODO.LIST_DELETED, {
        todoDeleted: id
      });

      return id;
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
      }],
      order: [
        ['id', 'ASC'],
        [{ model: TodoItem, as: 'todoItems' }, 'createdAt', 'ASC' ],
      ]
    })
  },

  Subscription: {
    todoSaved: {
      subscribe: () => pubsub.asyncIterator(EVENTS.TODO.LIST_SAVED)
    },

    todoDeleted: {
      subscribe: () => pubsub.asyncIterator(EVENTS.TODO.LIST_DELETED)
    }
  }
};
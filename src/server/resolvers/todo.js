import { Todo, TodoItem } from '../models';
import pubsub, { EVENTS } from "../subscriptions";

export default {
  Mutation: {
    createTodo: async (parent, { title }) => {
      try {
        const todo = await Todo.create({ title });

        pubsub.publish(EVENTS.TODO.LIST_SAVED, {
          todoSaved: todo
        });

        return todo;
      } catch (error) {
        throw new Error(error);
      }
    },

    updateTodo: async (parent, args) => {
      try {
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
      } catch (error) {
        throw new Error(error);
      }

    },

    deleteTodo: async (parent, { id }) => {
      try {
        let todo = await Todo.findById(id);
        await todo.destroy();

        pubsub.publish(EVENTS.TODO.LIST_DELETED, {
          todoDeleted: id
        });

        return id;
      } catch (error) {
        throw new Error(error);
      }
    }
  },

  Query: {
    getTodoById: (parent, { id }) => {
      try {
        return Todo.findById(id, {
          include: [{
            model: TodoItem,
            as: 'todoItems'
          }]
        })
      } catch (error) {
        throw new Error(error);
      }
    },

    getAllTodos: () => {
      try {
        return Todo.findAll({
          include: [{
            model: TodoItem,
            as: 'todoItems'
          }],
          order: [
            ['id', 'ASC'],
            [{ model: TodoItem, as: 'todoItems' }, 'createdAt', 'ASC' ],
          ]
        })
      } catch (error) {
        throw new Error(error);
      }
    }
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
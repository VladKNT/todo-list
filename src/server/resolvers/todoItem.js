import { TodoItem } from '../models';
import pubsub, { EVENTS } from "../subscriptions";

export default {
  Mutation: {
    createTodoItem: async (parent, args) => {
      const todoItem = await TodoItem.create(args);

      pubsub.publish(EVENTS.TODO_ITEM.ITEM_SAVED, {
        todoItemSaved: todoItem
      });

      return todoItem;
    },

    updateTodoItem: async (parent, args) => {
      let todoItem = await TodoItem.findById(args.id);

      await todoItem.update(args, { fields: Object.keys(args) });

      pubsub.publish(EVENTS.TODO_ITEM.ITEM_SAVED, {
        todoItemSaved: todoItem
      });

      return todoItem;
    },

    deleteTodoItem: async (parent, { id }) => {
      let todoItem = await TodoItem.findById(id);
      await todoItem.destroy();

      pubsub.publish(EVENTS.TODO_ITEM.ITEM_DELETED, {
        todoItemDeleted: todoItem
      });

      return todoItem;
    },
  },

  Subscription: {
    todoItemSaved: {
      subscribe: () => pubsub.asyncIterator(EVENTS.TODO_ITEM.ITEM_SAVED)
    },

    todoItemDeleted: {
      subscribe: () => pubsub.asyncIterator(EVENTS.TODO_ITEM.ITEM_DELETED)
    }
  }
}

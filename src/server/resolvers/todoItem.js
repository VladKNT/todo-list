import { TodoItem } from '../models';

export default {
  Mutation: {
    createTodoItem: (parent, args) => TodoItem.create(args),

    updateTodoItem: async (parent, args) => {
      let todoItem = await TodoItem.findById(args.id);

      return todoItem.update(args, { fields: Object.keys(args) });
    },

    deleteTodoItem: async (parent, { id }) => {
      let todoItem = await TodoItem.findById(id);
      await todoItem.destroy();

      return todoItem;
    },
  }
}

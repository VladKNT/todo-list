import { TodoItem } from '../models';

export default class TodoItemController {
  static create(req, res) {
    return TodoItem
      .create({
        content: req.body.content,
        todoId: req.params.todoId,
      })
      .then((todo) => res.status(201).send(todo))
      .catch((error) => res.status(400).send(error));
  }

  static update(req, res) {
    return TodoItem
      .findById(req.params.itemId)
      .then((todoItem) => {
        if (!todoItem) {
          return res.status(404).send({
            message: 'Todo Item Not Found'
          })
        }

        return todoItem
          .update(req.body, { fields: Object.keys(req.body) })
          .then(() => res.status(200).send(todoItem))
          .catch((error) =>
            res.status(400).send(error)
          );
      })
      .catch((error) =>
        res.status(400).send(error)
      );
  }

  static destroy(req, res) {
    return TodoItem
      .findById(req.params.itemId)
      .then((todoItem) => {
        if (!todoItem) {
          return res.status(404).send({
            message: 'Todo Item Not Found'
          })
        }

        return todoItem
          .destroy()
          .then(() => res.status(200).send({
            message: 'Todo item was deleted'
          }))
          .catch((error) =>
            res.status(400).send(error)
          );
      })
      .catch((error) =>
        res.status(400).send(error)
      );
  }
}
